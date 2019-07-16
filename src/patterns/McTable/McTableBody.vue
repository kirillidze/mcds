<template>
  <tbody class="mc-table-body">
    <McTableRow
      :size="size"
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :headers="headers"
    >
      <slot v-for="header in headers" :name="header.key" :slot="header.key" :item="item" />
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
    size: {
      type: String,
      default: "m",
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

  border: 1px solid $color-gray-light;
}
</style>
