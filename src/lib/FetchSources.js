const Processor = require('./Process.js');
const Creds = require('./credentials.js');

const waitTime = 10000;

/**
 * checks every ten seconds if the speed test results are prepared
 *
 * @param {String} resultsURL: URL to check for test results
 * @param {String} url: URL we are running the test on
 */
const checkIfResultsPrepared = (resultsUL, url) => {
  window.fetch(resultsUL)
    .then((blob) => blob.json())
    .then((response) => {
      // if the results aren't prepared, then queue another check
      if (response.data &&
         (response.data.statusCode === 100 ||response.data.statusCode === 101)) {
        const updateEvent = new CustomEvent(
          'statusUpdate', { detail: response.data.statusText }
        );
        document.dispatchEvent(updateEvent);
        setTimeout(() => {
          checkIfResultsPrepared(resultsUL, url);
        }, waitTime);
      }
      // cool, now we parse the results
      else {
        const dataToProcess = response.data;
        Processor.process(dataToProcess, url);
      }
    })
    .catch((err) => console.log(err));
};

/**
 * Function description
 *
 * @param {String} url: URL we are running the test on
 */
const fetchSources = (url) => {
  const apiKey = Creds.getAPIKey();
  const wpt = new window.webPageTest('www.webpagetest.org', apiKey);
  wpt.runTest(url, (err, response) => {
    if (response && response.statusCode === 200) {
      const responseURL = response.data.jsonUrl;
      checkIfResultsPrepared(responseURL, url);
    }
  });
};

module.exports = {
  fetchSources,
};
