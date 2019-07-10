<template>
  <tr class="mc-table-row">
    <McTableCell v-for="cell in headers" :key="cell.key">
      <slot :name="cell.key">
        {{ _get(item, cell.key) }}
      </slot>
    </McTableCell>
  </tr>
</template>

<script>
import _get from "lodash/get"
import McTableCell from "./McTableCell"
export default {
  name: "McTableRow",
  components: { McTableCell },
  props: {
    headers: {
      type: [Array, Object],
      default: null,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  methods: {
    _get(...args) {
      return _get(...args)
    },
  },
}
</script>

<style lang="scss">
.mc-table-row {
  $block-name: &;
}
</style>
