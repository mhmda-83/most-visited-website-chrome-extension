const getDomain = (url, subdomain) => {
  subdomain = subdomain || false;

  url = url.replace(/(https?:\/\/)?(www.)?/i, '');

  if (!subdomain) {
      url = url.split('.');

      url = url.slice(url.length - 2).join('.');
  }

  if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
  }

  return url;
};

chrome.storage.sync.get('mostVisitedWebsites', value => {
  // check if no value set yet
  if (Object.keys(value).length === 0) {
    return chrome.storage.sync.set({
      mostVisitedWebsites: [
        { url: getDomain(window.location.hostname, true), numberOfVisits: 1 }
      ]
    });
  }
  // check if url exists
  const isOldUrl = value.mostVisitedWebsites.find(el => {
    return el.url === getDomain(window.location.hostname, true);
  });
  if (!isOldUrl) {
    // if new url add to list
    value.mostVisitedWebsites.push({
      url: getDomain(window.location.hostname, true),
      numberOfVisits: 1
    });
  } else {
    // if it's not a new url add numberOfVisits
    let newValue = value.mostVisitedWebsites.map(value => {
      if (value.url === getDomain(window.location.hostname, true)) {
        value.numberOfVisits += 1;
      }
      return value;
    });
    value.mostVisitedWebsites = newValue;
  }
  // sort by numberOfVisits
  value.mostVisitedWebsites = value.mostVisitedWebsites.sort(
    (object1, object2) => {
      return object2.numberOfVisits - object1.numberOfVisits;
    }
  );
  chrome.storage.sync.set(value);
});
