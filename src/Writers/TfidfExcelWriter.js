const excel4node = require('excel4node')

class TfidfExcelWriter {

  static export ({
    tokenizationResults,
    tfidfResult,
  }, fileName) {
    const workbook = new excel4node.Workbook()
    const sheet1 = workbook.addWorksheet('tfidf')
    sheet1.cell(1, 1).string('term')
    tokenizationResults.forEach((t, index) => {
      sheet1.cell(1, index + 2).string(t.document.name)
    })

    try {
      tfidfResult.terms.forEach((term, rowIndex) => {
        sheet1.cell(rowIndex + 2, 1).string(term)
        let row = tfidfResult.tfidf.row(rowIndex)
        row.forEach((x, index) => {
          sheet1.cell(rowIndex + 2, index + 2).number(x)
        })
      })
    } catch (e) {
    }

    workbook.write(fileName)
  }
}

module.exports = { TfidfExcelWriter }
