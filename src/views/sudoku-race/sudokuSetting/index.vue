<template>
  <div class="ui two column grid centered">
    <div class="ui toggle checkbox column tip-popup" data-content="实时校验数独矩阵的合法性">
      <input id="realTimeVerificationCheckbox" v-model="realTimeVerification" type="checkbox">
      <label for="realTimeVerificationCheckbox">实时校验</label>
    </div>
    <div class="column">
      <div class="ui selection dropdown">
        <i class="dropdown icon" />
        <div class="default text">根据难度随机生成</div>
        <div class="scrollhint menu">
          <div
            v-for="(level, index) in sudokuLevelList"
            :key="index"
            class="item"
            @click="$emit('clickSudokuLevel', level.level)"
          >
            {{ level.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { constStore } from '@/store/constStore'

export default {
  name: 'SudokuSetting',
  data() {
    return {
      sudokuLevelList: [],
      realTimeVerification: false
    }
  },
  mounted() {
    this.initSudokuLevels()
    this.initDropdown()
  },
  methods: {
    /**
     * 初始化数独难度等级
     */
    async initSudokuLevels() {
      this.sudokuLevelList = await constStore.getSudokuLevelList()
    },
    /**
     * 初始化下拉选
     */
    initDropdown() {
      $(`.ui.dropdown`).dropdown()
    }
  }
}
</script>
