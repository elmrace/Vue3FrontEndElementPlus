<template>
  <el-table v-loading="loading" :data="tableData" style="width: 100%">
    <slot name="columns" />
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
})
</script>
