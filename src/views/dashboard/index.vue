<template>
  <div class="dashboard-editor-container">

    <div class="dashboard-text">欢迎您：{{ user.username }}</div>
    <PanelGroup @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChart :chart-data="selectChartData" />
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from '@/views/dashboard/components/PanelGroup'
import LineChart from '@/views/dashboard/components/LineChart'
import { getRecentStatisticsUserData } from '@/api/admin/statisticsUserAPI'
import { getRecentStatisticsGameTotal } from '@/api/game/statisticsGameAPI'

export default {
  name: 'Dashboard',
  components: { LineChart, PanelGroup },
  data() {
    return {
      selectChartData: {},
      chartData: {
        newUserTotal: {
          daily: [],
          eachMonth: []
        },
        activeUserTotal: {
          daily: [],
          eachMonth: []
        },
        sudokuGameTotal: {
          daily: [],
          eachMonth: []
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  async mounted() {
    // 获取统计信息
    const [userDailyData, userEachMonthData, gameDailyTotal, gameEachMonthTotal] = await
    Promise.all([getRecentStatisticsUserData('日'),
      getRecentStatisticsUserData('月'), getRecentStatisticsGameTotal('日'), getRecentStatisticsGameTotal('月')])
    // 设置统计信息
    this.setUserStatisticsData(userDailyData, 'daily')
    this.setUserStatisticsData(userEachMonthData, 'eachMonth')
    this.setGameStatisticsData(gameDailyTotal, 'daily')
    this.setGameStatisticsData(gameEachMonthTotal, 'eachMonth')
    // 默认选择第一项数据
    this.handleSetLineChartData('newUserTotal')
  },
  methods: {
    /**
     * 设置折线图的数据
     */
    handleSetLineChartData(type) {
      this.selectChartData = this.chartData[type]
    },
    /**
     * 设置用户统计数据
     * @param  requestData 请求的数据
     * @param dateType 统计日期类型
     */
    setUserStatisticsData(requestData, dateType) {
      if (requestData.success) {
        const userDataList = requestData.data
        this.chartData.newUserTotal[dateType] = userDataList.map(({ newUserTotal }) => newUserTotal)
        this.chartData.activeUserTotal[dateType] = userDataList.map(({ activeUserTotal }) => activeUserTotal)
      }
    },
    /**
     * 设置游戏统计数据
     * @param  requestData 请求的数据
     * @param dateType 统计日期类型
     */
    setGameStatisticsData(requestData, dateType) {
      if (requestData.success) {
        this.chartData.sudokuGameTotal[dateType] = requestData.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .dashboard-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
