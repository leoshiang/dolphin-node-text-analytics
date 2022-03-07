const { DocumentCollection } = require('./DocumentCollection')
const { Tokenizer } = require('./Tokenizer')
const TFIDF = require('./TFIDF')
const { TFIDFResultCsvExporter } = require('./TFIDFResultCsvExporter')
const { Jieba } = require('./Jieba')

class NLP {

  #documentCollection
  #stopWords
  #tfidfResult
  #tokenizationResults
  #userDictionary

  constructor () {
    this.#documentCollection = new DocumentCollection()
  }

  get documentCollection () {
    return this.#documentCollection
  }

  calculateTFIDF () {
    Jieba.load({
                 userDict: this.#userDictionary,
                 stopWordDict: this.#stopWords,
               })
    this.#tokenizationResults = Tokenizer.parseDocuments(this.#documentCollection)
    this.#tfidfResult = TFIDF.tfidf(this.#tokenizationResults)
    return this
  }

  exportTFIDFToCsv (fileName) {
    TFIDFResultCsvExporter.export(this.#tfidfResult, this.#tokenizationResults, fileName)
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
  loadStopWords (fileName) {
    this.#stopWords = fileName
    return this
  }

  /**
   * 載入使用者字典。
   * @param {string} fileName 檔案名稱。
   * @return {NLP}
   */
  loadUserDictionary (fileName) {
    this.#userDictionary = fileName
    return this
  }
}

module.exports = { NLP }
