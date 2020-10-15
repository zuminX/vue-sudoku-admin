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
            {{ overviewGameInformation.averageSpendTime }}
          </div>
          <div class="label">
            各模式的平均用时(秒)
          </div>
        </div>
        <div class="ui statistic">
          <div class="value">
            {{ overviewGameInformation.minSpendTime }}
          </div>
          <div class="label">
            最短用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ overviewGameInformation.maxSpendTime }}
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
            {{ information.averageSpendTime }}
          </div>
          <div class="label">
            平均用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ information.minSpendTime }}
          </div>
          <div class="label">
            最短用时(秒)
          </div>
        </div>
        <div class="statistic">
          <div class="value">
            {{ information.maxSpendTime }}
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
  formatShowMS,
  initMenuItem
} from '@/utils/publicUtils'
import {
  getUserGameInformation,
  getUserGameInformationById
} from '@/api/userApi'

import('jquery-address')

export default {
  name: 'UserGameInformationList',
  props: {
    userId: {
      type: Number,
      default: null
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
    userId() {
      if (this.userId && this.userId !== 0) {
        this.initGameInformation()
      }
    }
  },
  updated() {
    initMenuItem('.menu .item')
  },
  methods: {
    /**
     * 初始化用户游戏信息
     */
    async initGameInformation() {
      const { success, data } = await this.requestUserGameInformation()
      if (success) {
        this.overviewGameInformation = this.calculateOverviewGameInformation(data)
        this.gameInformationList = this.formatSpendTime(data)
      }
    },
    async requestUserGameInformation() {
      return this.userId ? getUserGameInformationById(this.userId) : getUserGameInformation()
    },
    /**
     * 根据各模式的游戏信息，计算出总的游戏信息
     */
    calculateOverviewGameInformation(data) {
      const total = this.calculateTotal(data)
      const correctNumber = this.calculateCorrectNumber(data)
      const averageSpendTime = formatShowMS(this.calculateAverageSpendTime(data))
      const minSpendTime = formatShowMS(this.calculateMinSpendTime(data))
      const maxSpendTime = formatShowMS(this.calculateMaxSpendTime(data))
      return { total, correctNumber, averageSpendTime, minSpendTime, maxSpendTime }
    },
    /**
     * 格式化花费的时间
     */
    formatSpendTime(data) {
      for (const item of data) {
        item.averageSpendTime = formatShowMS(item.averageSpendTime)
        item.minSpendTime = formatShowMS(item.minSpendTime)
        item.maxSpendTime = formatShowMS(item.maxSpendTime)
      }
      return data
    },
    calculateAverageSpendTime(data) {
      const averageSpendTimeData = data.map(item => item.averageSpendTime).filter(averageSpendTime => averageSpendTime !== null)
      const correctNum = averageSpendTimeData.length
      if (correctNum === 0) {
        return null
      }
      const times = averageSpendTimeData.reduce((sum, current) => sum + current, 0)
      return times / correctNum
    },
    calculateMinSpendTime(data) {
      const minSpendTimeData = data.map(item => item.minSpendTime).filter(minSpendTime => minSpendTime !== null)
      return Math.min.apply(null, minSpendTimeData)
    },
    calculateMaxSpendTime(data) {
      const maxSpendTimeData = data.map(item => item.maxSpendTime).filter(maxSpendTime => maxSpendTime !== null)
      return Math.max.apply(null, maxSpendTimeData)
    },
    calculateTotal(data) {
      return data.map(item => item.total).reduce((sum, current) => sum + current, 0)
    },
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
