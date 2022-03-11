const { Document } = require('./Document')
const ExcelReader = require('./ExcelReader')
const Path = require('path')

/**
 * 此回呼函數會在 forEach 執行被呼叫。
 * @callback Corpus~forEachCallback
 * @param {Document} document 文件。
 * @param {number} index 編號，從 0 開始。
 */

/**
 * @class
 * @classdesc 文件集合。
 */
class Corpus {
  #documents

  /**
   * @constructor
   */
  constructor () {
    this.clear()
  }

  /**
   * 文件集合裡面有幾份文件。
   * @return {number}
   */
  get length () {
    return this.#documents.length
  }

  /**
   * 清除文件內容。
   * @return {Corpus}
   */
  clear () {
    this.#documents = []
    return this
  }

  /**
   * 遍歷每一份文件。
   * @param {Corpus~forEachCallback} callback 文件和編號會傳入 callback。
   * @return {Corpus}
   */
  forEach (callback) {
    this.#documents.forEach((document, index) => callback(document, index))
    return this
  }

  /**
   * 計算詞彙同時出現在句子的行數。
   * @param {*} terms 詞彙陣列，["new", "york"]
   * @return {number}
   */
  numberOfLinesIncludes (terms) {
    return this.#documents.reduce((acc, curr) => acc +
      curr.numberOfLinesIncludes(terms), 0)
  }

  /**
   * 從 Excel 檔案載入文件，每一個 worksheet 會被視為一份文件。
   * @param {string} filename 檔案名稱。
   * @return {Corpus}
   */
  readExcel (filename) {
    let documents = ExcelReader.readDocumentsFromExcel(filename)
    this.#documents = this.#documents.concat(documents)
    return this
  }

  /**
   * 從文字檔載入文件。
   * @param {string} fileName 檔案名稱。
   * @return {Corpus}
   */
  readTextFile (fileName) {
    const name = Path.basename(fileName)
    this.#documents.push(new Document(name).loadFromTextFile(fileName))
    return this
  }

  /**
   * 從 workbook 物件載入文件，每一個 worksheet 會被視為一份文件。
   * @param {WorkBook} workbook 使用 xlsx 套件 read 函數取得的物件。
   * @return {Corpus}
   */
  readWorkBook (workbook) {
    let documents = ExcelReader.readDocumentsFromWorkBook(workbook)
    this.#documents = this.#documents.concat(documents)
    return this
  }
}

module.exports = {
  Corpus,
}
