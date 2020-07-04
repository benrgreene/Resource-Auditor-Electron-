const storageSettings = {
  imageCookie: 'rc-image',
};

/**
 * Saves a cookie with application data
 *
 * @param {String} name: the name of the cookie to write to
 * @param {String} data: JSON string of the data to save
 */
const saveCookie = (name, data) => {
  window.fileSystem.fs.writeFileSync(`.resource-audit-${name}.txt`, data);
  const testData = window.fileSystem.fs.readFileSync(`.resource-audit-${name}.txt`, 'utf8');
};

/**
 * Get app state data
 *
 * @param {String} name: name of the cookie to load
 * @param {boolean} shouldDelete: whether or not to delete the file after reading from it
 *
 * @return {Object}: the data loaded
 */
const getData = (name, shouldDelete=true) => {
  const fileName = `.resource-audit-${name}.txt`;
  const data = window.fileSystem.fs.readFileSync(fileName, 'utf8');
  shouldDelete && window.fileSystem.fs.unlinkSync(fileName);
  return JSON.parse(data);
};

module.exports = {
  storageSettings,
  saveCookie,
  getData,
};
