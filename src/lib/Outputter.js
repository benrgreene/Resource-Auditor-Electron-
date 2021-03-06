const store = require('../store/index.js');
const Cookies = require('./Cookies.js');


const getFullSizeOfHosts = (data) => {
  return data.reduce((totalSize, host) => {
    return totalSize + host.totalResources;
  }, 0);
};

/**
 * Get the time as a string
 *
 * @return {String}: the time
 */
const getTime = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
};

/**
 * Builds output for a single resource from a host
 *
 * @param {Object} resource: the individual resource to display
 * @param {Object} host: the host the resource is for
 *
 * @return {Node}: the element for the resource to display
 */
const buildResource = (resource, host) => {
  const resourceParamIndex = resource.url.indexOf('?') >= 0 ? resource.url.indexOf('?') : resource.url.length;
  return `<div class="resource">
  <a href="https://${host.host}${resource.url}"><h3 class="resource__name">${resource.url.substring(0, resourceParamIndex)}</h3></a>
  <div class="resource__grid">
    <p class="type">Resource Type: ${resource.contentType}</p>
    <p class="size">Resource Size: ${resource.size / 1000}kB</p>
    <p class="ttfb">Resource TTFB: ${resource.ttfbMS}</p>
    <p class="load-time">Load Time: ${resource.loadMS}</p>
  </div>
</div>`;
};

/**
 * Builds the image markup to display in the audit
 *
 * @return {String}: markup to display
 */
const buildImageMarkup = () => {
  const imageData = Cookies.getData(Cookies.storageSettings.imageCookie);
  return imageData.reduce((markup, image) => {
    const startIndex = Math.max(image.url.lastIndexOf('/') + 1, 0);
    const endIndex = image.url.includes('?') ? image.url.indexOf('?') : image.url.length;
    return `${markup}<div class="image-entry">
  <div class="image-entry__image-wrapper">
    <img class="image-entry__image" src="${image.url}"/>
  </div>
  <div>
    <a href="${image.url}"><h2 class="image-entry__name">${image.url.substring(startIndex, endIndex)}</h2></a>
    <p>Natural Size / Size Ratio: ${Math.round(image.widthRatio * 100)}%</p>
    <p>Image Width: ${image.naturalWidth}px</p>
    <p>Image Width Space: ${image.width}px</p>
  </div>
</div>`;
  }, '');
};

/**
 * Outputs the data for a speed test
 *
 * @param {Array} data: the data to output
 */
const outputFile = (data, url) => {
  const time = getTime();
  const pageWeight = getFullSizeOfHosts(data) / 1000;
  const fileName = `./Downloads/audit-${url.replace(/\//g, '-')}-${time}.html`;
  // get our template file
  const templateFile = `${window.app.getAppPath()}/src/lib/Templates/output.html`;
  const template = window.fileSystem.fs.readFileSync(templateFile, {
    encoding: "utf8"
  });
  // now build the output file
  const content = data.reduce((fileContent, host) => {
    const hostSize = host.totalResources / 1000;
    const hostContent = host.resources.reduce((hostOutput, resource) => {
      return `${hostOutput}${buildResource(resource, host)}`;
    }, '');
    return `${fileContent}
      <details>
        <summary>
          <h2 class="host">${host.host}</h2>
          <p class="size">Host Resources Loaded: ${hostSize.toFixed(2)}kB (${(hostSize / pageWeight * 100).toFixed(2)}% of page weight)</p>
        </summary>
        ${hostContent}
      </details>`;
  }, '');
  // grab image markup
  const imageMarkup = buildImageMarkup();
  // make output replacements
  const fileOutput = template.replace(/__TIME__/g, time)
                             .replace(/__URL__/g, url)
                             .replace(/__CONTENT__/g, content)
                             .replace(/__IMAGES__/g, imageMarkup)
                             .replace(/__WEIGHT__/g, `${pageWeight}kB`);
  window.fileSystem.fs.writeFileSync(fileName, fileOutput);
  store.default.dispatch('resource/setResource', {
    HTML: fileOutput,
    file: fileName,
  });
};

module.exports ={
  outputFile,
}
