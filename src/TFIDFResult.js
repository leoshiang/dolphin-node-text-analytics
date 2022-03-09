class TFIDFResult {
  #idf
  #terms
  #tf
  #tfidf

  constructor (result) {
    this.#tf = result.tf
    this.#idf = result.idf
    this.#tfidf = result.tfidf
    this.#terms = result.terms
  }

  get tdf () {
    return this.#idf
  }

  get terms () {
    return this.#terms
  }

  get tf () {
    return this.#tf
  }

  get tfidf () {
    return this.#tfidf
  }

  #getIndexOfTerm (term) {
    return this.#terms.indexOf(term)
  }

  getIDF (term) {
    let row = this.#getIndexOfTerm(term)
    return this.#tf[row][0]
  }

  getTF (term, documentIndex) {
    let row = this.#getIndexOfTerm(term)
    return this.#tf[row][documentIndex]
  }

  getTFIDF (term, documentIndex) {
    let row = this.#getIndexOfTerm(term)
    return this.#tfidf[row][documentIndex]
  }
}

module.exports = { TFIDFResult }
