const { DocumentCollection } = require('./DocumentCollection')
const { Tokenizer } = require('./Tokenizer')
const TFIDF = require('./TFIDF')
const { Jieba } = require('./Jieba')
const fs = require('fs')
const { Matrix } = require('node-dolphin')

class TextAnalytics {

  #documentCollection
  #stopWords
  #stopWordsFileName
  #tfidfResult
  #tokenizationResults
  #totalTermCount
  #userDictionaryFileName

  constructor () {
    this.#documentCollection = new DocumentCollection()
    this.#stopWords = []
    this.#tfidfResult = {}
    this.#totalTermCount = 0
  }

  get documentCollection () {
    return this.#documentCollection
  }

  get tfidfResult () {
    return this.#tfidfResult
  }

  get tokenizationResults () {
    return this.#tokenizationResults
  }

  #loadStopWords () {
    this.#stopWords = {}
    fs.readFileSync(this.#stopWordsFileName, 'utf8')
      .split('\r\n')
      .forEach(x => {
        this.#stopWords[x] = true
      })
  }

  /**
   * 加入文件。
   * @param {string} fileName 文件檔案名稱。
   * @param {string} name 文件名稱。
   * @return {TextAnalytics}
   */
  loadDocument (fileName, name) {
    this.#documentCollection.loadDocumentFromFile(fileName)
    return this
  }

  /**
   * 加入 Excel 檔案。每一個 Sheet 會被當作一份文件處理。
   * @param {string} fileName 檔案名稱。
   * @return {TextAnalytics}
   */
  loadDocumentsFromExcel (fileName) {
    this.#documentCollection.loadDocumentsFromExcel(fileName)
    return this
  }

  /**
   * 載入停等字。
   * @param {string} fileName 檔案名稱。
   * @return {TextAnalytics}
   */
  loadStopWordsFile (fileName) {
    this.#stopWordsFileName = fileName
    return this
  }

  /**
   * 載入使用者字典。
   * @param {string} fileName 檔案名稱。
   * @return {TextAnalytics}
   */
  loadUserDictionaryFile (fileName) {
    this.#userDictionaryFileName = fileName
    return this
  }

  p (term) {
    let termCount = this.#tokenizationResults.reduce((acc, curr) => {
      return acc + (curr.count[term] || 0)
    }, 0)
    return termCount / this.#totalTermCount
  }

  pmi (x, y) {
    let px = this.p(x)
    let py = this.p(y)
    let pxy = this.pxy(x, y)
    return Math.log(pxy / (px * py))
  }

  pmiMatrix (terms) {
    let result = new Matrix(terms.length, terms.length).fill(0)
    for (let r = 0; r < terms.length; r++) {
      for (let c = 0; c <= r; c++) {
        if (c !== r) {
          let pmi = this.pmi(terms[r], terms[c])
          if (isFinite(pmi) && !isNaN(pmi) && pmi !== 0) {
            result[r][c] = pmi
            result[c][r] = pmi
          }
        }
      }
    }
    return result
  }

  pxy (x, y) {
    return this.#documentCollection.contains([x, y]) / this.#totalTermCount
  }

  tfidf () {
    Jieba.load({
                 userDict: this.#userDictionaryFileName,
                 stopWordDict: this.#stopWordsFileName,
               })
    this.#loadStopWords()
    this.#tokenizationResults = Tokenizer.parseDocuments(this.#documentCollection, this.#stopWords)
    this.#totalTermCount = this.#tokenizationResults.reduce((acc, curr) => acc + curr.totalCount, 0)
    this.#tfidfResult = TFIDF.tfidf(this.#tokenizationResults)
    return this
  }
}

module.exports = { TextAnalytics }
