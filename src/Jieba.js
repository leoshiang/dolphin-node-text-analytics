const Jieba = require('nodejieba')

Jieba.load()

/**
 *
 * @param {LoadOptions} config
 */
function initJieba (config) {
  Jieba.load(config)
}

module.exports = {
  initJieba,
  Jieba
}
