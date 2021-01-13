<template>
  <Modal modal-id="saveUserModal" form-id="userForm">
    <template #header>
      <BasicModalHeader class="blue">
        保存用户
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form form-id="userForm" :validate-rule="validateRule()">
        <LeftLabeledInputField :data.sync="form.username" name="username" label="用户名" />
        <LeftLabeledInputField v-if="isNew" :data.sync="form.password" name="password" label="密码" />
        <LeftLabeledInputField :data.sync="form.nickname" name="nickname" label="昵称" />
        <LeftLabeledField label="创建时间">
          <el-date-picker
            v-model="form.createTime"
            placeholder="选择创建的日期时间"
            type="datetime"
          />
        </LeftLabeledField>
        <LeftLabeledField label="最近登录时间">
          <el-date-picker
            v-model="form.recentLoginTime"
            placeholder="选择用户最近登录系统的时间"
            type="datetime"
          />
        </LeftLabeledField>
        <LeftLabeledField label="角色">
          <RoleDropdown :role-name-list.sync="form.roleNameList" :init-role="initRole" />
        </LeftLabeledField>
        <BasicField>
          <div class="ui toggle checkbox m-padded-tb tip-popup">
            <input id="enabled" v-model="form.enabled" data-content="是否让该用户可以登录系统" type="checkbox">
            <label for="enabled">是否启用</label>
          </div>
        </BasicField>
        <input id="id" type="hidden">
      </Form>
    </BasicModalContent>
    <template #actions>
      <OkOrCancelModalActions @clickCheck="saveUser" />
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/index'
import BasicModalHeader from '@/components/Modal/header/BasicModalHeader'
import BasicModalContent from '@/components/Modal/content/BasicModalContent'
import OkOrCancelModalActions from '@/components/Modal/actions/OkOrCancelModalActions'
import { deepClone } from '@/utils/tool'
import { FormValidation } from '@/model/FormValidation'
import {
  addUser,
  modifyUser
} from '@/api/userApi'
import { showSuccessToast } from '@/utils/publicUtils'
import Form from '@/components/Form/index'
import LeftLabeledField from '@/components/Form/field/LeftLabeledField'
import LeftLabeledInputField from '@/components/Form/field/LeftLabeledInputField'
import BasicField from '@/components/Form/field/BasicField'
import RoleDropdown from '@/components/RoleDropdown'

export default {
  name: 'SaveUserModal',
  components: { RoleDropdown, BasicField, LeftLabeledInputField, LeftLabeledField, Form, OkOrCancelModalActions, BasicModalContent, BasicModalHeader, Modal },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: this.getDefaultForm(),
      initRole: []
    }
  },
  computed: {
    /**
     * 计算当前是否为编辑模式
     */
    isEdit() {
      return this.form.id !== null
    },
    /**
     * 计算当前是否为新增模式
     */
    isNew() {
      return this.form.id === null
    }
  },
  watch: {
    /**
     * 监听用户的改变
     */
    user() {
      if (!this.user) {
        this.form = this.getDefaultForm()
        return
      }
      const cloneUser = deepClone(this.user)
      cloneUser.createTime = new Date(cloneUser.createTime)
      cloneUser.recentLoginTime = new Date(cloneUser.recentLoginTime)
      this.initRole = cloneUser.roleList.map(role => role.name)
      cloneUser.roleNameList = this.initRole
      delete cloneUser.roleList

      this.form = cloneUser
    }
  },
  methods: {
    /**
     * 保存用户
     */
    async saveUser() {
      if (FormValidation.validateForm('userForm')) {
        const { success } = await (this.isEdit ? modifyUser(this.form) : addUser(this.form))
        if (success) {
          showSuccessToast({
            message: this.isEdit ? '修改用户成功' : '添加用户成功'
          })
          this.$emit('saveUserSuccess')
        }
      }
    },
    /**
     * 获取默认的表单对象
     */
    getDefaultForm() {
      return {
        id: null,
        username: '',
        password: '',
        nickname: '',
        createTime: new Date(),
        recentLoginTime: new Date(),
        roleNameList: [],
        enabled: false
      }
    },
    /**
     * 设置用户表单验证规则
     */
    validateRule() {
      return {
        username: FormValidation.usernameRules,
        nickname: FormValidation.nicknameRules,
        roleNameList: {
          rules: [FormValidation.notEmptyRule('角色')]
        }
      }
    }
  }
}
</script>
