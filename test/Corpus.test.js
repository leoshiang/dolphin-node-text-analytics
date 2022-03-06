const { Corpus } = require('../src/Corpus')
const FoodServiceDataset = require('../src/FoodServicesDataset')
const mock = require('mock-fs')

describe('載入 Excel', function () {
  test('載入餐飲業Excel，length 應等於70', function () {
    const corpus = new Corpus()
    corpus.loadFromWorkBook(FoodServiceDataset.ExcelWorkbook)
    expect(corpus.length).toBe(70)
  })

  test('載入餐飲業Excel，clear 之後，length 應等於0', function () {
    const corpus = new Corpus()
    corpus.loadFromWorkBook(FoodServiceDataset.ExcelWorkbook)
    corpus.clear()
    expect(corpus.length).toBe(0)
  })
})

describe('載入 loadFromFile', function () {
  test('載入 SingleDocument，length 應等於 1', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })
    let corpus = new Corpus()
    expect(corpus.loadFromFile('./docs/a.txt').length).toBe(1)
    mock.restore()
  })
})
