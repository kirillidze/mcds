<template>
  <div class="mc-table-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "McTableWrapper",
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
.mc-table-wrapper {
  $block-name: &;
}
</style>
