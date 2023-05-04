const searchButton = document.getElementById('search');
let searchedPokemon = data.searchedPokemon;
let searchPokemonName = '';
let flavorText = '';
let deletePokemonId = null;

searchButton.addEventListener('click', searchForPokemon);
if (data.pageView === 'team') {
  changeViewToTeam();
}
if (data.pageView === 'pokemon' && searchedPokemon) {
  changeViewToSearchedPokemon();
}

function changeViewToSearchedPokemon() {
  data.pageView = 'pokemon';
  document.querySelector('.home').classList.add('display-none');
  document.querySelector('.search-pokemon').classList.remove('display-none');

  if (data.showFrontImgDefault) {
    const frontShinyDefault = searchedPokemon.sprites.other['official-artwork'].front_shiny;
    document.querySelector('.searched-pokemon-image').setAttribute('src', frontShinyDefault);
  } else {
    const frontDefaultSprite = searchedPokemon.sprites.other['official-artwork'].front_default;
    document.querySelector('.searched-pokemon-image').setAttribute('src', frontDefaultSprite);
  }

  const pokemonName = searchedPokemon.name;
  const word = pokemonName;
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
  document.getElementById('pokemon-name').textContent = capitalized;

  const stats = searchedPokemon.stats;
  for (const index in stats) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = `${stats[index].stat.name}: ${stats[index].base_stat}`;
    document.querySelector('.search-pokemon-stats').appendChild(li);
  }

  const abilities = searchedPokemon.abilities;
  for (const index in abilities) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = `${abilities[index].ability.name}`;
    document.querySelector('.search-pokemon-abilities').appendChild(li);
  }

  const moves = searchedPokemon.moves;
  for (let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerText = `${moves[i].move.name}`;
    document.querySelector('.search-pokemon-moves').appendChild(li);
  }

}

function searchForPokemon() {
  searchPokemonName = document.getElementById('search-input').value;
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemonName}`)
    .then(response => response.json())
    .then(response => {
      searchedPokemon = response;
      data.searchedPokemon = searchedPokemon;
    })
    .then(data => { getFlavorText(); })
    .then(data => { resetSearchedPokemon(); })
    .then(data => { changeViewToSearchedPokemon(); })
    .catch(error => console.error(error));
}

function getFlavorText() {
  fetch(searchedPokemon.species.url)
    .then(response => response.json())
    .then(data => {
      flavorText = data.flavor_text_entries[0].flavor_text;
      if (document.querySelector('.flavorText')) {
        document.querySelector('.flavorText').innerText = flavorText;
      }
    })

    .catch(error => console.error(error));
}

const star = document.getElementById('favorite');
star.addEventListener('click', function () {
  document.getElementById('favorite-path').setAttribute('fill', 'yellow');
  data.team.push(searchedPokemon);
});

document.getElementById('team').addEventListener('click', changeViewToTeam);

function changeViewToTeam() {
  document.querySelector('.home').classList.add('display-none');
  document.querySelector('.search-pokemon').classList.add('display-none');
  document.querySelector('.team-pokemon').classList.remove('display-none');
  document.querySelector('.go-back').classList.remove('display-none');
  data.pageView = 'team';

  const removeButtons = [...document.querySelectorAll('.remove-in-team-view')];
  for (const index in removeButtons) {
    if (removeButtons[index]) {
      removeButtons[index].classList.add('display-none');
    }
  }
  const items = [...document.getElementsByClassName('individual')];
  for (const i in items) {
    if (items[i]) {
      items[i].remove();
    }
  }
  for (const index in data.team) {
    const pokemon = data.team[index];
    const div = document.createElement('div');
    div.className = 'col individual';
    div.setAttribute('target-id', pokemon.id);
    div.addEventListener('click', function () {
      searchedPokemon = data.team[index];
      resetSearchedPokemon();
      changeViewToSearchedPokemon();
    });
    const image = document.createElement('img');
    image.setAttribute('src', pokemon.sprites.front_default);
    div.appendChild(image);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('target-id', pokemon.id);
    deleteBtn.className = 'btn-danger';
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-sm');

    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('data-bs-toggle', 'modal');
    deleteBtn.setAttribute('data-bs-target', '#modal');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('class', 'bi bi-x-circle');
    svg.setAttribute('viewBox', '0 0 16 16');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z');

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z');

    svg.appendChild(path1);
    svg.appendChild(path2);

    deleteBtn.appendChild(svg);

    div.appendChild(deleteBtn);

    document.querySelector('.team-container').appendChild(div);

    deleteBtn.addEventListener('click', function (event) {
      deletePokemonId = event.target.getAttribute('target-id');
    });
  }

}

function resetSearchedPokemon() {
  const items = [...document.getElementsByClassName('list-group-item')];
  for (const i in items) {
    if (items[i]) {
      items[i].remove();
    }
  }
  const star = document.getElementById('favorite-path');
  star.removeAttribute('fill');
}
const back = document.querySelector('.go-back');
data.pageView = 'main';
back.addEventListener('click', function () {
  document.querySelector('.home').classList.remove('display-none');
  document.querySelector('.team-pokemon').classList.add('display-none');
  const removeButtons = [...document.querySelectorAll('.remove-in-team-view')];
  for (const index in removeButtons) {
    if (removeButtons[index]) {
      removeButtons[index].classList.remove('display-none');
    }
  }
  document.querySelector('.go-back').classList.add('display-none');
});

const togglePic = document.querySelector('.toggle-pic');
togglePic.addEventListener('click', function () {

  data.showFrontImgDefault = !data.showFrontImgDefault;

  if (data.showFrontImgDefault) {
    const frontShinyDefault = searchedPokemon.sprites.other['official-artwork'].front_shiny;
    document.querySelector('.searched-pokemon-image').setAttribute('src', frontShinyDefault);
  } else {
    const frontDefaultSprite = searchedPokemon.sprites.other['official-artwork'].front_default;
    document.querySelector('.searched-pokemon-image').setAttribute('src', frontDefaultSprite);
  }
});

// eslint-disable-next-line no-unused-vars
function deleteTeam(event) {

  let index = null;
  for (let i = 0; i < data.team.length; i++) {
    if (parseInt(deletePokemonId) === parseInt(data.team[i].id)) {
      index = i;
    }
  }
  if (index >= 0) {
    const removeDiv = document.querySelector(`[target-id="${deletePokemonId}"]`);
    removeDiv.remove();
    data.team.splice(index, 1);
  }

  changeViewToTeam();
  document.getElementById('modal').style.visibility = 'hidden';
}
