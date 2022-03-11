const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')
const { TfidfCalculator } = require('../src/TfidfCalculator')
const { WordsSegmenter } = require('../src/WordsSegmenter')
const { Corpus } = require('../src/Corpus')
const Jieba = require('../src/Jieba')
const fs = require('fs')
const os = require('os')

describe('測試 tfidf', () => {
  test('測試 FoodServicesDataset', () => {
    const tempDir = os.tmpdir() // /tmp

    let userDictFileName = tempDir + '/userdict.txt'
    let stopWordsFileName = tempDir + '/stopwords.txt'

    fs.writeFileSync(userDictFileName,
                     Buffer.from(FoodServiceDataset.UserDictionary, 'base64').toString('utf8'),
                     { flag: 'w+' })
    fs.writeFileSync(stopWordsFileName,
                     Buffer.from(FoodServiceDataset.StopWords, 'base64').toString('utf8'),
                     { flag: 'w+' })

    Jieba.initJieba({
                      userDict: userDictFileName,
                      stopWordDict: stopWordsFileName,
                    })
    const corpus = new Corpus().readWorkBook(FoodServiceDataset.ExcelWorkbook)
    const results = WordsSegmenter.tokenizeCorpus(corpus)
    const tfidfResult = TfidfCalculator.execute(results)
    expect(tfidfResult.getIDF('滷肉飯', results)).toBe(0.0022522522522522522)

    fs.unlinkSync(userDictFileName)
    fs.unlinkSync(stopWordsFileName)
  })
})
