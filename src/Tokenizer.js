const { Jieba } = require('./Jieba')
const { Tokens } = require('./Tokens')
const FoodServiceDataSet = require('./FoodServicesDataset')

/**
 * @class
 */
class Tokenizer {

  static parse (document) {
    let terms = Jieba.cut(document.asString())
    return new Tokens(terms.filter(x => x !== ' '))
  }

  static parseCollection (documentCollection) {
    let result = []
    documentCollection.forEach(document => result.push(this.parse(document)))
    return result
  }
}

module.exports = { Tokenizer }
