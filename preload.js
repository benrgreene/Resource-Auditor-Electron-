const electron = require('electron');

window.process = require('process');
window.fileSystem = require('file-system');
window.fetch = require("node-fetch");
window.webPageTest = require('webpagetest');
window.cron = require("node-cron");
window.app = electron.remote.app;

/**
 * Set's the CWD of the node process
 */
const setUserDirectory = () => {
  const currentUser = process.env.USER;
  process.chdir(`/Users/${currentUser}/`);
};

/**
 * perform general setup of the system
 */
const setup = () => {
  setUserDirectory();
};

setup();

// const test = window.cron.schedule('59 * * * *', () => {
//   console.log('test');
// });
// console.log(test);
