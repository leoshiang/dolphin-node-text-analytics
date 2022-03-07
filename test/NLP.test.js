const FoodServiceDataset = require('../src/FoodServicesDataset')
const { NLP } = require('../src/NLP')
const os = require('os')
const fs = require('fs')

describe('測試 loadDocumentsFromExcel', function () {
  test('讀取 FoodServiceDataset.Excel，應有 70 個文件。', function () {

    const tempDir = os.tmpdir() // /tmp
    let fileName = tempDir + '/food-service.xlsx'
    let excelFile = Buffer.from(FoodServiceDataset.Base64EncodedExcel, 'base64')
    fs.writeFileSync(fileName, excelFile, { flag: 'w+' })
    let userDictFileName = tempDir + '/userdict.txt'
    let stopWordsFileName = tempDir + '/stopwords.txt'
    fs.writeFileSync(userDictFileName,
                     Buffer.from(FoodServiceDataset.UserDictionary, 'base64').toString('utf8'),
                     { flag: 'w+' })
    fs.writeFileSync(stopWordsFileName,
                     Buffer.from(FoodServiceDataset.StopWords, 'base64').toString('utf8'),
                     { flag: 'w+' })

    let nlp = new NLP()
    nlp.loadUserDictionary(userDictFileName)
       .loadStopWords(stopWordsFileName)
       .loadDocumentsFromExcel(fileName)
       .calculateTFIDF()
       .exportTFIDFToCsv('./tfidf.csv')

    try {
      fs.unlinkSync(fileName)
    } catch (e) {
    }
  })
})
