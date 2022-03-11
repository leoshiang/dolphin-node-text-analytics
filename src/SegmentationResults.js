const _ = require('lodash')
const { Matrix } = require('node-dolphin')
const { Vector } = require('node-dolphin')

/**
 * @class
 * @classdesc 斷詞結果。
 */
class SegmentationResults extends Array {
  #allWords
  #documentWordCount
  #totalWordCount
  #wordCount
  #wordDocumentMatrix

  constructor (results) {
    super(...(results ||[]))
    this.#buildWordDocumentMatrix()
  }

  get allWords () {
    return this.#allWords
  }

  get documentWordCount () {
    return this.#documentWordCount
  }

  get totalWordCount () {
    return this.#totalWordCount
  }

  get wordDocumentMatrix () {
    return this.#wordDocumentMatrix
  }

  #buildWordDocumentMatrix () {
    this.#allWords = this.reduce((acc, curr) => _.merge(acc, curr.words), [])
    this.#wordCount = {}
    this.#wordDocumentMatrix = new Matrix(this.#allWords.length, this.length).fill(0)
    this.#documentWordCount = new Vector(this.#allWords.length).fill(0)

    this.#allWords.forEach((word, wordIndex) => {
      let sum = 0
      this.forEach((r, docIndex) => {
        let value = (r.wordCount[word] || 0)
        this.#wordDocumentMatrix[wordIndex][docIndex] += value
        this.#documentWordCount[docIndex] += value
        sum += value
      })
      this.#wordCount[word] = sum
    })

    this.#totalWordCount = this.#wordDocumentMatrix.sum()
  }

  documentFrequency (word) {
    let index = this.#allWords.indexOf(word)
    if (index === -1) {
      return 0
    }
    return this.#wordDocumentMatrix[index].reduce((acc, curr) => acc + (curr > 0
      ? 1
      : 0), 0)
  }

  wordCount (word) {
    return this.#wordCount[word] || 0
  }
}

module.exports = { SegmentationResults }
