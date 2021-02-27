const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 用户API的基地址
 */
const baseUrl = 'user'

const userAPI = {
  getUserGameInformationById: new APIInfo('gameInformationById.*', baseUrl, 'get', true),
  getHistoryGameRecordById: new APIInfo('historyGameRecordById.*', baseUrl, 'get', true),
  getUserList: new APIInfo('userList', baseUrl),
  modifyUser: new APIInfo('modifyUser', baseUrl, 'post'),
  addUser: new APIInfo('addUser', baseUrl, 'post'),
  searchUser: new APIInfo('searchUser', baseUrl, 'post'),
  searchUserByName: new APIInfo('searchUserByName.*', baseUrl, 'get', true)
}

module.exports = [
  new MockInfo(userAPI.getUserGameInformationById, () => {
    return require('./data/userGameInformation.json')
  }),
  new MockInfo(userAPI.getHistoryGameRecordById, () => {
    return require('./data/historyGameRecord.json')
  }),
  new MockInfo(userAPI.getUserList, () => {
    return require('./data/userList.json')
  }),
  new MockInfo(userAPI.modifyUser, () => {
    return require('../../data/voidSuccess.json')
  }),
  new MockInfo(userAPI.addUser, () => {
    return require('../../data/voidSuccess.json')
  }),
  new MockInfo(userAPI.searchUser, () => {
    return require('./data/searchUser.json')
  }),
  new MockInfo(userAPI.searchUserByName, () => {
    return require('./data/searchUser.json')
  })
]
