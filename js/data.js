
var data = {
  team: [],
  showFrontImgDefault: true,
  pageView: 'main',
  searchedPokemon: null
};
window.addEventListener('beforeunload', function (event) {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('local-storage', dataJson);
});

const dataJson = localStorage.getItem('local-storage');

if (dataJson !== 'null') {
  data = JSON.parse(dataJson);
}
