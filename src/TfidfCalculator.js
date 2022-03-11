const _ = require('lodash')
const { Matrix } = require('node-dolphin')
const { Vector } = require('node-dolphin')
const { TfidfResult } = require('./TfidfResult')

class TfidfCalculator {

  /**
   *
   * @param {SegmentationResults} results
   * @return {TfidfResult}
   */
  static execute (results) {
    let rows = results.wordDocumentMatrix.rows
    let cols = results.wordDocumentMatrix.columns
    let wordDocumentMatrix = results.wordDocumentMatrix

    let tf = new Matrix(rows, cols)
    let idf = new Vector(rows)
    let tfidf = new Matrix(rows, cols)

    results.allWords.forEach((word, wordIndex) => {
      results.forEach((r, docIndex) => {
        tf[wordIndex][docIndex] = wordDocumentMatrix[wordIndex][docIndex] /
          results.documentWordCount[docIndex]
      })
      idf[wordIndex] = 1 + Math.log((results.length + 1) / (results.documentFrequency(word) + 1))
    })

    results.allWords.forEach((word, wordIndex) => {
      let idfValue = idf[wordIndex]
      results.forEach((r, docIndex) => {
        tfidf[wordIndex][docIndex] = idfValue * tf[wordIndex][docIndex]
      })
    })

    return new TfidfResult({
                             tf: tf,
                             idf: idf,
                             tfidf: tfidf,
                             allWords: Array.from(results.allWords),
                             wordDocumentMatrix: wordDocumentMatrix,
                           })
  }
}

module.exports = {
  TfidfCalculator,
}
