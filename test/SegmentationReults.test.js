const { WordsSegmenter } = require('../src/WordsSegmenter')
const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')
const { Corpus } = require('../src/Corpus')

describe('測試 SegmentationResults', function () {
  test('預設 length、wordDocumentMatrix', function () {
    const corpus = new Corpus().readWorkBook(FoodServiceDataset.ExcelWorkbook)
    let results = WordsSegmenter.tokenizeCorpus(corpus)
    expect(results.length).toBe(70)
    expect(results.wordDocumentMatrix.columns).toBe(70)
    expect(results.wordDocumentMatrix.rows).toBe(1645)
  })
})
