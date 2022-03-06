const FoodServiceDataset = require('../src/FoodServicesDataset')
const TFIDF = require('../src/TFIDF')
const { Tokenizer } = require('../src/Tokenizer')
const { Document } = require('../src/Document')
const { DocumentCollection } = require('../src/DocumentCollection')
const Jieba = require('../src/Jieba')
const fs = require('fs')

describe('測試 tf', () => {
  test('測試 Document1', () => {
    const document = new Document().addText(FoodServiceDataset.Document1)
    const tokens = Tokenizer.parseDocument(document)
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
    const dc = new DocumentCollection().loadFromWorkBook(FoodServiceDataset.ExcelWorkbook)
    const tokensArray = Tokenizer.parseCollection(dc)
    expect(TFIDF.idf('滷肉飯', tokensArray)).toBe(1.3040562628829184)

    fs.unlinkSync('./userdict.txt')
    fs.unlinkSync('./stopword.txt')
  })
})

describe('測試 tfidf', () => {
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
    const dc = new DocumentCollection().loadFromWorkBook(FoodServiceDataset.ExcelWorkbook)
    const tokensArray = Tokenizer.parseCollection(dc)
    const matrix = TFIDF.tfidf(tokensArray)
    expect(matrix).toBe([])

    fs.unlinkSync('./userdict.txt')
    fs.unlinkSync('./stopword.txt')
  })
})
