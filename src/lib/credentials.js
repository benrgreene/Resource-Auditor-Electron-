const templateFile = '.electro-resource-checker.json';

/**
 * Make sure there is a file for the settings
 */
const ensureSettingsExist = () => {
  if (!window.fileSystem.fs.existsSync(templateFile)) {
    setAPIKey(false);
  }
};

/**
 * Loads the API key from local settings, and exits the script
 * if there is no API key set
 *
 * @return {String}: the API key to use
 */
const getAPIKey = () => {
  const settingsRaw = window.fileSystem.fs.readFileSync(templateFile);
  const settings = JSON.parse(settingsRaw) || false;
  if (settings.API_KEY) {
    return settings.API_KEY;
  } else {
    return false;
  }
};

/**
 * Set the API key to use on the local machine
 *
 * @param {String} apiKey: the key to save
 */
const setAPIKey = (apiKey) => {
  const settings = JSON.stringify({
    API_KEY: apiKey,
  });
  window.fileSystem.fs.writeFileSync(templateFile, settings);
};

module.exports = {
  ensureSettingsExist,
  getAPIKey,
  setAPIKey,
};
