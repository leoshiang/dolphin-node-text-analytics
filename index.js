const { DocumentCollection } = require('./src/DocumentCollection')
const { Document } = require('./src/Document')
const { FoodServicesDataset } = require('./src/FoodServicesDataset')
const { Tokenizer } = require('./src/Tokenizer')
const { TokenizationResult } = require('./src/TokenizationResult')
const { TFIDF } = require('./src/TFIDF')
const { Jieba } = require('./src/Jieba')

module.exports = {
  Corpus: DocumentCollection,
  Document,
  FoodServicesDataset,
  Tokenizer,
  Tokens: TokenizationResult,
  TFIDF,
  Jieba
}
