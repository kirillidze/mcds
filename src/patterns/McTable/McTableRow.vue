<template>
  <tr class="mc-table-row">
    <slot>
      <McTableCell :size="size" :item="cell" v-for="cell in headers" :key="cell.key">
        <slot :name="cell.key">
          <McTitle :text-align="cell.textAlign || textAlign" tagName="span">
            {{ _get(item, cell.key) }}
          </McTitle>
        </slot>
      </McTableCell>
    </slot>
  </tr>
</template>

<script>
import _get from "lodash/get"
import McTableCell from "./McTableCell"
import McTitle from "../../elements/McTitle"
export default {
  name: "McTableRow",
  components: { McTitle, McTableCell },
  props: {
    headers: {
      type: [Array, Object],
      default: null,
    },
    item: {
      type: Object,
      default: null,
    },
    size: {
      type: String,
      default: "m",
    },
    /**
     *  Позиция текста:
     *  `left, center, right`
     */
    textAlign: {
      type: String,
      default: "right",
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

  background-color: $color-white;
}
</style>
