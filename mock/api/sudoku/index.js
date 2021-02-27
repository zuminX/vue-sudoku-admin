const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 数独API的基地址
 */
const baseUrl = 'sudoku'

const sudokuAPI = {
  getSudokuLevels: new APIInfo('sudokuLevels', baseUrl),
  getSudokuFinal: new APIInfo('generateSudokuFinal.*', baseUrl, 'get', true)
}

module.exports = [
  new MockInfo(sudokuAPI.getSudokuLevels, () => {
    return require('./data/sudokuLevels.json')
  }),
  new MockInfo(sudokuAPI.getSudokuFinal, () => {
    return require('./data/sudokuFinal.json')
  })
]
