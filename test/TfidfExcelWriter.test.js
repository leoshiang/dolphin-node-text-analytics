const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')
const { WordsSegmenter } = require('../src/WordsSegmenter')
const Jieba = require('../src/Jieba')
const fs = require('fs')
const os = require('os')
const { TfidfExcelWriter } = require('../src/Writers/TfidfExcelWriter')
const { Corpus } = require('../src/Corpus')
const { TfidfCalculator } = require('../src/TfidfCalculator')

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
    const segmentationResults = WordsSegmenter.tokenizeCorpus(corpus)
    const tfidfResult = TfidfCalculator.execute(segmentationResults)
    TfidfExcelWriter.export(segmentationResults, tfidfResult, './output/tfidf.xlsx')
    try {
      fs.unlinkSync(userDictFileName)
      fs.unlinkSync(stopWordsFileName)
      fs.unlinkSync('./output/tfidf.xlsx')
    } catch (e) {

    }
  })
})
