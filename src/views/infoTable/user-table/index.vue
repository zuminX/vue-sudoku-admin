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
      <button class="ui blue right floated button" @click="insertUser">插入用户</button>
    </div>
    <UserInfoTable
      :mode="mode"
      :search-name="searchName"
      :search-user="searchUser"
      @clickEdit="handleEditUser"
      @clickGameDetail="handleShowGameDetail"
    />
    <SaveUserModal :user="editUser" />
    <ConditionSearchModal @search="searchByCondition" />
    <UserGameDetailModal :user-id="showDetailId" />
  </div>
</template>

<script>
import SaveUserModal from '@/views/infoTable/user-table/components/SaveUseModal'
import UserInfoTable from '@/views/infoTable/user-table/components/UserInfoTable'
import { showModal } from '@/components/Modal/Modal'
import ConditionSearchModal from '@/views/infoTable/user-table/components/ConditionSearchModal'
import UserGameDetailModal from '@/views/infoTable/user-table/components/UserGameDetailModal'

export default {
  name: 'UserTable',
  components: { UserGameDetailModal, ConditionSearchModal, UserInfoTable, SaveUserModal },
  data() {
    return {
      editUser: null,
      searchUser: null,
      showDetailId: 0,
      searchName: '',
      mode: ''
    }
  },
  methods: {
    showModal,
    handleEditUser(user) {
      this.editUser = user
      showModal('saveUserModal')
    },
    insertUser() {
      this.editUser = null
      showModal('saveUserModal')
    },
    searchByName() {
      this.mode = 'name'
    },
    searchByCondition(searchUser) {
      this.searchUser = searchUser
      this.mode = 'condition'
    },
    handleShowGameDetail(id) {
      this.showDetailId = id
      showModal('userGameDetailModal')
    }
  }
}
</script>
