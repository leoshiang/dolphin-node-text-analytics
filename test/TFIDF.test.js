const FoodServiceDataset = require('../src/FoodServiceDataset')
const TFIDF = require('../src/TFIDF')
const { Tokenizer } = require('../src/Tokenizer')
const { Document } = require('../src/Document')
const { DocumentCollection } = require('../src/DocumentCollection')
const mock = require('mock-fs')
const Jieba = require('../src/Jieba')

describe('測試 tf', () => {
  test('測試 Document1', () => {
    const document = new Document().add(FoodServiceDataset.Document1)
    const tokens = Tokenizer.parse(document)
    expect(TFIDF.tf('好吃', tokens)).toBe(0.012517385257301807)
  })
})

describe('測試 idf', () => {
  test('測試 Document1', () => {
    Jieba.initJieba({
                      userDict: '/Users/leoshiang/Workspace/node-nlp/test-data/userdict.txt',
                      stopWordDict: '/Users/leoshiang/Workspace/node-nlp/test-data/stopword_tC.txt',
                    })
    const docs = new DocumentCollection().loadFromExcel(FoodServiceDataset.ExcelWorkbook)
    const tokenArray = Tokenizer.parseCollection(docs)
    expect(TFIDF.idf('滷肉飯', tokenArray)).toBe(1.3040562628829184)
  })
})

describe('測試 tfidf', () => {
  test('測試 Document1', () => {
    Jieba.initJieba({
                      userDict: '/Users/leoshiang/Workspace/node-nlp/test-data/userdict.txt',
                      stopWordDict: '/Users/leoshiang/Workspace/node-nlp/test-data/stopword_tC.txt',
                    })
    const docs = new DocumentCollection().loadFromExcel(FoodServiceDataset.ExcelWorkbook)
    const tokenArray = Tokenizer.parseCollection(docs)
    let matrix = TFIDF.tfidf(tokenArray)
    TFIDF.dump_tfidf(matrix)
  })
})
