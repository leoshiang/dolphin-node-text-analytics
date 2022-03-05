const { Jieba } = require('./Jieba')
const { Tokens } = require('./Tokens')
const FoodServiceDataSet = require('./FoodServiceDataset')

/**
 * @class
 */
class Tokenizer {

  static parse (document) {
    let terms = Jieba.cut(document.asString())
    let c = terms.filter(x => FoodServiceDataSet.ExtraStopWords.indexOf(x) === -1)
    return new Tokens(c.filter(x => x !== ' '))
  }

  static parseCollection (documentCollection) {
    let result = []
    documentCollection.forEach(document => result.push(this.parse(document)))
    return result
  }
}

module.exports = { Tokenizer }
