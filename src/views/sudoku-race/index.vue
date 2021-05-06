<template>
  <div class="ui top attached segment">
    <div class="ui two column stackable center aligned grid">
      <div class="column">
        <h4 class="ui horizontal divider header"><i class="edit outline icon" />数独题目</h4>
        <div class="ui center aligned segment">
          <SudokuArea
            :holes-data.sync="raceInformation.holes"
            :illegal-matrix="illegalMatrix"
            :sudoku-data.sync="raceInformation.matrix"
            class="m-padded-tb-large"
          />

          <SudokuSetting ref="sudokuSetting" @clickSudokuLevel="getSudokuFinal" />
        </div>
      </div>
      <div class="column">
        <h4 class="ui horizontal divider header"><i class="info circle icon" />竞赛信息</h4>
        <RaceInformation ref="raceInformation" />
      </div>
    </div>
    <button class="ui bottom attached button primary fluid" @click="publishRace">提交</button>
  </div>
</template>

<script>
import {
  getTwoDimeBoolArray,
  getTwoDimeNumArray,
  showErrorToast,
  showSuccessToast
} from '@/utils/publicUtils'
import SudokuArea from '@/views/sudoku-race/sudokuArea'
import SudokuSetting from '@/views/sudoku-race/sudokuSetting'
import RaceInformation from '@/views/sudoku-race/raceInformation'
import { findSudokuMatrixIllegalGrid } from '@/utils/sudokuUtils'
import { getSudokuFinal } from '@/api/game/gameAPI'
import { publishRace } from '@/api/game/raceAPI'

export default {
  name: 'SudokuRace',
  components: {
    RaceInformation,
    SudokuSetting,
    SudokuArea
  },
  data() {
    return {
      raceInformation: {
        matrix: getTwoDimeNumArray(),
        holes: getTwoDimeBoolArray(),
        sudokuLevelId: null
      },
      illegalMatrix: getTwoDimeNumArray()
    }
  },
  watch: {
    /**
     * 监听数独矩阵的变化
     */
    'raceInformation.matrix'() {
      // 若开启了实时校验，则检查数独矩阵
      if (this.$refs.sudokuSetting.realTimeVerification) {
        this.checkSudokuMatrix()
      }
    }
  },
  methods: {
    /**
     * 获取数独终盘
     */
    async getSudokuFinal(sudokuLevel) {
      const { success, data } = await getSudokuFinal(sudokuLevel.id)
      if (success) {
        this.raceInformation.matrix = data.matrix
        this.raceInformation.holes = data.holes
        this.raceInformation.sudokuLevelId = sudokuLevel.id
        this.clearIllegalMatrix()
      }
    },
    /**
     * 发布数独游戏竞赛
     */
    async publishRace() {
      if (!this.checkSudokuMatrix()) {
        showErrorToast({
          message: '数独矩阵不符合数独规则'
        })
        return
      }
      if (!this.$refs.raceInformation.validaForm()) {
        showErrorToast({
          message: '竞赛信息不符合要求'
        })
        return
      }
      const { success } = await publishRace(Object.assign(this.raceInformation, this.$refs.raceInformation.form))
      if (success) {
        showSuccessToast({
          message: '发布竞赛成功'
        })
      }
    },
    /**
     * 检查数独矩阵是否合法
     * 设置非法的格子的边框为红色
     * @returns {boolean} 合法为true，非法为false
     */
    checkSudokuMatrix() {
      const illegalGrid = findSudokuMatrixIllegalGrid(this.raceInformation.matrix)
      if (illegalGrid.length === 0) {
        this.clearIllegalMatrix()
        return true
      }
      const newIllegalMatrix = getTwoDimeNumArray()
      for (const grid of illegalGrid) {
        const {
          row,
          column
        } = grid
        newIllegalMatrix[row][column] = 1
      }
      this.illegalMatrix = newIllegalMatrix
      return false
    },
    /**
     * 清空非法矩阵数据
     */
    clearIllegalMatrix() {
      this.illegalMatrix = getTwoDimeNumArray()
    }
  }
}
</script>
