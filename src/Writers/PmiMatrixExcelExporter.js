const excel4node = require('excel4node')

class PmiMatrixExcelExporter {

  static export (terms, pmiMatrix, fileName) {
    const workbook = new excel4node.Workbook()
    const sheet1 = workbook.addWorksheet('pmi')
    sheet1.cell(1, 1).string('term')
    terms.forEach((t, index) => {
      sheet1.cell(1, index + 2).string(t)
      sheet1.cell(index + 2, 1).string(t)
    })

    try {
      for (let r = 0; r < pmiMatrix.rows; r++) {
        for (let c = 0; c < pmiMatrix.columns; c++) {
          if (pmiMatrix[r][c] !== 0) {
            sheet1.cell(r + 2, c + 2).number(pmiMatrix[r][c])
          }
        }
      }
    } catch (e) {
      console.log(e)
    }

    workbook.write(fileName)
  }
}

module.exports = { PmiMatrixExcelExporter }
