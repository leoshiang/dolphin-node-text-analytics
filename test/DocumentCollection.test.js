const { DocumentCollection } = require('../src/DocumentCollection')
const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')
const mock = require('mock-fs')

describe('載入 Excel', function () {
  test('載入餐飲業Excel，length 應等於70', function () {
    const dc = new DocumentCollection()
    dc.loadDocumentsFromWorkBook(FoodServiceDataset.ExcelWorkbook)
    expect(dc.length).toBe(70)
  })

  test('載入餐飲業Excel，clear 之後，length 應等於0', function () {
    const dc = new DocumentCollection()
    dc.loadDocumentsFromWorkBook(FoodServiceDataset.ExcelWorkbook)
    dc.clear()
    expect(dc.length).toBe(0)
  })
})

describe('載入 loadFromFile', function () {
  test('載入 SingleDocument，length 應等於 1', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })
    let dc = new DocumentCollection()
    expect(dc.loadDocumentFromFile('./docs/a.txt').length).toBe(1)
    mock.restore()
  })
})
