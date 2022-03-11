const _ = require('lodash')

/**
 * @class
 * @classdesc 斷詞結果。
 */
class SegmentationResult {
  /**
   * @property {Document} #document 此份斷詞結果是從哪一份文件來的。
   */
  #document
  /**
   * @property {number} #totalWordCount 所有詞彙出現次數的加總。
   */
  #totalWordCount
  /**
   * @property {Dictionary<number>} #wordCount 每一個詞彙出現的次數，範例：{'今天': 1, '天氣': 2}。
   */
  #wordCount
  /**
   * @property {string[]} #words 不重複的詞彙
   */
  #words

  /**
   * @constructor
   * @param {Document} document 文件。
   * @param {String[]} words 斷詞結果。
   */
  constructor (document, words) {
    this.#document = document
    this.#wordCount = _.countBy(words)
    this.#words = _.keys(this.#wordCount)
    this.#totalWordCount = _.keys(this.#wordCount)
                            .reduce((acc, curr) => acc + this.#wordCount[curr], 0)
  }

  get document () {
    return this.#document
  }

  get totalWordCount () {
    return this.#totalWordCount
  }

  get wordCount () {
    return this.#wordCount
  }

  get words () {
    return this.#words
  }

  contains (term) {
    return this.#wordCount[term] > 0
  }

  countOf (term) {
    return this.#wordCount[term] || 0
  }
}

module.exports = { SegmentationResult }
