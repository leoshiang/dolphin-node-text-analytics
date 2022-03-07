const { Jieba } = require('./Jieba')
const { TokenizationResult } = require('./TokenizationResult')

/**
 * @class
 */
class Tokenizer {

  static parseDocument (document) {
    let terms = Jieba.cut(document.asString()).filter(x => x !== ' ')
    return new TokenizationResult(document, terms)
  }

  static parseDocuments (collection) {
    let result = []
    collection.forEach(document => result.push(this.parseDocument(document)))
    return result
  }
}

module.exports = { Tokenizer }
