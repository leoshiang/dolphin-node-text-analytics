const { TextFile } = require('node-dolphin')

class TFIDFResultCsvExporter {

  /**
   *
   * @param {TFIDFResult} tfidfResult TFIDF 產出的結果。
   * @param {TokenizationResult[]} tokenizationResults
   * @param {string} fileName 檔案名稱。
   */
  static export (tfidfResult, tokenizationResults, fileName) {
    let output = new TextFile().rewrite(fileName)
    output.write('term')
    tokenizationResults.forEach(t => {
      output.write(',' + t.document.name)
    })
    output.writeLine('')

    tfidfResult.terms.forEach((term, rowIndex) => {
      output.write(term + ',')
      let row = tfidfResult.tfidf.row(rowIndex)
      let rowText = String(row)
      output.writeLine(rowText)
    })
  }
}

module.exports = { TFIDFResultCsvExporter }
