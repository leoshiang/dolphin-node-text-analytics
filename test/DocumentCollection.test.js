const { DocumentCollection } = require('../src/DocumentCollection')
const FoodServiceDataset = require('../src/FoodServiceDataset')
const { Document } = require('../src/Document')
const mock = require('mock-fs')

describe('載入 Excel', function () {
  test('載入餐飲業Excel，length 應等於70', function () {
    const documentCollection = new DocumentCollection()
    documentCollection.loadFromExcel(FoodServiceDataset.ExcelWorkbook)
    expect(documentCollection.length).toBe(70)
  })

  test('載入餐飲業Excel，clear 之後，length 應等於0', function () {
    const documentCollection = new DocumentCollection()
    documentCollection.loadFromExcel(FoodServiceDataset.ExcelWorkbook)
    documentCollection.clear()
    expect(documentCollection.length).toBe(0)
  })
})
