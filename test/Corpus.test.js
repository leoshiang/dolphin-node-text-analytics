const { Corpus } = require('../src/Corpus')
const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')
const mock = require('mock-fs')

describe('測試 readWorkBook', function () {
  test('載入 ExcelWorkbook，length 應等於70', function () {
    const corpus = new Corpus().readWorkBook(FoodServiceDataset.ExcelWorkbook)
    expect(corpus.length).toBe(70)
  })

  test('載入 ExcelWorkbook 接著 clear，length 應等於0', function () {
    const corpus = new Corpus().readWorkBook(FoodServiceDataset.ExcelWorkbook).clear()
    expect(corpus.length).toBe(0)
  })
})

describe('測試 readTextFile', function () {
  test('載入 SingleDocument，length 應等於 1', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })
    let corpus = new Corpus()
    expect(corpus.readTextFile('./docs/a.txt').length).toBe(1)
    mock.restore()
  })
})
