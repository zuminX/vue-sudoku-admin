<template>
  <div>
    <Loader :show="loaderShow">
      <table class="ui striped table">
        <thead>
          <tr class="center aligned">
            <th>用户名</th>
            <th>昵称</th>
            <th>拥有的角色</th>
            <th>创建时间</th>
            <th>最近登录时间</th>
            <th>是否启用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-for="(user,i) in userList" :key="i">
          <tr class="center aligned">
            <td>{{ user.username }}</td>
            <td>{{ user.nickname }}</td>
            <td>
              <div class="ui basic labels">
                <a v-for="(role, j) in user.roleList" :key="j" class="ui label">{{ role.nickname }}</a>
              </div>
            </td>
            <td>{{ parseStringTime(user.createTime) }}</td>
            <td>{{ parseStringTime(user.recentLoginTime) }}</td>
            <td>
              <a v-if="user.enabled" class="ui green basic label">启用</a>
              <a v-else class="ui red basic label">禁用</a>
            </td>
            <td>
              <button :disabled="roleListHasAdmin(user.roleList)" class="ui blue basic button" @click="$emit('clickEdit', user)">
                修改
              </button>
              <button class="ui teal basic button" @click="$emit('clickGameDetail', user.id)">
                游戏详情
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="center aligned" colspan="7">
              <PaginationMenu :page-information="pageInformation" @currentChange="updateCurrentPageData" />
            </th>
          </tr>
        </tfoot>
      </table>
    </Loader>
  </div>
</template>

<script>
import { roleListHasAdmin } from '@/utils/coreUtils'
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'
import { parseStringTime } from '@/utils/tool'
import PaginationMenu from '@/components/PaginationMenu/index'
import Loader from '@/components/Loader/index'
import {
  getUserList,
  searchUser,
  searchUserByName
} from '@/api/admin/userAPI'

export default {
  name: 'UserInfoTable',
  components: { Loader, PaginationMenu },
  data() {
    return {
      pageInformation: getDefaultPageInformation(),
      userList: [],
      loaderShow: false,
      mode: '',
      searchName: '',
      searchUser: null
    }
  },
  mounted() {
    this.updateCurrentPageData()
  },
  methods: {
    parseStringTime,
    roleListHasAdmin,
    /**
     * 更新当前分页数据
     * @param page 当前页
     * @param pageSize 每页大小
     * @returns {Promise<void>}
     */
    async updateCurrentPageData(page = 1, pageSize = 5) {
      this.loaderShow = true
      const { success, data } = await this.requestUserListByMode(page, pageSize)
      this.loaderShow = false
      if (success) {
        this.pageInformation = data.pageInformation
        this.userList = data.list
      }
    },
    /**
     * 刷新用户信息表格
     * @returns {Promise<void>}
     */
    async refreshUserInfoTable() {
      await this.updateCurrentPageData(this.pageInformation.currentPage, this.pageInformation.pageSize)
    },
    async refreshUserInfoTableByName(name) {
      this.mode = 'name'
      this.searchName = name
      await this.refreshUserInfoTable()
    },
    async refreshUserInfoTableByCondition(user) {
      this.mode = 'condition'
      this.searchUser = user
      await this.refreshUserInfoTable()
    },
    async refreshUserInfoTableToLast() {
      this.mode = ''
      await this.updateCurrentPageData(2147483647, this.pageInformation.pageSize)
    },
    /**
     * 根据不同模式请求用户列表数据
     * @param page 当前页
     * @param pageSize 每页大小
     * @returns {AxiosPromise<any>} 请求对象
     */
    async requestUserListByMode(page, pageSize) {
      let request
      switch (this.mode) {
        case 'name':
          request = searchUserByName(this.searchName, page, pageSize)
          break
        case 'condition':
          request = searchUser(this.searchUser, page, pageSize)
          break
        default:
          request = getUserList(page, pageSize)
      }
      return request
    }
  }
}
</script>
