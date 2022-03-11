const { Jieba } = require('./Jieba')
const { Corpus } = require('../src/Corpus')
const { Document } = require('../src/Document')
const { SegmentationResult } = require('./SegmentationResult')
const { SegmentationResults } = require('./SegmentationResults')
const { InvalidParameterException } = require('node-dolphin')

/**
 * @constant 斷詞模式。
 * @property {string} cut 精確模式：試圖將句子最精確地分開，適合文本分析。
 * @property {string} cutHMM 精確模式並套用 HMM：使用隱藏式馬可夫鍊（HMM）模型，試圖找出不在字典檔裡面的字。
 * @property {string} cutALL 把句子中可以成詞的詞語都掃瞄出來，速度非常快但不能解決歧義。
 * @property {string} cutForSearch 搜尋引擎模式：在精確模式的基礎下，對長詞再次切分，提高召回率（recall）。
 */
const CutMethods = {
  cut: 'cut',
  cutHMM: 'cutHMM',
  cutALL: 'cutALL',
  cutForSearch: 'cutForSearch',
}

/**
 * @constant 斷詞模式。
 * @type {{cutHMM: (function(*): string[]), cutForSearch: (function(*): string[]), cut:
 *   (function(*): string[]), cutALL: (function(*): string[])}}
 */
const CutFunctions = {
  cut: (document) => Jieba.cut(document.asString()),
  cutHMM: (document) => Jieba.cutHMM(document.asString()),
  cutALL: (document) => Jieba.cutAll(document.asString()),
  cutForSearch: (document) => Jieba.cutForSearch(document.asString()),
}

/**
 * @class
 * @classdesc 斷詞。
 */
class WordsSegmenter {

  /**
   * 對一份文件做斷詞處理。
   * @param {Document} document 文件。
   * @param {string} cutMethod=cut 斷詞方法，可以從 CutMethods 物件取得，可使用的值為：cut、cutHMM、cutALL與cutForSearch。
   * @param {String[]} [stopWords=[]] 停等字陣列。
   * @throws {TypeError} 如果 document 參數不是 Document 類別會拋出此例外。
   * @return {SegmentationResult}
   * @example
   * let document = new Document().loadFromTextFile('./docs/some-file.txt')
   * let result = WordsSegmenter.tokenize(document, CutMethods.cutHMM)
   */
  static tokenize (document, cutMethod = CutMethods.cut, stopWords = []) {
    if (!(document instanceof Document)) {
      throw new TypeError('參數 document 必須是 Document 物件。')
    }
    let method = CutFunctions[cutMethod]
    if (!method) {
      throw new InvalidParameterException('參數 cutMethod 必須是 cut、cutHMM、cutALL、cutForSearch 其中一個。')
    }
    let words = method(document).filter(x => (x !== ' ') && !stopWords[x])
    return new SegmentationResult(document, words)
  }

  /**
   * 對文件集合做斷詞處理。
   * @param {Corpus} corpus 文件集合。
   * @param {string} cutMethod=cut 斷詞方法，可以從 CutMethods 物件取得，可使用的值為：cut、cutHMM、cutALL與cutForSearch。
   * @param {String[]} [stopWords=[]] 停等字陣列。
   * @throws {TypeError} 如果 corpus 參數不是 Corpus 類別會拋出此例外。
   * @return {SegmentationResults}
   * @example
   * let corpus = new Corpus().loadDocumentFromFile('./docs/some-file.txt')
   * let results = WordsSegmenter.tokenizeCorpus(corpus)
   */
  static tokenizeCorpus (corpus, cutMethod = 'cut', stopWords = []) {
    if (!(corpus instanceof Corpus)) {
      throw new TypeError('參數 corpus 必須是 Corpus 物件。')
    }
    let results = []
    corpus.forEach(document => results.push(this.tokenize(document, cutMethod, stopWords)))
    return new SegmentationResults(results)
  }
}

module.exports = {
  WordsSegmenter,
  CutMethods,
}
