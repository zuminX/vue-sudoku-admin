const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 数独游戏竞赛API的基地址
 */
const baseUrl = 'gameRace'

const gameRaceAPI = {
  publishRace: new APIInfo('publishPublicRace', baseUrl, 'post'),
  getPublicRaceList: new APIInfo('publicRaceList', baseUrl)
}

module.exports = [
  new MockInfo(gameRaceAPI.publishRace, () => {
    return require('../../data/voidSuccess.json')
  }),
  new MockInfo(gameRaceAPI.getPublicRaceList, () => {
    return require('../../data/voidSuccess.json')
  })
]
