const { Jieba } = require('./Jieba')
const { Tokens } = require('./Tokens')
const FoodServiceDataSet = require('./FoodServicesDataset')

/**
 * @class
 */
class Tokenizer {

  static parseDocument (document) {
    let terms = Jieba.cut(document.asString())
    return new Tokens(terms.filter(x => x !== ' '))
  }

  static parseCollection (collection) {
    let result = []
    collection.forEach(document => result.push(this.parseDocument(document)))
    return result
  }
}

module.exports = { Tokenizer }
