const { Vector } = require('dolphin-node-core')
const { Matrix } = require('dolphin-node-core')

/**
 * @class
 */
class TfidfResult {
  #allWords
  #idf
  #tf
  #tfidf
  #wordDocumentMatrix

  constructor (result = {}) {
    this.#allWords = result.allWords || []
    this.#idf = result.idf || new Vector()
    this.#tf = result.tf || new Matrix()
    this.#tfidf = result.tfidf || new Matrix()
    this.#wordDocumentMatrix = result.wordDocumentMatrix || new Matrix()
  }

  get allWords () {
    return this.#allWords
  }

  get idf () {
    return this.#idf
  }

  get tdf () {
    return this.#idf
  }

  get tf () {
    return this.#tf
  }

  get tfidf () {
    return this.#tfidf
  }

  get wordDocumentMatrix () {
    return this.#wordDocumentMatrix
  }

  #getIndexOfWord (word) {
    return this.#allWords.indexOf(word)
  }

  getIDF (word) {
    let row = this.#getIndexOfWord(word)
    return this.#tf[row][0]
  }

  getTF (word, documentIndex) {
    let row = this.#getIndexOfWord(word)
    return this.#tf[row][documentIndex]
  }

  getTFIDF (word, documentIndex) {
    let row = this.#getIndexOfWord(word)
    return this.#tfidf[row][documentIndex]
  }
}

module.exports = { TfidfResult }
