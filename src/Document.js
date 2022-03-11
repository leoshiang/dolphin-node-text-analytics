const fs = require('fs')
const { Type } = require('node-dolphin')
const { StrUtils } = require('node-dolphin')

/**
 * @class
 * @classdesc 文件。
 */
class Document {
  #lines
  #name

  /**
   * @constructor
   * @param {string} name 文件名稱。
   */
  constructor (name) {
    this.#name = name || ''
    this.#lines = []
  }

  /**
   * 字元數目。
   * @return {number} 字元數目。
   */
  get length () {
    return this.#lines.reduce((acc, curr) => acc + curr.length, 0)
  }

  /**
   * 傳回行數。
   * @return {number} 行數。
   */
  get lineCount () {
    return this.#lines.length
  }

  /**
   * 文件的所有行的資料。
   * @return {*}
   */
  get lines () {
    return this.#lines
  }

  /**
   * 文件名稱。
   * @return {string}
   */
  get name () {
    return this.#name
  }

  /**
   * 加入文字陣列。
   * @param {String[]} lines 要加入的文字陣列。
   * @return {Document}
   * @example
   * let d = new Document()
   * d.add(['this is line 1, 'this is line 2']
   */
  addLines (lines) {
    if (Type.isArray(lines)) {
      lines.forEach(line => this.addText(line))
    }
    return this
  }

  /**
   * 加入文字。如果傳入空字串或是非文字的資料，會被忽略。如果文字含有換行字元（cr\lf）會自動斷行。
   * @param {string|string[]} text 要加入的文字。
   * @return {Document}
   * @example
   * let d = new Document()
   * d.add('this is line 1')
   * d.add('this is line 2')
   * d.add('this is line 3')
   */
  addText (text) {
    if (Type.isString(text) && text !== '') {
      this.#lines.push(text)
    }
    return this
  }

  /**
   * 將所有文字合併成一個字串。
   * @return {string} 所有文字合併成的字串
   */
  asString () {
    return this.#lines.reduce((acc, curr) => acc + curr, '')
  }

  /**
   * 清除文件內容。
   * @return {Document}
   */
  clear () {
    this.#name = ''
    this.#lines = []
    return this
  }

  /**
   * 載入文字檔的內容。
   * @param {string} fileName 檔案名稱。
   * @param {string} encoding 編碼，預設值為 'utf8'。
   * @return {Document}
   */
  loadFromTextFile (fileName, encoding = 'utf8') {
    if (!fs.existsSync(fileName)) {
      return this
    }
    const contents = fs.readFileSync(fileName, encoding).split('\r\n')
    this.#lines = this.#lines.concat(contents)
    return this
  }

  /**
   * 計算詞彙同時出現在句子的行數。
   * @param {*} terms 詞彙陣列，["new", "york"]
   * @return {*}
   */
  numberOfLinesIncludes (terms) {
    let x = this.lines.filter(line => StrUtils.includes(line, terms))
    return x.length
  }
}

module.exports = { Document }
