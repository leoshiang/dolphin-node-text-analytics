const excel4node = require('excel4node')

class TfidfExcelWriter {

  static export (segmentationResults, tfidfResult, fileName) {
    const workbook = new excel4node.Workbook()
    const sheet1 = workbook.addWorksheet('tfidf')
    const sheet2 = workbook.addWorksheet('idf')
    const sheet3 = workbook.addWorksheet('tf')
    const sheet4 = workbook.addWorksheet('wordDocumentMatrix')

    this.#outputColumnAndRowsTitle(sheet1, tfidfResult, segmentationResults)
    this.#outputColumnAndRowsTitle(sheet2, tfidfResult)
    this.#outputColumnAndRowsTitle(sheet3, tfidfResult, segmentationResults)
    this.#outputColumnAndRowsTitle(sheet4, tfidfResult, segmentationResults)

    tfidfResult.idf.forEach((idf, index) => {
      sheet2.cell(index + 2, 2).number(idf)
    })

    this.#outputMatrix(tfidfResult.tfidf, sheet1, 2, 2)
    this.#outputMatrix(tfidfResult.tf, sheet3, 2, 2)
    this.#outputMatrix(tfidfResult.wordDocumentMatrix, sheet4, 2, 2)

    workbook.write(fileName)
  }

  static #outputColumnAndRowsTitle (
    worksheet,
    tfidfResult,
    segmentationResults) {
    if (segmentationResults) {
      segmentationResults.forEach((t, index) => {
        worksheet.cell(1, index + 2).string(t.document.name)
      })
    }

    worksheet.cell(1, 1).string('word')
    tfidfResult.allWords.forEach((word, wordIndex) => {
      worksheet.cell(wordIndex + 2, 1).string(word)
    })
  }

  static #outputMatrix (matrix, worksheet, startRow, startColumn) {
    matrix.forEach((word, wordIndex) => {
      worksheet.cell(wordIndex + startRow, startColumn).string(word)
      let row = matrix.row(wordIndex)
      row.forEach((x, index) => {
        worksheet.cell(wordIndex + startRow, index + startColumn).number(x)
      })
    })
  }
}

module.exports = { TfidfExcelWriter }
