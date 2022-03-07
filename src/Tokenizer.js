const { Jieba } = require('./Jieba')
const { Tokens } = require('./TokenizationResult')

/**
 * @class
 */
class Tokenizer {

  static parseDocument (document) {
    let terms = Jieba.cut(document.asString())
    return new Tokens(terms.filter(x => x !== ' '))
  }

  static parseDocuments (collection) {
    let result = []
    collection.forEach(document => result.push(this.parseDocument(document)))
    return result
  }
}

module.exports = { Tokenizer }
