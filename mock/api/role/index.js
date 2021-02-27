const { MockInfo } = require('../../model/MockInfo')
const { APIInfo } = require('../../model/APIInfo')

/**
 * 角色API的基地址
 */
const baseUrl = 'role'

const roleAPI = {
  getRoleList: new APIInfo('roleList', baseUrl)
}

module.exports = [
  new MockInfo(roleAPI.getRoleList, () => {
    return require('./data/roleList.json')
  })
]
