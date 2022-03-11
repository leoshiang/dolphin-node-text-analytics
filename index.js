const FoodServicesDataset = require('./src/DataSet/FoodServicesDataset')
const { Corpus } = require('./src/Corpus')
const { Document } = require('./src/Document')
const { SegmentationResult } = require('./src/SegmentationResult')
const { SegmentationResults } = require('./src/SegmentationResults')
const { TextAnalytics } = require('./src/TextAnalytics')
const { TfidfCalculator } = require('./src/TfidfCalculator')
const { TfidfResult } = require('./src/TfidfResult')
const { WordsSegmenter } = require('./src/WordsSegmenter')

module.exports = {
  Corpus,
  Document,
  FoodServicesDataset,
  SegmentationResult,
  SegmentationResults,
  TextAnalytics,
  TfidfCalculator,
  TfidfResult,
  WordsSegmenter,
}
