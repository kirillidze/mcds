<template>
  <vxe-table-column class="mc-virtual-table-col" v-bind="attrs" v-on="$listeners">
    <template v-slot="{ row }">
      <slot :row="row">
        <mc-title :text-align="textAlign" :ellipsis="ellipsis" class="mc-virtual-table-col__title">
          {{ row[defaultTitle] }}
        </mc-title>
      </slot>
    </template>
    <template v-slot:header="{ column }">
      <slot name="header" :column="column">
        <mc-title :text-align="textAlign" :ellipsis="true" class="mc-virtual-table-col__title">
          {{ column.title }}
          <mc-svg-icon v-if="isSortable" slot="icon-prepend" :name="getSortIcon(column)" />
        </mc-title>
      </slot>
    </template>
    <template v-slot:footer="{ columnIndex }">
      <template v-if="!columnIndex">
        <mc-title
          v-if="!provideData.canShowLoader"
          :ellipsis="true"
          class="mc-virtual-table-col__title"
        >
          {{ provideData.placeholders.all_loaded }}
        </mc-title>
        <span
          v-if="provideData.canShowLoader"
          class="mc-virtual-table-col__loader"
          ref="loader"
        ></span>
      </template>
    </template>
  </vxe-table-column>
</template>

<script>
import _has from "lodash/has"
import McTitle from "../../elements/McTitle"
import McSvgIcon from "../../elements/McSvgIcon"

export default {
  name: "McVirtualTableCol",
  components: {
    McTitle,
    McSvgIcon,
  },
  inject: ["provideData"],
  props: {
    hasBorder: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    attrs() {
      const borderAttrs = {
        "class-name": "mc-virtual-table-col--border-right",
        "header-class-name": "mc-virtual-table-col--border-right",
        "footer-class-name": this.handleFooterClassName,
      }
      return {
        ...(this.hasBorder && !this.provideData.cardIsOpen ? borderAttrs : {}),
        ...this.$attrs,
      }
    },
    defaultTitle() {
      return this.$attrs.field
    },
    textAlign() {
      return this.$attrs.align || "left"
    },
    isSortable() {
      return this.$attrs.hasOwnProperty("sortable")
    },
    ellipsis() {
      if (!this.$attrs.hasOwnProperty("show-overflow")) return true
      return this.$attrs["show-overflow"] !== false
    },
  },
  methods: {
    getSortIcon(column) {
      if (!this.provideData.nativeSort && _has(this.$route, "query")) {
        if (this.$route.query.sort_by && column.property === this.$route.query.sort_by) {
          return this.$route.query.sort_direction === "desc" ? "arrow_downward" : "arrow_upward"
        }
        return "unfold_more"
      }
      if (!column.order) return "unfold_more"
      return column.order === "desc" ? "arrow_downward" : "arrow_upward"
    },
    handleFooterClassName({ columnIndex }) {
      return !columnIndex && "mc-virtual-table-col--border-right"
    },
  },
}
</script>

<style lang="scss">
.mc-virtual-table-col {
  &--border-right {
    border-right: 1px solid $color-outline-gray;
  }
  &--border-top {
    border-top: 1px solid $color-outline-gray;
  }
  &__title {
    width: auto;
    max-width: 101%;
  }
}
.vxe-cell {
  &.c--tooltip,
  &.c--title {
    text-overflow: clip !important;
    white-space: normal !important;
  }
}
</style>
