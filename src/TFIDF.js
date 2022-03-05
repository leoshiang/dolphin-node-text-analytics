const _ = require('lodash')
const fs = require('fs')

function getAllTerms (tokensArray) {
  let result = {}
  for (let t = 0; t < tokensArray.length; t++) {
    result = _.union(result, tokensArray[t].terms)
  }
  return result
}

function tf (term, tokens) {
  return tokens.countOf(term) / tokens.totalCount
}

function idf (term, tokensArray) {
  let n = tokensArray.filter(x => x.contains(term)).length
  if (n === 0) {
    n = 1
  }
  return Math.log(tokensArray.length / n)
}

function tfidf (tokensArray) {
  let matrix = {}
  let allTerms = getAllTerms(tokensArray)
  allTerms.forEach(key => {
    let row = []
    let idfValue = idf(key, tokensArray)
    tokensArray.forEach(t => {
      let tfidf = tf(key, t) * idfValue
      row.push(tfidf)
    })
    matrix[key] = row
  })
  return matrix
}

function dump_tfidf (matrix) {
  fs.writeFileSync('./output.log', '', { flag: 'w+' })
  Object.keys(matrix).forEach(row => {
    let output = matrix[row].reduce((acc, prev) => acc + prev + ' ', row + ' ')
    fs.writeFileSync('./output.log', output+'\r\n', { flag: 'a' })
  })
}

module.exports = {
  tf,
  idf,
  tfidf,
  dump_tfidf,
}
