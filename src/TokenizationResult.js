const _ = require('lodash')

/**
 * @class
 */
class TokenizationResult {
  #count
  #document
  #terms
  #tokens
  #totalCount

  /**
   *
   * @param {Document} document
   * @param tokens
   */
  constructor (document, tokens) {
    this.#document = document
    this.#tokens = tokens
    this.#count = _.countBy(this.#tokens)
    this.#terms = _.keys(this.#count)
    this.#totalCount = _.keys(this.#count).reduce((acc, curr) => acc + this.#count[curr], 0)
  }

  get count () {
    return this.#count
  }

  get document () {
    return this.#document
  }

  get terms () {
    return this.#terms
  }

  get tokens () {
    return this.#tokens
  }

  get totalCount () {
    return this.#totalCount
  }

  #sort (compareFunction) {
    this.#count = _.keys(this.#count)
                   .map(x => ({
                     term: x,
                     count: this.#count[x],
                   }))
                   .sort(compareFunction)
  }

  ascendingOrder () {
    this.#sort((a, b) => {
      if (a.count < b.count) {
        return -1
      }
      if (a.count > b.count) {
        return 1
      }
      return 0
    })
    return this
  }

  contains (term) {
    return this.#count[term] > 0
  }

  countOf (term) {
    return this.#count[term]
  }

  descendingOrder () {
    this.#sort((a, b) => {
      if (a.count < b.count) {
        return 1
      }
      if (a.count > b.count) {
        return -1
      }
      return 0
    })
    return this
  }

  dump () {
    console.log('---tokens---')
    console.log(this.#tokens)
    console.log('---terms---')
    console.log(this.#terms)
    console.log('---count---')
    console.log(this.#count)
    return this
  }

  least (n) {
    return this.#count.slice(0, n)
  }

  top (n) {
    return this.#count.slice(0, n)
  }
}

module.exports = { TokenizationResult }
