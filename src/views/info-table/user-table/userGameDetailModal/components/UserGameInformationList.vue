<template>
  <div>
    <div class="ui top attached tabular menu">
      <a class="item active" data-tab="-1">总览</a>
      <a v-for="(information,index) in gameInformationList" :key="index" :data-tab="index" class="item">
        {{ information.sudokuLevelName }}
      </a>
    </div>
    <div class="ui bottom attached tab segment active" data-tab="-1">
      <div class="ui five statistics">
        <div class="statistic">
          <div class="value">
            {{ overviewGameInformation.total }}
          </div>
          <div class="label">
            总局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ overviewGameInformation.correctNumber }}
          </div>
          <div class="label">
            提交正确的局数(次)
          </div>
        </div>
        <div class="ui statistic">
          <div class="value">
            {{ formatEmptyData(overviewGameInformation.averageSpendTime) }}
          </div>
          <div class="label">
            各模式的平均用时(秒)
          </div>
        </div>
        <div class="ui statistic">
          <div class="value">
            {{ formatEmptyData(overviewGameInformation.minSpendTime) }}
          </div>
          <div class="label">
            最短用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ formatEmptyData(overviewGameInformation.maxSpendTime) }}
          </div>
          <div class="label">
            最长用时(秒)
          </div>
        </div>
      </div>
    </div>
    <div v-for="(information,index) in gameInformationList" :key="index" :data-tab="index" class="ui bottom attached tab segment">
      <div class="ui five statistics">
        <div class="statistic">
          <div class="value">
            {{ information.total }}
          </div>
          <div class="label">
            局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ information.correctNumber }}
          </div>
          <div class="label">
            提交正确的局数(次)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ formatEmptyData(information.averageSpendTime) }}
          </div>
          <div class="label">
            平均用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ formatEmptyData(information.minSpendTime) }}
          </div>
          <div class="label">
            最短用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ formatEmptyData(information.maxSpendTime) }}
          </div>
          <div class="label">
            最长用时(秒)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  formatEmptyData,
  initMenuItem
} from '@/utils/publicUtils'
import {
  getUserGameInformationById
} from '@/api/userApi'

import('jquery-address')

export default {
  name: 'UserGameInformationList',
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      gameInformationList: [],
      overviewGameInformation: {
        total: 0,
        correctNumber: 0,
        averageSpendTime: null,
        minSpendTime: null,
        maxSpendTime: null
      }
    }
  },
  watch: {
    /**
     * 监听用户ID的改变
     */
    userId() {
      if (this.userId && this.userId !== 0) {
        this.initGameInformation()
      }
    }
  },
  /**
   * 在数据更改后，初始化菜单项
   */
  updated() {
    initMenuItem('.menu .item')
  },
  methods: {
    formatEmptyData,
    /**
     * 初始化用户游戏信息
     */
    async initGameInformation() {
      const { success, data } = await getUserGameInformationById(this.userId)
      if (success) {
        this.overviewGameInformation = this.calculateOverviewGameInformation(data)
        this.gameInformationList = data
      }
    },
    /**
     * 根据各模式的游戏信息，计算出总的游戏信息
     *
     * @param data 游戏信息
     * @return {*} 总体游戏信息
     */
    calculateOverviewGameInformation(data) {
      const total = this.calculateTotal(data)
      const correctNumber = this.calculateCorrectNumber(data)
      const averageSpendTime = this.calculateAverageSpendTime(data)
      const minSpendTime = this.calculateMinSpendTime(data)
      const maxSpendTime = this.calculateMaxSpendTime(data)
      return { total, correctNumber, averageSpendTime, minSpendTime, maxSpendTime }
    },
    /**
     * 计算平均花费时间
     *
     * @param data 游戏信息
     * @returns {null|number} 若回答正确数为零，则返回null；否则返回平均花费时间
     */
    calculateAverageSpendTime(data) {
      const averageSpendTimeData = data.map(item => item.averageSpendTime).filter(averageSpendTime => averageSpendTime !== null)
      const correctNum = averageSpendTimeData.length
      if (correctNum === 0) {
        return null
      }
      const times = averageSpendTimeData.reduce((sum, current) => sum + current, 0)
      return times / correctNum
    },
    /**
     * 计算最少花费时间
     *
     * @param data 游戏信息
     * @returns {number} 最少花费时间
     */
    calculateMinSpendTime(data) {
      const minSpendTimeData = data.map(item => item.minSpendTime).filter(minSpendTime => minSpendTime !== null)
      return minSpendTimeData.length === 0 ? null : Math.min.apply(null, minSpendTimeData)
    },
    /**
     * 计算最多花费时间
     *
     * @param data 游戏信息
     * @returns {number} 最多花费时间
     */
    calculateMaxSpendTime(data) {
      const maxSpendTimeData = data.map(item => item.maxSpendTime).filter(maxSpendTime => maxSpendTime !== null)
      return maxSpendTimeData.length === 0 ? null : Math.max.apply(null, maxSpendTimeData)
    },
    /**
     * 计算游戏总数
     *
     * @param data 游戏信息
     * @returns {number} 游戏总数
     */
    calculateTotal(data) {
      return data.map(item => item.total).reduce((sum, current) => sum + current, 0)
    },
    /**
     * 计算回答正确数
     * @param data 游戏信息
     * @returns {number} 回答正确数
     */
    calculateCorrectNumber(data) {
      return data.map(item => item.correctNumber).reduce((sum, current) => sum + current, 0)
    }
  }
}
</script>

<style scoped>
.ui.attached.segment {
  margin: 0 !important;
  width: calc(100%) !important;
}
</style>
