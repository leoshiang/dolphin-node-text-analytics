const fs = require('fs')

class TFIDFResultCsvExporter {

  /**
   *
   * @param {TFIDFResult} result
   * @param {string} fileName
   */
  static export (result, fileName) {
    fs.writeFileSync(fileName, '', { flag: 'w+' })
    result.terms.forEach((term, rowIndex) => {
      fs.writeFileSync(fileName, term + ',', { flag: 'a' })
      let row = result.tfidf.row(rowIndex)
      let rowText = String(row)
      fs.writeFileSync(fileName, rowText + '\r\n', { flag: 'a' })
    })
  }
}

module.exports = { TFIDFResultCsvExporter }
