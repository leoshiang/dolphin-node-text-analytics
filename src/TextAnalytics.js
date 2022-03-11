const { Jieba } = require('./Jieba')
const { Corpus } = require('./Corpus')
const { WordsSegmenter } = require('./WordsSegmenter')
const { Matrix } = require('node-dolphin')
const { TfidfCalculator } = require('./TfidfCalculator')
const { TfidfResult } = require('./TfidfResult')
const { CutMethods } = require('./WordsSegmenter')
const fs = require('fs')
const { TfidfExcelWriter } = require('./Writers/TfidfExcelWriter')
const { SegmentationResults } = require('./SegmentationResults')

class TextAnalytics {

  #corpus
  #segmentationResults
  #stopWords
  #stopWordsFileName
  #tfidfResult
  #totalWordCount
  #userDictionaryFileName

  constructor () {
    this.#corpus = new Corpus()
    this.#segmentationResults = new SegmentationResults()
    this.#stopWords = {}
    this.#stopWordsFileName = ''
    this.#tfidfResult = new TfidfResult()
    this.#totalWordCount = 0
    this.#userDictionaryFileName = ''
  }

  get corpus () {
    return this.#corpus
  }

  get segmentationResults () {
    return this.#segmentationResults
  }

  get tfidfResult () {
    return this.#tfidfResult
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
   * 建立詞彙之間的 PMI 矩陣。
   * @param {String[]} words 詞彙陣列。
   * @return {Matrix}
   */
  buildPMIMatrix (words) {
    let result = new Matrix(words.length, words.length).fill(0)
    for (let r = 0; r < words.length; r++) {
      for (let c = 0; c <= r; c++) {
        if (c !== r) {
          let pmi = this.pmi(words[r], words[c])
          if (isFinite(pmi) && !isNaN(pmi) && pmi !== 0) {
            result[r][c] = pmi
            result[c][r] = pmi
          }
        }
      }
    }
    return result
  }

  /**
   * 計算 tfidf。
   * @param {string} cutMethod=cut 斷詞方法，可以從 CutMethods 物件取得，可使用的值為：cut、cutHMM、cutALL與cutForSearch。
   * @return {TextAnalytics}
   */
  execute (cutMethod = CutMethods.cut) {
    Jieba.load({
                 userDict: this.#userDictionaryFileName,
                 stopWordDict: this.#stopWordsFileName,
               })
    this.#loadStopWords()
    this.#segmentationResults = WordsSegmenter.tokenizeCorpus(this.#corpus,
                                                              cutMethod,
                                                              this.#stopWords)
    this.#tfidfResult = TfidfCalculator.execute(this.#segmentationResults)
    return this
  }

  exportTfidfToExcel (fileName) {
    TfidfExcelWriter.export(this.#segmentationResults, this.#tfidfResult, fileName)
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

  /**
   * 計算詞彙出現的機率。p(word) = (word 在所有文件出現的次數)/(所有文件中詞彙出現的次數總和)
   * @param {string} word 詞彙。
   * @return {number} 機率
   */
  p (word) {
    let wordCount = this.#segmentationResults.wordCount(word)
    return wordCount / this.#segmentationResults.totalWordCount
  }

  /**
   * 計算兩個詞彙的 pmi。pmi(x,y) = p(x,y)/(p(x) * p(y))
   * @param {string} x 詞彙。
   * @param {string} y 詞彙。
   * @return {number}
   */
  pmi (x, y) {
    let px = this.p(x)
    let py = this.p(y)
    let pxy = this.pxy(x, y)
    return Math.log(pxy / (px * py))
  }

  /**
   * 計算兩個詞彙同時出現的機率。p(x,y) = (x&y 在所有文件同時出現的次數) / (所有文件中詞彙出現的次數總和)
   * @param x
   * @param y
   * @return {number}
   */
  pxy (x, y) {
    return this.#corpus.numberOfLinesIncludes([x, y]) / this.#segmentationResults.totalWordCount
  }

  /**
   * 加入 Excel 檔案。每一個 Sheet 會被當作一份文件處理。
   * @param {string} fileName 檔案名稱。
   * @return {TextAnalytics}
   */
  readExcel (fileName) {
    this.#corpus.readExcel(fileName)
    return this
  }

  /**
   * 加入文件。
   * @param {string} fileName 文件檔案名稱。
   * @param {string} name 文件名稱。
   * @return {TextAnalytics}
   */
  readTextFile (fileName, name) {
    this.#corpus.readTextFile(fileName)
    return this
  }
}

module.exports = { TextAnalytics }
