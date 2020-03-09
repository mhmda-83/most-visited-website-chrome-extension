const list = document.getElementById('list');

chrome.storage.sync.get('mostVisitedWebsites', value => {
  // check if no value set yet
  if (Object.keys(value).length === 0) {
    document.getElementById('clear').style.display = 'none';
    return document.body.insertAdjacentHTML(
      'beforeend',
      '<h2>There is not item in list<h2>'
    );
  }
  // get top 10 websites
  value.mostVisitedWebsites = value.mostVisitedWebsites.slice(0, 10);

  // show websites in list
  value.mostVisitedWebsites.forEach(website => {
    list.insertAdjacentHTML(
      'beforeend',
      `<a href="http://${website.url}" target="_blank"><li title="Number of visits: ${website.numberOfVisits}"}>${website.url}</li></a>`
    );
  });
});

// clear button functionality
document.getElementById('clear').addEventListener('click', () => {
  chrome.storage.sync.remove('mostVisitedWebsites', () => {
    list.innerHTML = '';
  });
});
