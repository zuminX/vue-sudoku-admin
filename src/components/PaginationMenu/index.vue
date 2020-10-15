<template>
  <div class="ui pagination menu">
    <el-pagination
      :current-page.sync="currentPage"
      :page-count="totalPage"
      :page-size="pageSize"
      :page-sizes="[1, 5, 10, 20]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="$emit('currentChange', currentPage, pageSize)"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'PaginationMenu',
  props: {
    pageInformation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totalPage: 0
    }
  },
  watch: {
    pageInformation() {
      const information = this.pageInformation
      if (information) {
        this.currentPage = information.currentPage
        this.pageSize = information.pageSize
        this.totalPage = information.totalPage
      }
    }
  },
  methods: {
    /**
     * 处理每页条数的改变
     * @param pageSize 每页条数
     */
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.$emit('currentChange', this.currentPage, this.pageSize)
    }
  }
}
</script>

<style scoped>

</style>
