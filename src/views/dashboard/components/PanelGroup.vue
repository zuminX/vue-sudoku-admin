<template>
  <el-row :gutter="40" class="panel-group">
    <el-col
      v-for="(cardData, key) in cardDataList"
      :key="key"
      :lg="6"
      :sm="12"
      :xs="12"
      class="card-panel-col"
    >
      <div
        :class="{'select-border-color' : cardData.dataName===selectDataName}"
        class="card-panel"
        @click="handleSetLineChartData(cardData.dataName)"
      >
        <div :class="'icon-'+cardData.dataName" class="card-panel-icon-wrapper">
          <svg-icon :icon-class="cardData.iconClass" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ cardData.description }}
          </div>
          <count-to
            v-if="totals[cardData.dataName] !== -1"
            :duration="2600"
            :end-val="totals[cardData.dataName]"
            :start-val="0"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import {
  getGameTotal,
  getUserTotal
} from '@/api/statisticsApi'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      cardDataList: [{
        dataName: 'newUserTotal',
        iconClass: 'peoples',
        description: '用户总数'
      }, {
        dataName: 'sudokuGameTotal',
        iconClass: 'chart',
        description: '数据游戏总数'
      }, {
        dataName: 'activeUserTotal',
        iconClass: 'peoples',
        description: '活跃用户数'
      }],
      selectDataName: 'newUserTotal',
      totals: {
        newUserTotal: 0,
        sudokuGameTotal: 0,
        activeUserTotal: -1
      }
    }
  },
  async mounted() {
    const [requestUserTotal, requestGameTotal] = await Promise.all([getUserTotal(), getGameTotal()])
    if (requestUserTotal.success) {
      this.totals.newUserTotal = requestUserTotal.data
    }
    if (requestGameTotal.success) {
      this.totals.sudokuGameTotal = requestGameTotal.data
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.selectDataName = type
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-border-color {
  border-color: #62c1fc !important;
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border: 1px solid rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-newUserTotal {
        background: #40c9c6;
      }

      .icon-sudokuGameTotal {
        background: #36a3f7;
      }

      .icon-activeUserTotal {
        background: #f4516c;
      }
    }

    .icon-newUserTotal {
      color: #40c9c6;
    }

    .icon-sudokuGameTotal {
      color: #36a3f7;
    }

    .icon-activeUserTotal {
      color: #f4516c;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
