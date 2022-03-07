const FoodServiceDataset = require('../src/FoodServicesDataset')
const TFIDF = require('../src/TFIDF')
const { Tokenizer } = require('../src/Tokenizer')
const { DocumentCollection } = require('../src/DocumentCollection')
const Jieba = require('../src/Jieba')
const fs = require('fs')
const os = require('os')
const { TFIDFResultExcelExporter } = require('../src/TFIDFResultExcelExporter')

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
    const dc = new DocumentCollection().loadDocumentsFromWorkBook(FoodServiceDataset.ExcelWorkbook)
    const tokenizationResults = Tokenizer.parseDocuments(dc)
    const tfidfResult = TFIDF.tfidf(tokenizationResults)
    TFIDFResultExcelExporter.export(tfidfResult, tokenizationResults, './tfidf.xlsx')

    try {
      fs.unlinkSync(userDictFileName)
      fs.unlinkSync(stopWordsFileName)
    } catch (e) {

    }
  })
})
