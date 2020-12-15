<template>
  <div>
    <div v-for="(rowData, i) in sudokuData" :key="i" class="sudoku-row absolute-center">
      <div
        v-for="(data, j) in rowData"
        :key="j"
        class="number"
        @click="showSudokuNumber(i, j)"
      >
        <input
          :id="inputId(i, j)"
          :class="[!holesData[i][j]?style.topicBackgroundColor:'',
                   illegalMatrix[i][j]===1?style.errorBorderColor:'']"
          class="sudoku-number-input"
          :value="data"
          type="number"
          disabled="true"
        >
      </div>
    </div>

    <SudokuInputArea id="sudokuInputArea" @selectNumber="selectSudokuNumber" />
  </div>
</template>

<script>
import { ClickPosition } from '@/model/ClickPosition'
import {
  getTwoDimeNumArray
} from '@/utils/publicUtils'
import { SudokuMatrixGrid } from '@/model/SudokuMatrixGrid'
import { responseSetTwoDimensionalArray } from '@/utils/coreUtils'
import SudokuInputArea from '@/views/sudoku-race/sudokuArea/components/SudokuInputArea'

export default {
  name: 'SudokuArea',
  components: { SudokuInputArea },
  props: {
    sudokuData: {
      type: Array,
      required: true
    },
    holesData: {
      type: Array,
      required: true
    },
    illegalMatrix: {
      type: Array,
      default: getTwoDimeNumArray()
    }
  },
  data() {
    return {
      clickPosition: new ClickPosition(),
      style: {
        topicBackgroundColor: 'background-color-gray',
        errorBorderColor: 'border-color-red'
      }
    }
  },
  methods: {
    /**
     * 隐藏数独选择框
     */
    hideSudokuNumber() {
      if (ClickPosition.isNotInit(this.clickPosition)) {
        const { row, column } = this.clickPosition
        // 隐藏该位置对应的数独选择框
        $(`#numberInput${row}${column}`).popup('hide')
      }
    },
    /**
     * 从数独选择框中选择数字
     * @param number 选择的数字
     */
    selectSudokuNumber(number) {
      const { row, column } = this.clickPosition
      if (number === null) {
        responseSetTwoDimensionalArray(this.holesData, new SudokuMatrixGrid(row, column, !this.holesData[row][column]))
      } else {
        responseSetTwoDimensionalArray(this.sudokuData, new SudokuMatrixGrid(row, column, number))
      }
      this.hideSudokuNumber()
    },
    /**
     * 显示数独选择框
     * @param i 行
     * @param j 列
     */
    showSudokuNumber(i, j) {
      this.hideSudokuNumber()
      this.showSudokuInputArea(i, j)
      this.clickPosition = new ClickPosition(i, j)
    },
    /**
     * 在底部中间显示数独选择框
     * @param i 行
     * @param j 列
     */
    showSudokuInputArea(i, j) {
      const thisNode = $(`#${this.inputId(i, j)}`)
      thisNode.popup({
        popup: $('#sudokuInputArea'),
        position: 'bottom center',
        on: 'click'
      })
      thisNode.popup('toggle')
    },
    /**
     * 获取输入框的ID
     * @param i 行
     * @param j 列
     * @returns {string} ID
     */
    inputId(i, j) {
      return `numberInput${i}${j}`
    }
  }
}
</script>

<style scoped>
.sudoku-number-input:hover {
  background: #92cffd !important;
}
</style>
