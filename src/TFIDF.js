const _ = require('lodash')
const { Matrix } = require('node-dolphin')
const { TFIDFResult } = require('./TFIDFResult')

/**
 *
 * @param {TokenizationResult[]} tokenizationResults
 * @return {TFIDFResult}
 */
function tfidf (tokenizationResults) {
  let termCount = {}
  let sumOfEachResult = new Array(tokenizationResults.length).fill(0)
  tokenizationResults.forEach((tokenizationResult, column) => {
    let count = tokenizationResult.count
    let terms = _.keys(count)
    terms.forEach(term => {
      if (!termCount[term]) {
        termCount[term] = new Array(tokenizationResults.length).fill(0)
      }
      let value = count[term]
      termCount[term][column] += value
      sumOfEachResult[column] += value
    })
  })

  let terms = _.keys(termCount)
  let idf = new Matrix(_.keys(terms).length, 1)
  let tf = new Matrix(_.keys(terms).length, tokenizationResults.length)
  terms.forEach((term, row) => {
    let numberOfDocuments = 0
    for (let column = 0; column < tokenizationResults.length; column++) {
      let value = termCount[term][column]
      if (value > 0) {
        numberOfDocuments++
      }
      tf.set(row, column, value / sumOfEachResult[column])
    }
    idf.set(row, 0, Math.log(tokenizationResults.length / (numberOfDocuments + 1)))
  })

  let tfidf = new Matrix(_.keys(terms).length, tokenizationResults.length)
  terms.forEach((term, row) => {
    for (let column = 0; column < tokenizationResults.length; column++) {
      let tt = idf.get(row, 0) * tf.get(row, column)
      tfidf.set(row, column, tt)
    }
  })

  return new TFIDFResult({
                           tf: tf,
                           idf: idf,
                           tfidf: tfidf,
                           terms: terms,
                         })
}

module.exports = {
  tfidf,
}
