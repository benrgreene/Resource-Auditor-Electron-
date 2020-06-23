const FetchMap = require('./FetchMap.js');
const Images = require('./Images.js');

const process = (data, url) => {
  Images.auditImages(data, url);
  FetchMap.fetchMap(data.id, url);
};

module.exports = {
  process,
};
