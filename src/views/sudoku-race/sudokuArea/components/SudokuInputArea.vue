<template>
  <div class="ui popup transition hidden sudoku-number-area">
    <div v-for="(rowData, i) in sudokuNumber" :key="i" class="sudoku-row">
      <div v-for="(data, j) in rowData" :key="j" class="number" @click="$emit('selectNumber', data)">
        <input
          :value="data"
          class="sudoku-number-input hover-sudoku-number m-opacity-big background-color-blue"
          disabled
          type="text"
        >
      </div>
    </div>
    <div class="sudoku-row">
      <button class="ui icon button basic fluid blue" @click="$emit('selectNumber', null)">
        <i class="exchange alternate icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { getSudokuArray } from '@/utils/sudokuUtils'

export default {
  name: 'SudokuInputArea',
  data() {
    return {
      sudokuNumber: getSudokuArray()
    }
  }
}
</script>

<style scoped>
/*数独数字区域*/
.sudoku-number-area {
  padding: 0 !important;
  border: none !important;
}

/*悬停数独数字透明度*/
.hover-sudoku-number:hover {
  opacity: 1 !important;
}
</style>
