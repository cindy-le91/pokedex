const searchButton = document.getElementById('search');
let searchedPokemon = null;
let searchPokemonName = 'pikachu';
let flavorText = '';

searchButton.addEventListener('click', searchForPokemon);

function changeViewToSearchedPokemon() {

  document.querySelector('.home').classList.add('display-none');
  document.querySelector('.search-pokemon').classList.remove('display-none');

  const frontDefaultSprite = searchedPokemon.sprites.other['official-artwork'].front_default;
  document.querySelector('.searched-pokemon-image').setAttribute('src', frontDefaultSprite);

  const pokemonName = searchedPokemon.name;
  document.getElementById('pokemon-name').textContent = pokemonName;

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
    .then(data => {
      searchedPokemon = data;
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
    div.addEventListener('click', function () {
      searchedPokemon = data.team[index];
      resetSearchedPokemon();
      changeViewToSearchedPokemon();
    });
    const image = document.createElement('img');
    image.setAttribute('src', pokemon.sprites.front_default);
    div.appendChild(image);

    document.querySelector('.team-container').appendChild(div);
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
  showFrontImg = !showFrontImg;
  if (showFrontImg) {
    const frontShinyDefault = searchedPokemon.sprites.other['official-artwork'].front_shiny;
    document.querySelector('.searched-pokemon-image').setAttribute('src', frontShinyDefault);
  } else {
    const frontDefaultSprite = searchedPokemon.sprites.other['official-artwork'].front_default;
    document.querySelector('.searched-pokemon-image').setAttribute('src', frontDefaultSprite);

  }
});

let showFrontImg = true;
