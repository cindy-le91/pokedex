const searchButton = document.getElementById('search');
let searchedPokemon = null;

searchButton.addEventListener('click', function () {
  const searchPokemonName = document.getElementById('search-input').value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemonName}`)
    .then(response => response.json())
    .then(data => { searchedPokemon = data; })
    .catch(error => console.error(error));

  changeViewToSearchedPokemon();
});

function changeViewToSearchedPokemon() {
  document.querySelector('.home').classList.add('display-none');
  document.querySelector('.search-pokemon').classList.remove('display-none');

}

searchedPokemon();
