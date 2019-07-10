<template>
  <tbody class="mc-table-body">
    <McTableRow v-for="(item, index) in items" :key="index" :item="item" :headers="headers">
      <slot></slot>
      <slot
        v-for="header in headers"
        :name="`cell-${header.key}`"
        :slot="`cell-${header.key}`"
        :item="item"
      />
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
  mounted() {
    console.log("body", this.$slots)
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
