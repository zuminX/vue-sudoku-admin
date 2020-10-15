<template>
  <Modal modal-id="conditionSearchModal">
    <template v-slot:header>
      <BasicModalHeader class="blue">
        条件查询用户
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form>
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              用户名
            </div>
            <input v-model="form.username" type="text">
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              昵称
            </div>
            <input v-model="form.nickname" type="text">
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              创建时间范围
            </div>
            <el-date-picker
              v-model="form.createTimeRange"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              最近登录时间范围
            </div>
            <el-date-picker
              v-model="form.recentLoginTimeRange"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              角色
            </div>
            <div id="roleDropdown" class="ui clearable multiple selection dropdown">
              <input name="roleNameList" type="hidden" @change="changeRoleNameList($event.target.value)">
              <i class="dropdown icon" />
              <div class="default text">选择角色</div>
              <div class="menu">
                <div
                  v-for="(role, i) in roleList"
                  :key="i"
                  :data-text="role.nameZh"
                  :data-value="role.name"
                  class="item"
                >
                  {{ role.nameZh }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="inline fields">
          <label>是否启用</label>
          <div class="field">
            <div class="ui radio checkbox">
              <input v-model="form.enabled" type="radio" name="enabled" checked="checked" value="-1">
              <label>不限</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input v-model="form.enabled" type="radio" name="enabled" value="1">
              <label>启用</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input v-model="form.enabled" type="radio" name="enabled" value="0">
              <label>禁用</label>
            </div>
          </div>
        </div>
      </Form>
    </BasicModalContent>
    <template v-slot:actions>
      <OkOrCancelModalActions @clickCheck="handleCheck" />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import OkOrCancelModalActions from '@/components/Modal/actions/OkOrCancelModalActions'
import Form from '@/components/Form/index'
import { constStore } from '@/store/constStore'
import { deepClone } from '@/utils/tool'

export default {
  name: 'ConditionSearchModal',
  components: { Form, OkOrCancelModalActions, BasicModalContent, BasicModalHeader, Modal },
  data() {
    return {
      form: this.getDefaultForm(),
      roleList: []
    }
  },
  async mounted() {
    this.roleList = await constStore.getRoleNameList()
  },
  methods: {
    handleCheck() {
      const searchUser = deepClone(this.form)
      const enabled = this.form.enabled
      searchUser.enabled = enabled === -1 ? null : (enabled === 1)
      const createTimeRange = searchUser.createTimeRange
      if (createTimeRange) {
        searchUser.createTimeRange = {
          start: createTimeRange[0],
          end: createTimeRange[1]
        }
      }
      const recentLoginTimeRange = searchUser.recentLoginTimeRange
      if (recentLoginTimeRange) {
        searchUser.recentLoginTimeRange = {
          start: recentLoginTimeRange[0],
          end: recentLoginTimeRange[1]
        }
      }
      this.$emit('search', searchUser)
    },
    getDefaultForm() {
      return {
        username: '',
        nickname: '',
        createTimeRange: [new Date(), new Date()],
        recentLoginTimeRange: [new Date(), new Date()],
        roleNameList: [],
        enabled: -1
      }
    },
    changeRoleNameList(value) {
      this.form.roleNameList = value.split(',')
    }
  }
}
</script>
