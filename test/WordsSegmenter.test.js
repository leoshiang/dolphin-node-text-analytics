const { Document } = require('../src/Document')
const {
  WordsSegmenter,
  CutMethods,
} = require('../src/WordsSegmenter')
const mock = require('mock-fs')
const _ = require('lodash')
const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')
const { Corpus } = require('../src/Corpus')

describe('測試 tokenize', function () {
  test('預設 cutMethod 。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document().loadFromTextFile('./docs/some-file.txt')
    mock.restore()

    let result = WordsSegmenter.tokenize(document)
    expect(_.keys(result.wordCount).length).toBe(346)
    expect(result.words.length).toBe(346)
  })

  test('cutMethod=cutHMM 。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document().loadFromTextFile('./docs/some-file.txt')
    mock.restore()

    let result = WordsSegmenter.tokenize(document, CutMethods.cutHMM)
    expect(_.keys(result.wordCount).length).toBe(330)
    expect(result.words.length).toBe(330)
  })

  test('cutMethod=cutALL 。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document().loadFromTextFile('./docs/some-file.txt')
    mock.restore()

    let result = WordsSegmenter.tokenize(document, CutMethods.cutALL)
    expect(_.keys(result.wordCount).length).toBe(359)
    expect(result.words.length).toBe(359)
  })

  test('cutMethod=cutForSearch 。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document().loadFromTextFile('./docs/some-file.txt')
    mock.restore()

    let result = WordsSegmenter.tokenize(document, CutMethods.cutForSearch)
    expect(_.keys(result.wordCount).length).toBe(347)
    expect(result.words.length).toBe(347)
  })

  test('傳入停等字，應能過濾掉停等字。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document().loadFromTextFile('./docs/some-file.txt')
    mock.restore()

    let result = WordsSegmenter.tokenize(document, CutMethods.cutForSearch, [
      '不', '錯', '吃', '打', '了', '5', '0', '通', '終', '於', '吃', '到', '了',
    ])
    expect(_.keys(result.wordCount).length).toBe(337)
    expect(result.words.length).toBe(337)
  })

  test('空文件，words 應等於空陣列。', function () {
    let document = new Document()
    let result = WordsSegmenter.tokenize(document)
    expect(result.words).toStrictEqual([])
  })

  test('document 不是 Document 類別，應拋出例外 TypeError。', function () {
    expect(() => WordsSegmenter.tokenize()).toThrow(TypeError)
  })
})

describe('測試 tokenizeCorpus', function () {
  test('預設 cutMethod 。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let corpus = new Corpus().readTextFile('./docs/some-file.txt')
    mock.restore()

    let results = WordsSegmenter.tokenizeCorpus(corpus)
    expect(results.length).toBe(1)
    expect(results[0].totalWordCount).toBe(667)
  })

  test('cutMethod=cutHMM 。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let corpus = new Corpus().readTextFile('./docs/some-file.txt')
    mock.restore()

    let results = WordsSegmenter.tokenizeCorpus(corpus, CutMethods.cutHMM)
    expect(results.length).toBe(1)
    expect(results[0].totalWordCount).toBe(479)
  })

  test('cutMethod=cutALL 。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let corpus = new Corpus().readTextFile('./docs/some-file.txt')
    mock.restore()

    let results = WordsSegmenter.tokenizeCorpus(corpus, CutMethods.cutALL)
    expect(results.length).toBe(1)
    expect(results[0].totalWordCount).toBe(663)
  })

  test('cutMethod=cutForSearch 。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let corpus = new Corpus().readTextFile('./docs/some-file.txt')
    mock.restore()

    let results = WordsSegmenter.tokenizeCorpus(corpus, CutMethods.cutForSearch)
    expect(results.length).toBe(1)
    expect(results[0].totalWordCount).toBe(668)
  })

  test('傳入停等字，應能過濾掉停等字。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let corpus = new Corpus().readTextFile('./docs/some-file.txt')
    mock.restore()

    let results = WordsSegmenter.tokenizeCorpus(corpus, CutMethods.cutForSearch, [
      '不', '錯', '吃', '打', '了', '5', '0', '通', '終', '於', '吃', '到', '了',
    ])
    expect(results.length).toBe(1)
    expect(results[0].totalWordCount).toBe(642)
  })

  test('空文件，應回傳空陣列。', function () {
    let results = WordsSegmenter.tokenizeCorpus(new Corpus())
    expect(results.length).toBe(0)
  })

  test('corpus 不是 Corpus 類別，應拋出例外 TypeError。', function () {
    expect(() => WordsSegmenter.tokenizeCorpus()).toThrow(TypeError)
  })
})
