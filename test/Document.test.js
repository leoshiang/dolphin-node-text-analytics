const { Document } = require('../src/Document')
const FoodServiceDataset = require('../src/FoodServiceDataset')

const mock = require('mock-fs')

describe('測試 addText', function () {
  test('應能加入字串陣列', function () {
    let document = new Document('FoodServiceDataset')
    FoodServiceDataset.Documents.forEach(d => document.add(d.split('\r\n')))
    expect(document.lineCount).toBe(403)
  })

  test('應能加入單一字串', function () {
    let document = new Document('FoodServiceDataset')
    document.add(FoodServiceDataset.SingleDocument)
    expect(document.lineCount).toBe(1)
  })
})

describe('測試 addFile', function () {
  test('傳入不存在的檔案名稱，應拋出例外', function () {
    let document = new Document('FoodServiceDataset')
    expect(() => document.addFile('./docs/not-exists.txt')).toThrow(Error)
  })

  test('傳入存在的檔案名稱，lines 應包含所有的檔案資料。', function () {
    mock({
           './docs': {
             'some-file.txt': FoodServiceDataset.SingleDocument,
           },
         })
    let document = new Document()
    document.addFile('./docs/some-file.txt')
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
    document.addFile('./docs/document1.txt')
    document.addFile('./docs/document2.txt')
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
    expect(document.addFile('./docs/some-file.txt')).toBe(document)

    mock.restore()
  })
})

describe('測試 asString', function () {
  test('傳入有三行的文字，應包含不含換行符號的文字。', function () {
    mock({
           './docs': {
             'document1.txt': FoodServiceDataset.Document1,
           },
         })

    let document = new Document()
    document.addFile('./docs/document1.txt')
    mock.restore()

    const expected = FoodServiceDataset.Document1.split('\r\n')
                                       .reduce((acc, curr) => acc + curr, '')

    expect(document.asString()).toBe(expected)
  })
})

describe('測試 charCount', function () {
  test('傳入文件，charCount 應等於所有字元數目。', function () {

    const someTextFile = 'line1\r\nline2\r\nline3\r\n'

    mock({
           './docs': {
             'some-file.txt': someTextFile,
           },
         })

    let document = new Document()
    document.addFile('./docs/some-file.txt')

    mock.restore()

    expect(document.charCount()).toBe(15)
  })
})

describe('測試 clear', function () {
  test('傳入文件接著清除，lineCount 應等於 0。', function () {

    const someTextFile = 'line1\r\nline2\r\nline3\r\n'

    mock({
           './docs': {
             'some-file.txt': someTextFile,
           },
         })

    let document = new Document()
    document.addFile('./docs/some-file.txt')
    document.clear()

    mock.restore()

    expect(document.lineCount).toBe(0)
  })

  test('傳入文件接著清除，name 應等於空字串。', function () {

    const someTextFile = 'line1\r\nline2\r\nline3\r\n'

    mock({
           './docs': {
             'some-file.txt': someTextFile,
           },
         })

    let document = new Document('test')
    document.addFile('./docs/some-file.txt')
    document.clear()

    mock.restore()

    expect(document.name).toBe('')
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

    const someTextFile = 'line1\r\nline2\r\nline3\r\n'

    mock({
           './docs': {
             'some-file.txt': someTextFile,
           },
         })

    let document = new Document()
    document.addFile('./docs/some-file.txt')

    mock.restore()

    expect(document.lineCount).toBe(4)
  })
})
