chrome.storage.sync.get('mostVisitedWebsites', value => {
  // check if no value set yet
  if (Object.keys(value).length === 0) {
    return chrome.storage.sync.set({
      mostVisitedWebsites: [
        { url: window.location.hostname, numberOfVisits: 1 }
      ]
    });
  }
  // check if url exists
  const isOldUrl = value.mostVisitedWebsites.find(el => {
    return el.url === window.location.hostname;
  });
  if (!isOldUrl) {
    // if new url add to list
    value.mostVisitedWebsites.push({
      url: window.location.hostname,
      numberOfVisits: 1
    });
  } else {
    // if it's not a new url add numberOfVisits
    let newValue = value.mostVisitedWebsites.map(value => {
      if (value.url === window.location.hostname) {
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
