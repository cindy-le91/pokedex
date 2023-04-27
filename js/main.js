const searchButton = document.getElementById('search');
let searchedPokemon = null;
let searchPokemonName = null;
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
  for (let i = 0; i < 20; i++) {
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
  document.querySelector('.team-pokemon').classList.remove('display-none');
}
