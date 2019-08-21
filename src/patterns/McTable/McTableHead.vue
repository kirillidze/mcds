<template>
  <thead class="mc-table-head">
    <McTableRow :optimize-visibility="false">
      <McTableHeadCell
        :size="size"
        :item="item"
        v-for="item in items"
        v-if="item.key"
        :key="item.key"
        :sortable="sortable"
        :sorted-by="sortedBy"
        :sorted-descending="sortedDescending"
        :tooltip="tooltip"
        :tooltip-content="item.tooltip_content"
        @click="() => handleCellClick(item)"
      />
    </McTableRow>
  </thead>
</template>

<script>
import McTableCell from "./McTableCell"
import McTableRow from "./McTableRow"
import McTitle from "../../elements/McTitle"
import McSvgIcon from "../../elements/McSvgIcon"
import McTableHeadCell from "./McTableHeadCell"

export default {
  name: "McTableHead",
  components: { McTableHeadCell, McSvgIcon, McTitle, McTableRow, McTableCell },
  props: {
    items: {
      type: [Array, Object],
      required: true,
    },
    sortable: {
      type: [Boolean, Array],
      default: false,
    },
    size: {
      type: String,
      default: "m",
    },
    sortedBy: {
      type: String,
      required: false,
    },
    sortedDescending: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: [Boolean, Array],
      required: false,
    },
  },
  methods: {
    handleCellClick(item) {
      this.$emit("click", item)
    },
  },
}
</script>

<style lang="scss">
.mc-table-head {
  $block-name: &;

  border-left: 1px solid $color-border;
  border-right: 1px solid $color-border;
}
</style>
