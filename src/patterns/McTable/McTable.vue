<template>
  <table class="mc-table">
    <McTableHead :items="headers"></McTableHead>
    <McTableBody :items="items" :headers="headers">
      <slot />
      <template v-for="header in headers" :slot="`cell-${header.key}`" slot-scope="row">
        <slot :name="`cell-${header.key}`" :item="row.item" />
      </template>
    </McTableBody>
  </table>
</template>

<script>
import McTableHead from "./McTableHead"
import McTableBody from "./McTableBody"
import McButton from "../../elements/McButton"
export default {
  name: "McTable",
  components: { McButton, McTableHead, McTableBody },
  props: {
    headers: {
      type: [Array, Object],
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    sortable: {
      type: [Boolean, Array],
      default: false,
    },
    sortedBy: {
      type: String,
      required: false,
    },
    sortedDescending: {
      type: Boolean,
      default: false,
    },
    sortedDefaultDescending: {
      type: Boolean,
      default: false,
    },
    infinite: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    checkedItems: {
      type: Array,
    },
    checkBy: {
      type: String,
      default: "id",
    },
    placeholderNoData: {
      type: String,
      default: null,
    },
    placeholderAllLoaded: {
      type: String,
      default: null,
    },
    withoutTopLine: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: null,
    },
    fixedHeight: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    console.log("table", this.$slots)
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
.mc-table {
  $block-name: &;
}
</style>

<docs>
  ```jsx
  let headers = require('@/mocks/tableContractsHead').default;
  let body = require('@/mocks/tableContractsBody').default;
  <div>
    <McTable :headers="headers" :items="body">
      asd
      <template slot="cell-button" slot-scope="row">
        <McButton>
          {{ row.item.id }}
        </McButton>
      </template>
    </McTable>
  </div>
  ```
</docs>
