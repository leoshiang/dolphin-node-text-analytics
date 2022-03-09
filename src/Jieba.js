const Jieba = require('nodejieba')

/**
 *
 * @param {LoadOptions} config
 */
function initJieba (config) {
  Jieba.load(config)
}

module.exports = {
  initJieba,
  Jieba,
}
