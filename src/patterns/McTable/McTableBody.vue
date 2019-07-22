<template>
  <tbody class="mc-table-body">
    <McTableRow
      :size="size"
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :headers="headers"
      :checkable="checkable"
      :checked-items="checkedItems"
      :check-by="checkBy"
      @check="value => handleCheck(item, value)"
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
    checkable: {
      type: Boolean,
      default: false,
    },
    checkedItems: {
      type: Array,
      default() {
        return []
      },
    },
    checkBy: {
      type: String,
      default: "id",
    },
  },
  methods: {
    handleCheck(item, value) {
      this.$emit("check", { item, value })
    },
  },
}
</script>

<style lang="scss">
.mc-table-body {
  $block-name: &;

  border-left: 1px solid $color-gray-light;
  border-right: 1px solid $color-gray-light;
}
</style>
