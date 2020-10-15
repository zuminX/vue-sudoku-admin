<template>
  <Modal modal-id="saveUserModal" form-id="userForm">
    <template v-slot:header>
      <BasicModalHeader class="blue">
        修改用户
      </BasicModalHeader>
    </template>
    <BasicModalContent>
      <Form form-id="userForm" :validate-rule="validateRule()">
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              用户名
            </div>
            <input id="username" v-model="form.username" name="name" type="text">
          </div>
        </div>
        <div v-if="isNew" class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              密码
            </div>
            <input id="password" v-model="form.password" name="password" type="text">
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              昵称
            </div>
            <input id="nickname" v-model="form.nickname" name="nickname" type="text">
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              创建时间
            </div>
            <el-date-picker
              v-model="form.createTime"
              placeholder="选择创建的日期时间"
              type="datetime"
            />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <div class="ui label">
              最近登录时间
            </div>
            <el-date-picker
              v-model="form.recentLoginTime"
              placeholder="选择用户最近登录系统的时间"
              type="datetime"
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
                  :class="[roleNameHasAdmin(role.name) ? 'disabled' : '']"
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
        <div class="field">
          <div class="ui toggle checkbox m-padded-tb tip-popup">
            <input id="enabled" v-model="form.enabled" data-content="是否让该用户可以登录系统" type="checkbox">
            <label for="enabled">是否启用</label>
          </div>
        </div>
        <input id="id" type="hidden">
      </Form>
    </BasicModalContent>
    <template v-slot:actions>
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
import {
  constStore
} from '@/store/constStore'
import { roleNameHasAdmin } from '@/utils/coreUtils'
import Form from '@/components/Form/index'

export default {
  name: 'SaveUserModal',
  components: { Form, OkOrCancelModalActions, BasicModalContent, BasicModalHeader, Modal },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: this.getDefaultForm(),
      roleList: []
    }
  },
  computed: {
    isEdit() {
      return this.form.id !== null
    },
    isNew() {
      return this.form.id === null
    }
  },
  watch: {
    user() {
      if (this.user) {
        this.form = deepClone(this.user)
        this.form.createTime = new Date(this.form.createTime)
        this.form.recentLoginTime = new Date(this.form.recentLoginTime)
        const roleNameList = this.form.roleList.map(role => role.name)
        this.initRoleDropdown(roleNameList)
        delete this.form.roleList
      } else {
        this.form = this.getDefaultForm()
      }
    }
  },
  async mounted() {
    this.roleList = await constStore.getRoleNameList()
  },
  methods: {
    roleNameHasAdmin,
    async saveUser() {
      if (FormValidation.validateForm('userForm')) {
        const userForm = deepClone(this.form)
        const { success } = await (this.isEdit ? modifyUser(userForm) : addUser(userForm))
        if (success) {
          showSuccessToast({
            message: this.isEdit ? '修改用户成功' : '添加用户成功'
          })
        }
      }
    },
    changeRoleNameList(value) {
      this.form.roleNameList = value.split(',')
    },
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
    initRoleDropdown(roleNameList) {
      $('#roleDropdown').dropdown('set selected', roleNameList)
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
