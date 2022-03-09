const { Document } = require('../src/Document')
const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')
const mock = require('mock-fs')

describe('測試 addLines', function () {
  test('加入多個字串，asString() 應等於加入的所有字串', function () {
    let document = new Document('')
    document.addLines(FoodServiceDataset.DocumentArray)
    expect(document.asString()).toBe(FoodServiceDataset.SingleDocument)
  })

  test('傳入陣列，應不處理', function () {
    let document = new Document('')
    document.addLines()
    expect(document.length).toBe(0)
  })
})

describe('測試 addText', function () {
  test('加入單一字串，asString() 應等於加入的字串', function () {
    let document = new Document('')
    document.addText(FoodServiceDataset.SingleDocument)
    expect(document.asString()).toBe(FoodServiceDataset.SingleDocument)
  })

  test('加入非文字的資料，lineCount 應不會改變', function () {
    let document = new Document('')
    document.addText(0)
    expect(document.lineCount).toBe(0)
  })

  test('加入空字串，lineCount 應不會改變', function () {
    let document = new Document('')
    document.addText('')
    expect(document.lineCount).toBe(0)
  })

  test('應回傳自己', function () {
    let document = new Document()
    expect(document.addText(FoodServiceDataset.SingleDocument)).toBe(document)
  })
})

describe('測試 asString', function () {
  test('傳入三行的文字，asString() 應包含不含換行符號的文字。', function () {
    const Document1Lines = FoodServiceDataset.Document1.split('\r\n')
    let document = new Document()
    document.addLines(Document1Lines)
    const expected = Document1Lines.reduce((acc, curr) => acc + curr, '')
    expect(document.asString()).toBe(expected)
  })
})

describe('測試 clear', function () {
  test('加入文字之後呼叫 clear()，lineCount 應等於 0。', function () {
    let document = new Document()
      .addText(FoodServiceDataset.Document1)
      .clear()
    expect(document.lineCount).toBe(0)
  })

  test('傳入文件接著清除，name 應等於空字串。', function () {
    let document = new Document()
      .addText(FoodServiceDataset.Document1)
      .clear()
    expect(document.name).toBe('')
  })

  test('傳入文件接著清除，lines 應等於空陣列。', function () {
    let document = new Document()
      .addText(FoodServiceDataset.Document1)
      .clear()
    expect(document.lines).toStrictEqual([])
  })
})

describe('測試 constructor', function () {
  test('傳入 name，name 應等於傳入的值', function () {
    let document = new Document('test')
    expect(document.name).toBe('test')
  })

  test('沒傳入 name，name 應等於空值', function () {
    let document = new Document()
    expect(document.name).toBe('')
  })
})

describe('測試 lineCount', function () {
  test('傳入有三行的文字，應回傳4。', function () {
    let document = new Document()
    document.addText(FoodServiceDataset.Document1)

    mock.restore()

    expect(document.lineCount).toBe(1)
  })
})

describe('測試 length', function () {
  test('傳入文件，length 應等於所有字元數目。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document().loadFromTextFile('./docs/some-file.txt')
    mock.restore()
    expect(document.length).toBe(847)
  })
})

describe('測試 loadFromFile', function () {
  test('檔案不存在，應回傳自己', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })
    let document = new Document()
    expect(document.loadFromTextFile('./docs/a.txt')).toBe(document)
    mock.restore()
  })

  test('傳入存在的檔案名稱，lines 應包含所有的檔案資料。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })
    let document = new Document()
    document.loadFromTextFile('./docs/some-file.txt')
    mock.restore()
    const expected = FoodServiceDataset.SingleDocument.split('\r\n')
                                       .reduce((acc, curr) => acc + curr, '')

    expect(document.asString()).toBe(expected)
  })

  test('載入多個檔案，asString() 應是所有的文字加總', function () {
    mock({
           './docs': {
             'document1.txt': FoodServiceDataset.Document1,
             'document2.txt': FoodServiceDataset.Document2,
           },
         })

    let document = new Document()
    document.loadFromTextFile('./docs/document1.txt')
    document.loadFromTextFile('./docs/document2.txt')
    mock.restore()

    const doc1 = FoodServiceDataset.Document1.split('\r\n')
                                   .reduce((acc, curr) => acc + curr, '')
    const doc2 = FoodServiceDataset.Document2.split('\r\n')
                                   .reduce((acc, curr) => acc + curr, '')
    const expected = doc1.concat(doc2)

    expect(document.asString()).toBe(expected)
  })

  test('應回傳自己。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })

    let document = new Document()
    expect(document.loadFromTextFile('./docs/some-file.txt')).toBe(document)

    mock.restore()
  })
})
