<template>
  <McTableCell
    :size="size"
    :item="item"
    tag="th"
    :class="classes"
    @click.native="handleClick(item)"
  >
    <McTitle :text-align="textAlign" tagName="span">
      <McSvgIcon
        v-if="isSortable"
        slot="icon-prepend"
        :name="!isSorted ? 'unfold_more' : iconName"
      ></McSvgIcon>
      {{ item.title }}
    </McTitle>
  </McTableCell>
</template>

<script>
import McTitle from "../../elements/McTitle"
import McTableCell from "./McTableCell"
import McSvgIcon from "../../elements/McSvgIcon"
export default {
  name: "McTableHeadCell",
  props: {
    sortedBy: {
      type: String,
      required: false,
    },
    sortedDescending: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
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
  },
  components: { McSvgIcon, McTableCell, McTitle },
  computed: {
    classes() {
      return {
        "mc-table-head-cell--sortable": this.isSortable,
      }
    },
    textAlign() {
      return this.item.textAlign || "right"
    },
    isSorted() {
      console.log(this.item.key === this.sortedBy)
      return this.item.key === this.sortedBy
    },
    isSortable() {
      return this.sortable && (this.sortable === true || this.sortable.includes(this.item.key))
    },
    iconName() {
      return this.sortedDescending ? "arrow_downward" : "arrow_upward"
    },
  },
  methods: {
    handleClick(item) {
      this.$emit("click", item)
    },
  },
}
</script>

<style lang="scss">
.mc-table-head-cell {
  $block-name: &;

  &--sortable {
    cursor: pointer;
  }
}
</style>
