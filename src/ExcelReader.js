const xlsx = require('xlsx')
const excel = require('xlsx')
const { Document } = require('./Document')

function createDocumentFromWorksheet (worksheet, name) {
  let rawLines = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
  let lines = rawLines.filter(x => x.length > 0)
  return new Document(name).addText(lines)
}

/**
 * 從 WorkBook 讀入文件
 * @param {WorkBook} workbook
 * @return {Document[]}
 */
function loadDocumentsFromWorkBook (workbook) {
  let result = []
  workbook.SheetNames
          .forEach(sheetName => {
            let document = createDocumentFromWorksheet(workbook.Sheets[sheetName], sheetName)
            result.push(document)
          })
  return result
}

/**
 * 從 Excel 讀入文件
 * @param fileName
 * @return {Document[]}
 */
function loadDocumentsFromExcel (fileName) {
  return loadDocumentsFromWorkBook(excel.readFile(fileName))
}

module.exports = {
  loadDocumentsFromExcel,
  loadDocumentsFromWorkBook,
}
