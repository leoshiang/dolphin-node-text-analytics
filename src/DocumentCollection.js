const { Document } = require('./Document')
const ExcelReader = require('./ExcelReader')

class DocumentCollection {
  #documents

  constructor () {
    this.clear()
  }

  get length () {
    return this.#documents.length
  }

  clear () {
    this.#documents = []
    return this
  }

  forEach (callback) {
    this.#documents.forEach((document, index) => callback(document, index))
    return this
  }

  loadFromFile (fileName) {
    this.#documents.push(new Document().loadFromFile(fileName))
    return this
  }

  loadFromWorkBook (workbook) {
    let documents = ExcelReader.loadDocumentsFromWorkBook(workbook)
    this.#documents = this.#documents.concat(documents)
    return this
  }
}

module.exports = {
  DocumentCollection: DocumentCollection,
}
