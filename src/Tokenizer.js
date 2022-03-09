const { Jieba } = require('./Jieba')
const { TokenizationResult } = require('./TokenizationResult')

/**
 * @class
 */
class Tokenizer {

  static parseDocument (document, stopWords = {}) {
    let terms = Jieba.cut(document.asString()).filter(x => {
      return (x !== ' ') && !stopWords[x]
    })
    return new TokenizationResult(document, terms)
  }

  static parseDocuments (documents, stopWords) {
    let result = []
    documents.forEach(document => result.push(this.parseDocument(document, stopWords)))
    return result
  }
}

module.exports = { Tokenizer }
