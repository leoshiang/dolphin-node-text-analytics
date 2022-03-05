const fs = require('fs')
const { Type } = require('node-dolphin')

/**
 * @class
 */
class Document {
  /**
   * @private
   */
  #sentences
  #name

  /**
   * @constructor
   * @param {string} name 文件名稱。
   */
  constructor (name) {
    this.#name = name || ''
    this.#sentences = []
  }

  /**
   * 傳回行數。
   * @return {number} 行數。
   */
  get lineCount () {
    return this.#sentences.length
  }

  /**
   * 文件名稱。
   * @return {string}
   */
  get name () {
    return this.#name
  }

  /**
   * 文件的所有行的資料。
   * @return {*}
   */
  get sentences () {
    return this.#sentences
  }

  /**
   * 加入文字。
   * @param {string|String[]}text
   * @return {Document}
   */
  add (text) {
    if (Type.isArray(text)) {
      this.#sentences = this.#sentences.concat(text)
    } else {
      this.#sentences.push(text)
    }
    return this
  }

  /**
   * 加入文字檔。
   * @param {string} fileName 檔案名稱。
   * @throws {Error} 如果 fileName 所指定的檔案不存在就拋出此例外。
   * @return {Document}
   */
  addFile (fileName) {
    if (!fs.existsSync(fileName)) {
      throw new Error(`檔案 ${fileName}不存在`)
    }
    const contents = fs.readFileSync(fileName, 'utf8').split('\r\n')
    this.#sentences = this.#sentences.concat(contents)
    return this
  }

  /**
   * 將所有文字合併成一個字串
   * @return {string} 所有文字合併成的字串
   */
  asString () {
    return this.#sentences.reduce((acc, curr) => acc + curr, '')
  }

  /**
   * 計算字元數目。
   * @return {number} 字元數目。
   */
  charCount () {
    return this.#sentences.reduce((acc, curr) => acc + curr.length, 0)
  }

  /**
   * 清除文件內容。
   * @return {Document}
   */
  clear () {
    this.#name = ''
    this.#sentences = []
    return this
  }
}

module.exports = { Document }
