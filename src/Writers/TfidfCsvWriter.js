const { TextFile } = require('node-dolphin')

class TfidfCsvWriter {

  static export ({
    tfidfResult,
    tokenizationResults,
  }, fileName) {
    let output = new TextFile().rewrite(fileName)
    output.write('term')
    tokenizationResults.forEach(t => {
      output.write(',' + t.document.name)
    })
    output.writeLine('')

    tfidfResult.terms.forEach((term, rowIndex) => {
      output.write(term + ',')
      let row = tfidfResult.tfidf[rowIndex]
      let rowText = String(row)
      output.writeLine(rowText)
    })
  }
}

module.exports = { TfidfCsvWriter }
