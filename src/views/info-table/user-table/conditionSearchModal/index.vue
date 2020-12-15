<template>
  <Modal modal-id="conditionSearchModal">
    <template #header>
      <BasicModalHeader class="blue">
        条件查询用户
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form>
        <LeftLabeledInputField :data.sync="form.username" label="用户名" />
        <LeftLabeledInputField :data.sync="form.nickname" label="昵称" />
        <LeftLabeledField label="创建时间范围">
          <el-date-picker
            v-model="form.createTimeRange"
            end-placeholder="结束日期"
            start-placeholder="开始日期"
            type="datetimerange"
          />
        </LeftLabeledField>
        <LeftLabeledField label="最近登录时间范围">
          <el-date-picker
            v-model="form.recentLoginTimeRange"
            end-placeholder="结束日期"
            start-placeholder="开始日期"
            type="datetimerange"
          />
        </LeftLabeledField>
        <LeftLabeledField label="角色">
          <RoleDropdown :role-name-list.sync="form.roleNameList" />
        </LeftLabeledField>
        <div class="inline fields">
          <label>是否启用</label>
          <BasicField>
            <div class="ui radio checkbox">
              <input v-model="form.enabled" checked="checked" name="enabled" type="radio" value="-1">
              <label>不限</label>
            </div>
          </BasicField>
          <BasicField>
            <div class="ui radio checkbox">
              <input v-model="form.enabled" name="enabled" type="radio" value="1">
              <label>启用</label>
            </div>
          </BasicField>
          <BasicField>
            <div class="ui radio checkbox">
              <input v-model="form.enabled" name="enabled" type="radio" value="0">
              <label>禁用</label>
            </div>
          </BasicField>
        </div>
      </Form>
    </BasicModalContent>
    <template #actions>
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
import { deepClone } from '@/utils/tool'
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'
import BasicField from '@/components/Form/field/BasicField'
import RoleDropdown from '@/components/RoleDropdown'

export default {
  name: 'ConditionSearchModal',
  components: {
    RoleDropdown,
    BasicField,
    LeftLabeledField,
    LeftLabeledInputField,
    Form,
    OkOrCancelModalActions,
    BasicModalContent,
    BasicModalHeader,
    Modal
  },
  data() {
    return {
      form: {
        username: '',
        nickname: '',
        createTimeRange: [new Date(), new Date()],
        recentLoginTimeRange: [new Date(), new Date()],
        roleNameList: [],
        enabled: -1
      }
    }
  },
  methods: {
    /**
     * 处理查询的用户对象，并将其作为search事件向上抛出
     */
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
    }
  }
}
</script>
