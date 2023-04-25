/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  const codeJournalJSON = JSON.stringify(data);
  localStorage.setItem('local-storage', codeJournalJSON);
});

const previousJournalEntries = localStorage.getItem('local-storage');

if (previousJournalEntries !== 'null') {
  data = JSON.parse(previousJournalEntries);
}
