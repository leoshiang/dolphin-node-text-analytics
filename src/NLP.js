const { DocumentCollection } = require('./DocumentCollection')
const { Tokenizer } = require('./Tokenizer')
const TFIDF = require('./TFIDF')
const { TFIDFResultCsvExporter } = require('./TFIDFResultCsvExporter')
const { TFIDFResultExcelExporter } = require('./TFIDFResultExcelExporter')
const { Jieba } = require('./Jieba')
const fs = require('fs')

class NLP {

  #documentCollection
  #stopWordsFileName
  #tfidfResult
  #tokenizationResults
  #userDictionaryFileName
  #stopWords

  constructor () {
    this.#documentCollection = new DocumentCollection()
    this.#stopWords = []
  }

  get documentCollection () {
    return this.#documentCollection
  }

  #loadStopWords () {
    this.#stopWords = {}
    fs.readFileSync(this.#stopWordsFileName, 'utf8')
      .split('\r\n')
      .forEach(x => {
        this.#stopWords[x] = true
      })
  }

  calculateTFIDF () {
    Jieba.load({
                 userDict: this.#userDictionaryFileName,
                 stopWordDict: this.#stopWordsFileName,
               })
    this.#loadStopWords()
    this.#tokenizationResults = Tokenizer.parseDocuments(this.#documentCollection, this.#stopWords)
    this.#tfidfResult = TFIDF.tfidf(this.#tokenizationResults)
    return this
  }

  exportTFIDFToCsv (fileName) {
    TFIDFResultCsvExporter.export(this.#tfidfResult, this.#tokenizationResults, fileName)
    return this
  }

  exportTFIDFToExcel (fileName) {
    TFIDFResultExcelExporter.export(this.#tfidfResult, this.#tokenizationResults, fileName)
    return this
  }

  /**
   * 加入文件。
   * @param {string} fileName 文件檔案名稱。
   * @param {string} name 文件名稱。
   * @return {NLP}
   */
  loadDocument (fileName, name) {
    this.#documentCollection.loadDocumentFromFile(fileName)
    return this
  }

  /**
   * 加入 Excel 檔案。每一個 Sheet 會被當作一份文件處理。
   * @param {string} fileName 檔案名稱。
   * @return {NLP}
   */
  loadDocumentsFromExcel (fileName) {
    this.#documentCollection.loadDocumentsFromExcel(fileName)
    return this
  }

  /**
   * 載入停等字。
   * @param {string} fileName 檔案名稱。
   * @return {NLP}
   */
  loadStopWordsFile (fileName) {
    this.#stopWordsFileName = fileName
    return this
  }

  /**
   * 載入使用者字典。
   * @param {string} fileName 檔案名稱。
   * @return {NLP}
   */
  loadUserDictionaryFile (fileName) {
    this.#userDictionaryFileName = fileName
    return this
  }
}

module.exports = { NLP }
