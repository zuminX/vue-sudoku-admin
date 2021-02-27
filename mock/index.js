const { mockAPI } = require('./utils')

const gameRace = require('./api/gameRace')
const role = require('./api/role')
const security = require('./api/security')
const statistics = require('./api/statistics')
const sudoku = require('./api/sudoku')
const user = require('./api/user')

const mocks = [
  ...gameRace,
  ...role,
  ...security,
  ...statistics,
  ...sudoku,
  ...user
]

for (const mock of mocks) {
  mockAPI(mock)
}

