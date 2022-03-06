const FoodServiceDataset = require('../src/FoodServicesDataset')
const TFIDF = require('../src/TFIDF')
const { Tokenizer } = require('../src/Tokenizer')
const { Document } = require('../src/Document')
const { Corpus } = require('../src/Corpus')
const Jieba = require('../src/Jieba')
const fs = require('fs')

describe('測試 tf', () => {
  test('測試 Document1', () => {
    const document = new Document().addText(FoodServiceDataset.Document1)
    const tokens = Tokenizer.parse(document)
    expect(TFIDF.tf('好吃', tokens)).toBe(0.012517385257301807)
  })
})

describe('測試 idf', () => {
  test('測試 FoodServicesDataset', () => {
    fs.writeFileSync('./userdict.txt',
                     Buffer.from(FoodServiceDataset.UserDictionary, 'base64').toString('utf8'),
                     { flag: 'w+' })
    fs.writeFileSync('./stopword.txt',
                     Buffer.from(FoodServiceDataset.StopWords, 'base64').toString('utf8'),
                     { flag: 'w+' })

    Jieba.initJieba({
                      userDict: './userdict.txt',
                      stopWordDict: './stopword.txt',
                    })
    const docs = new Corpus().loadFromWorkBook(FoodServiceDataset.ExcelWorkbook)
    const tokenArray = Tokenizer.parseCollection(docs)
    expect(TFIDF.idf('滷肉飯', tokenArray)).toBe(4.248495242049359)

    fs.unlinkSync('./userdict.txt')
    fs.unlinkSync('./stopword.txt')
  })
})
