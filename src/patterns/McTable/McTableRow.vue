<template>
  <tr class="mc-table-row">
    <slot>
      <McTableCell
        :checkable="index === 0 && checkable"
        :size="size"
        v-for="(cell, index) in headers"
        :key="cell.key"
      >
        <McFieldCheckbox
          v-if="index === 0 && checkable"
          :value="isChecked"
          @input="handleCheckInput"
        />
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
import McFieldCheckbox from "../../elements/McField/McFieldCheckbox"
export default {
  name: "McTableRow",
  components: { McTitle, McTableCell, McFieldCheckbox },
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
  computed: {
    isChecked() {
      return !!this.checkedItems.find(i => i[this.checkBy] === this.item[this.checkBy])
    },
  },
  methods: {
    _get(...args) {
      return _get(...args)
    },
    handleCheckInput(value) {
      this.$emit("check", value)
    },
  },
}
</script>

<style lang="scss">
.mc-table-row {
  $block-name: &;

  background-color: $color-white;
  position: relative;
}
</style>
