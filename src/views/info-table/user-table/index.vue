<template>
  <div>
    <div class="m-padded-t m-padded-lr-large">
      <div class="ui action input">
        <input v-model="searchName" type="text" placeholder="输入用户的名称">
        <button class="ui button" @click="searchByName">搜索</button>
      </div>
      <button class="ui teal labeled icon button m-margin-l" @click="showModal('conditionSearchModal')">
        <i class="search icon" />
        高级搜索
      </button>
      <button class="ui blue right floated button" @click="insertUser">新增用户</button>
    </div>
    <UserInfoTable
      ref="userInfoTable"
      @clickEdit="handleEditUser"
      @clickGameDetail="handleShowGameDetail"
    />
    <SaveUserModal :user="editUser" @saveUserSuccess="refreshUserInfoTableToLast" />
    <ConditionSearchModal @search="searchByCondition" />
    <UserGameDetailModal :user-id="showDetailId" />
  </div>
</template>

<script>
import SaveUserModal from '@/views/info-table/user-table/saveUserModal/index'
import UserInfoTable from '@/views/info-table/user-table/userInfoTable/index'
import { showModal } from '@/components/Modal/Modal'
import ConditionSearchModal from '@/views/info-table/user-table/conditionSearchModal/index'
import UserGameDetailModal from '@/views/info-table/user-table/userGameDetailModal/index'

export default {
  name: 'UserTable',
  components: { UserGameDetailModal, ConditionSearchModal, UserInfoTable, SaveUserModal },
  data() {
    return {
      editUser: null,
      showDetailId: 0,
      searchName: ''
    }
  },
  methods: {
    showModal,
    /**
     * 修改用户
     * @param user 待修改的用户
     */
    handleEditUser(user) {
      this.editUser = user
      showModal('saveUserModal')
    },
    /**
     * 新增用户
     */
    insertUser() {
      this.editUser = null
      showModal('saveUserModal')
    },
    /**
     * 根据名称查询用户
     */
    searchByName() {
      this.$refs.userInfoTable.refreshUserInfoTableByName(this.searchName)
    },
    /**
     * 根据查询条件查询用户
     * @param searchUser 查询条件
     */
    searchByCondition(searchUser) {
      this.$refs.userInfoTable.refreshUserInfoTableByCondition(searchUser)
    },
    /**
     * 显示指定用户的游戏详情
     * @param id 用户ID
     */
    handleShowGameDetail(id) {
      this.showDetailId = id
      showModal('userGameDetailModal')
    },
    /**
     * 刷新用户信息表格至最后一页
     */
    refreshUserInfoTableToLast() {
      this.$refs.userInfoTable.refreshUserInfoTableToLast()
    }
  }
}
</script>
