const { Document } = require('./Document')
const ExcelReader = require('./ExcelReader')
const Path = require('path')

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

  loadDocumentFromFile (fileName) {
    const name = Path.basename(fileName)
    this.#documents.push(new Document(name).loadFromTextFile(fileName))
    return this
  }

  loadDocumentsFromExcel (filename) {
    let documents = ExcelReader.loadDocumentsFromExcel(filename)
    this.#documents = this.#documents.concat(documents)
    return this
  }

  loadDocumentsFromWorkBook (workbook) {
    let documents = ExcelReader.loadDocumentsFromWorkBook(workbook)
    this.#documents = this.#documents.concat(documents)
    return this
  }
}

module.exports = {
  DocumentCollection: DocumentCollection,
}
