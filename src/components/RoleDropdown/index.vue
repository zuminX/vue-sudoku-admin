<template>
  <div :id="id" class="ui clearable multiple selection dropdown">
    <input name="roleNameList" type="hidden" @change="changeRoleNameList($event.target.value)">
    <i class="dropdown icon" />
    <div class="default text">选择角色</div>
    <div class="menu">
      <div
        v-for="(role, i) in roleList"
        :key="i"
        :class="[disabledAdmin && roleNameHasAdmin(role.name) ? 'disabled' : '']"
        :data-text="role.nameZh"
        :data-value="role.name"
        class="item"
      >
        {{ role.nameZh }}
      </div>
    </div>
  </div>
</template>

<script>
import { roleNameHasAdmin } from '@/utils/coreUtils'
import { constStore } from '@/store/constStore'

export default {
  name: 'RoleDropdown',
  props: {
    roleNameList: {
      type: Array,
      required: true
    },
    initRole: {
      type: Array,
      default() {
        return []
      }
    },
    disabledAdmin: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      roleList: [],
      id: `RoleDropdown_${this._uid}`
    }
  },
  watch: {
    /**
     * 初始化选择的角色
     */
    initRole() {
      this.initRoleDropdown()
    }
  },
  async mounted() {
    this.roleList = await constStore.getRoleNameList()
    this.initRoleDropdown()
  },
  methods: {
    roleNameHasAdmin,
    /**
     * 初始化角色下列选
     */
    initRoleDropdown() {
      $(`#${this.id}`).dropdown('set selected', this.initRole)
    },
    /**
     * 改变角色名列表
     * @param value 以,分隔的角色名
     */
    changeRoleNameList(value) {
      this.$emit('update:roleNameList', value.split(','))
    }
  }
}
</script>
