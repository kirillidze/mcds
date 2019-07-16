<template>
  <div class="mc-table-responsive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "McTableResponsive",
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
.mc-table-responsive {
  $block-name: &;

  display: block;
  width: 100%;
  overflow-x: auto;
  border: 1px solid $color-gray-light;

  .mc-table {
    min-width: $site-width-m;
  }

  .mc-table-head,
  .mc-table-body,
  .mc-table-foot {
    border: none;
  }
}
</style>
