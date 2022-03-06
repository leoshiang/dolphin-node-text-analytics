const { Document } = require('../src/Document')
const { Tokenizer } = require('../src/Tokenizer')
const mock = require('mock-fs')
const _ = require('lodash')
const FoodServiceDataset = require('../src/FoodServicesDataset')

describe('測試 fromDocument', function () {
  test('傳入檔案名稱，count 應包含所有的檔案資料。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document()
    document.loadFromFile('./docs/some-file.txt')
    mock.restore()

    let tokens = Tokenizer.parse(document)
    expect(_.keys(tokens.count).length).toBe(346)
    expect(tokens.tokens.length).toBe(667)
  })

  test('空文件，terms 應等於空陣列。', function () {
    let document = new Document()
    let tokens = Tokenizer.parse(document)
    expect(tokens.terms).toStrictEqual([])
  })
})

describe('測試 countOf', function () {
  test('傳入檔案名稱，count 應包含所有的檔案資料。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })

    let document = new Document()
    document.loadFromFile('./docs/some-file.txt')
    mock.restore()

    let tokens = Tokenizer.parse(document)
    tokens.dump()
    expect(tokens.countOf('麻辣')).toBe(14)
    expect(tokens.countOf('蛤蜊')).toBe(4)
  })
})

describe('測試 totalCount', function () {
  test('傳入檔案名稱，count 應包含所有的檔案資料。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })

    let document = new Document()
    document.loadFromFile('./docs/some-file.txt')
    mock.restore()

    let tokens = Tokenizer.parse(document)
    expect(tokens.totalCount).toBe(11386)
  })
})

describe('測試 terms', function () {
  test('傳入檔案名稱，count 應包含所有的檔案資料。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })

    let document = new Document()
    document.loadFromFile('./docs/some-file.txt')
    mock.restore()

    let tokens = Tokenizer.parse(document)
    expect(tokens.terms.length).toBe(1671)
  })
})

describe('測試 descendingOrder', function () {
  test('傳入檔案名稱，count 應包含所有的檔案資料。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })

    let document = new Document()
    document.loadFromFile('./docs/some-file.txt')
    mock.restore()

    let least3 = Tokenizer.parse(document).descendingOrder().least(3)
    expect(least3[0].term).toBe('的')
    expect(least3[1].term).toBe('很')
    expect(least3[2].term).toBe('不')
  })
})

describe('測試 top', function () {
  test('取次數前三名。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })

    let document = new Document()
    document.loadFromFile('./docs/some-file.txt')
    mock.restore()

    let lowest3 = Tokenizer.parse(document).ascendingOrder().dump().top(3)
    expect(lowest3[0].term).toBe('通')
    expect(lowest3[1].term).toBe('心得')
    expect(lowest3[2].term).toBe('聽')
  })
})
