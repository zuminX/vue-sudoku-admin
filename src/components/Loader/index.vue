<template>
  <div :id="loaderId">
    <div class="ui inverted dimmer">
      <div class="ui text loader">加载中</div>
    </div>
    <slot />
  </div>
</template>

<script>
import { createUniqueString } from '@/utils/tool'

export default {
  name: 'Loader',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loaderId: this.createUniqueString()
    }
  },
  watch: {
    show() {
      this.changeItemListDimmer()
    }
  },
  methods: {
    createUniqueString,
    /**
       * 改变列表项的调光器的显示状态
       */
    changeItemListDimmer() {
      $(`#${this.loaderId}`).dimmer(this.show ? 'show' : 'hide')
    }
  }
}
</script>

<style scoped>

</style>
