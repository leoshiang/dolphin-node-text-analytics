const { Document } = require('../src/Document')
const {
  WordsSegmenter,
} = require('../src/WordsSegmenter')
const mock = require('mock-fs')
const _ = require('lodash')
const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')

describe('測試 SegmentationResult', function () {
  test('預設 document、wordCount、words、totalWordCount', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document().loadFromTextFile('./docs/some-file.txt')
    mock.restore()

    let result = WordsSegmenter.tokenize(document)
    expect(result.document).toBe(document)
    expect(_.keys(result.wordCount).length).toBe(346)
    expect(result.words.length).toBe(346)
    expect(result.totalWordCount).toBe(667)
  })
})
