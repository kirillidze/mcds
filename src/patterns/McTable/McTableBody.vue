<template>
  <tbody class="mc-table-body">
    <McTableRow v-for="(item, index) in items" :key="index" :item="item" :headers="headers">
      <slot></slot>
    </McTableRow>
  </tbody>
</template>

<script>
import McTableRow from "./McTableRow"
export default {
  name: "McTableBody",
  components: { McTableRow },
  props: {
    headers: {
      type: [Array, Object],
      default: null,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        // [`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table-body {
  $block-name: &;
}
</style>
