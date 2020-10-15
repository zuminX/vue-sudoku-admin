import { getRoleList } from '@/api/roleApi'

export const constStore = {
  data: {
    _roleList: null
  },
  async getRoleNameList() {
    if (!this.data._roleList) {
      const { success, data } = await getRoleList()
      if (success) {
        this.data._roleList = data
      }
    }
    return this.data._roleList
  }
}
