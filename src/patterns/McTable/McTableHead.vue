<template>
  <thead class="mc-table-head">
    <tr>
      <th v-for="item in items" v-if="item.key" :key="item.key">
        {{ item.title }}
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "McTableHead",
  props: {
    items: {
      type: [Array, Object],
      required: true,
    },
    // sortable: {
    //   type: [Boolean, Array],
    //   required: true,
    // },
    // sortedBy: {
    //   type: String,
    //   required: false,
    // },
    // sortedDescending: {
    //   type: Boolean,
    //   default: false,
    // },
    // offsetTop: {
    //   type: Number,
    //   default: 0,
    // },
    // checkable: {
    //   type: Boolean,
    //   default: false,
    // },
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
.McTableHead {
  $block-name: &;
}
</style>
