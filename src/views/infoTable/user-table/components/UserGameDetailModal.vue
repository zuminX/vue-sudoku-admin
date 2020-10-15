<template>
  <Modal modal-id="userGameDetailModal">
    <template v-slot:header>
      <BasicModalHeader class="blue">
        游戏详情
      </BasicModalHeader>
    </template>
    <div class="scrolling content">
      <h4 class="ui horizontal divider header">
        用户游戏信息
      </h4>
      <UserGameInformationList :user-id="userId" />
      <h4 class="ui horizontal divider header">
        游戏历史记录
      </h4>
      <UserGameRecordTable :user-id="userId" />
    </div>
    <template v-slot:actions>
      <OKModalActions />
    </template>
  </Modal>
</template>

<script>
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import Modal from '@/components/Modal/index'
import OKModalActions from '@/components/Modal/actions/OKModalActions'
import UserGameInformationList from '@/components/UserGameInformationList/index'
import UserGameRecordTable from '@/components/UserGameRecordTable/index'

export default {
  name: 'UserGameDetailModal',
  components: { UserGameRecordTable, UserGameInformationList, OKModalActions, Modal, BasicModalHeader },
  props: {
    userId: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
