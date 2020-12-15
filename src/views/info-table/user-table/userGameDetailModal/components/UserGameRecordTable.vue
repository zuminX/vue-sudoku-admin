<template>
  <Loader :show="loaderShow">
    <table class="ui celled padded table">
      <thead ref="tableHead">
        <tr class="center aligned">
          <th>数独矩阵</th>
          <th>难度</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>提交情况</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in recordData" :key="index" class="center aligned">
          <td>
            <div v-for="(rowData, i) in record.sudokuMatrix" :key="i" class="sudoku-row absolute-center">
              <div v-for="(data, j) in rowData" :key="j" class="mini-number">
                <input
                  :class="[record.sudokuHoles[i][j]?'input-color':'background-color-gray']"
                  :value="data"
                  class="sudoku-number-input"
                  disabled
                  type="text"
                >
              </div>
            </div>
          </td>
          <td>
            {{ record.sudokuLevelName }}
          </td>
          <td>
            {{ formatEmptyData(record.startTime) }}
          </td>
          <td>
            {{ formatEmptyData(record.endTime) }}
          </td>
          <td>
            <i :class="[record.correct ? 'checkmark green' : 'remove red']" class="icon" />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th class="center aligned" colspan="5">
            <PaginationMenu :page-information="pageInformation" @currentChange="updateCurrentPageData" />
          </th>
        </tr>
      </tfoot>
    </table>
  </Loader>
</template>

<script>
import Loader from '@/components/Loader/index'
import { getDefaultPageInformation } from '@/components/PaginationMenu/PaginationMenu'
import { formatEmptyData } from '@/utils/publicUtils'
import {
  convertToSudokuHoles,
  convertToSudokuMatrix
} from '@/utils/sudokuUtils'
import {
  getHistoryGameRecordById
} from '@/api/userApi'
import PaginationMenu from '@/components/PaginationMenu/index'

export default {
  name: 'UserGameRecordTable',
  components: { PaginationMenu, Loader },
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pageInformation: getDefaultPageInformation(),
      recordData: [],
      loaderShow: false
    }
  },
  watch: {
    /**
     * 监听用户ID的改变
     */
    userId() {
      if (this.userId && this.userId !== 0) {
        this.updateCurrentPageData()
      }
    }
  },
  methods: {
    formatEmptyData,
    /**
     * 更新当前页的数据
     * @param page 页数
     * @param pageSize 每条条数
     */
    async updateCurrentPageData(page = 1, pageSize = 5) {
      this.loaderShow = true
      const { success, data } = await getHistoryGameRecordById(this.userId, page, pageSize)
      this.loaderShow = false
      if (success) {
        this.recordData = this.convertGameRecordToMatrix(data.list)
        this.pageInformation = data.pageInformation
        this.scrollToHeader()
      }
    },
    /**
     * 转换游戏记录中的数独矩阵和空缺字符串为二维数组
     * @param recordData 游戏记录数据
     * @returns {Object} 处理后的游戏记录数据
     */
    convertGameRecordToMatrix(recordData) {
      for (let i = 0, size = recordData.length; i < size; i++) {
        recordData[i].sudokuMatrix = convertToSudokuMatrix(recordData[i].sudokuMatrix)
        recordData[i].sudokuHoles = convertToSudokuHoles(recordData[i].sudokuHoles)
      }
      return recordData
    },
    /**
     * 滚动到头部
     */
    scrollToHeader() {
      this.$refs.tableHead.scrollIntoView()
    }
  }
}
</script>

<style scoped>
/*缩小的数独数字*/
.mini-number {
  width: 25px;
  height: 25px;
  float: left;
}

/*用户输入数独框的颜色*/
.input-color {
  background-color: #c4e3ff;
}
</style>
