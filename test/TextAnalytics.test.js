const FoodServiceDataset = require('../src/DataSet/FoodServicesDataset')
const { TextAnalytics } = require('../src/TextAnalytics')
const os = require('os')
const fs = require('fs')
const { PMIMatrixExcelWriter } = require('../src/Writers/PMIMatrixExcelWriter')

describe('測試 readDocumentsFromExcel', function () {
  test('應能產生 tfidf.xlsx。', function () {
    const tempDir = os.tmpdir() // /tmp
    let tempFileName = tempDir + '/food-service.xlsx'
    let excelFile = Buffer.from(FoodServiceDataset.Base64EncodedExcel, 'base64')
    fs.writeFileSync(tempFileName, excelFile, { flag: 'w+' })
    let userDictTempFileName = tempDir + '/userdict.txt'
    let stopWordsTempFileName = tempDir + '/stopwords.txt'
    fs.writeFileSync(userDictTempFileName,
                     Buffer.from(FoodServiceDataset.UserDictionary, 'base64').toString('utf8'),
                     { flag: 'w+' })
    fs.writeFileSync(stopWordsTempFileName,
                     Buffer.from(FoodServiceDataset.StopWords, 'base64').toString('utf8'),
                     { flag: 'w+' })

    let textAnalytics = new TextAnalytics()
    textAnalytics.loadUserDictionaryFile(userDictTempFileName)
                 .loadStopWordsFile(stopWordsTempFileName)
                 .readExcel(tempFileName)
                 .execute()
                 .exportTfidfToExcel('./tfidf.xlsx')
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })
})

describe('測試 pmi', function () {
  test('pmi(便宜,相對)', function () {
    const tempDir = os.tmpdir() // /tmp
    let tempFileName = tempDir + '/food-service.xlsx'
    let excelFile = Buffer.from(FoodServiceDataset.Base64EncodedExcel, 'base64')
    fs.writeFileSync(tempFileName, excelFile, { flag: 'w+' })
    let userDictTempFileName = tempDir + '/userdict.txt'
    let stopWordsTempFileName = tempDir + '/stopwords.txt'
    fs.writeFileSync(userDictTempFileName,
                     Buffer.from(FoodServiceDataset.UserDictionary, 'base64').toString('utf8'),
                     { flag: 'w+' })
    fs.writeFileSync(stopWordsTempFileName,
                     Buffer.from(FoodServiceDataset.StopWords, 'base64').toString('utf8'),
                     { flag: 'w+' })

    let textAnalytics = new TextAnalytics()

    let pmi = textAnalytics.loadUserDictionaryFile(userDictTempFileName)
                           .loadStopWordsFile(stopWordsTempFileName)
                           .readExcel(tempFileName)
                           .execute()
                           .pmi('還不錯', '服務')
    expect(pmi).toBe(2.97862499086066)
    let terms = [
      '好吃',
      '掌控',
      '夯',
      '湯棧',
      '獲勝',
      '小桌',
      '鯛魚',
      '新意',
      '湯頭',
      '好',
      '海陸鍋',
      '如一',
      '總類',
      '服务',
      '網路',
      '小資',
      '選菜',
      '服務滿分',
      '空間',
      '上網',
      '時間',
      '味道',
      '缺點',
      '太貴',
      '很美',
      '終於吃到',
      '同步',
      '這麼久',
      '最大',
      '太差',
      '服務',
      '候位',
      '牛奶鍋',
      '較慢',
      '取號',
      '抽號',
      '限時',
      '距離',
      '號碼牌',
      '茶',
      '不值得',
      '加菜',
      '單人',
      '無糖綠',
      '飯',
      '清楚',
      '咖喱',
      '喜歡',
      '價位',
      '便宜',
      '相對',
      '較少',
      '壽星',
      '白菜',
      '價格',
      '南瓜',
      '品質',
      '享用',
      '回訪',
      '最愛',
      '食材新鮮',
      '湯頭好',
      '用料',
      '飲品',
      '新鮮',
      '餐點',
      '食材',
      '共鍋',
      '肉',
      '蛤蜊',
      '服務態度',
      '讚',
      '價',
      '超值',
      '周到',
      '魚',
      '大鍋',
      '服務不錯',
      '近',
      '期待',
      '精緻',
      '起司',
      '小孩',
      '品牌',
      '入座',
      '擠',
      '出餐',
      '時段',
      '自助式',
      '超好吃',
      '火鍋料',
      '寬敞',
      '多樣',
      '推',
      '黑豆',
      '鍋底',
      '舒服',
      '水準',
      '預約',
      '辣椒',
      '裝潢',
      '等候',
      '叫號',
      '麻辣鍋',
      '普通',
      '合理',
      '用餐時間',
      '雞',
      '下次',
      'CP值高',
      '菜盤',
      '檸檬',
      '問題',
      '海鮮',
      '冬瓜',
      '座位',
      '口味',
      '訂位',
      '火鍋店',
      '冰沙',
      '整體',
      '份量',
      '比較',
      '值得',
      '湯',
      '還不錯',
      '食物',
      '美味',
      '現場',
      '飽',
      '乾淨',
      '等',
      '很好',
      '不錯',
      '人員',
      '環境',
    ]
    let pmiMatrix = textAnalytics.buildPMIMatrix(terms)
    PMIMatrixExcelWriter.export(terms, pmiMatrix, './output/pmi.xlsx')
    try {
      fs.unlinkSync(tempFileName)
    } catch (e) {
    }
  })
})
