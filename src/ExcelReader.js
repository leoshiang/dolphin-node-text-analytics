const xlsx = require('xlsx')
const { Document } = require('./Document')

/**
 * 讀取 worksheet 內容建立 Document。
 * @param {Worksheet} worksheet 工作表。
 * @param {string} name 文件名稱。
 * @return {Document}
 */
function createDocumentFromWorksheet (worksheet, name) {
  let rawLines = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
  let lines = rawLines.map(x => x[0]).filter(x => x.length > 0)
  return new Document(name).addLines(lines)
}

/**
 * 從 WorkBook 讀入文件
 * @param {WorkBook} workbook
 * @return {Document[]}
 */
function readDocumentsFromWorkBook (workbook) {
  let result = []
  workbook.SheetNames
          .forEach(sheetName => {
            let document = createDocumentFromWorksheet(workbook.Sheets[sheetName],
                                                       sheetName)
            result.push(document)
          })
  return result
}

/**
 * 從 Excel 讀入文件
 * @param fileName
 * @return {Document[]}
 */
function readDocumentsFromExcel (fileName) {
  return readDocumentsFromWorkBook(xlsx.readFile(fileName))
}

module.exports = {
  readDocumentsFromExcel,
  readDocumentsFromWorkBook,
}
