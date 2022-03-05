const { Document } = require('./Document')
const xlsx = require('xlsx')

class DocumentCollection {
  #documents

  constructor () {
    this.#documents = []
  }

  get length () {
    return this.#documents.length
  }

  #addWorksheet (worksheet, name) {
    let rawLines = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
    let lines = rawLines.filter(x => x.length > 0)
    let document = new Document(name).add(lines)
    this.#documents.push(document)
  }

  clear () {
    this.#documents = []
    return this
  }

  forEach (callback) {
    this.#documents.forEach((document, index) => callback(document, index))
  }

  loadFromExcel (workbook) {
    workbook.SheetNames
            .forEach(sheetName => this.#addWorksheet(workbook.Sheets[sheetName], sheetName))
    return this
  }
}

module.exports = {
  DocumentCollection,
}
