
var data = {
  team: []
};

window.addEventListener('beforeunload', function (event) {
  const team = JSON.stringify(data);
  localStorage.setItem('local-storage', team);
});

const team = localStorage.getItem('local-storage');

if (team !== 'null') {
  data = JSON.parse(team);
}
