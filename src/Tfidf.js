const _ = require('lodash')
const { Matrix } = require('node-dolphin')
const { TfidfResult } = require('./TfidfResult')

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
      tf[row][column] = value / sumOfEachResult[column]
    }
    idf[row][0] = 1 + Math.log((tokenizationResults.length + 1) / (numberOfDocuments + 1))
  })

  let tfidf = new Matrix(_.keys(terms).length, tokenizationResults.length)
  terms.forEach((term, row) => {
    for (let column = 0; column < tokenizationResults.length; column++) {
      tfidf[row][column] = idf[row][0] * tf[row][column]
    }
  })

  return new TfidfResult({
                           tf: tf,
                           idf: idf,
                           tfidf: tfidf,
                           terms: terms,
                         })
}

module.exports = {
  tfidf,
}
