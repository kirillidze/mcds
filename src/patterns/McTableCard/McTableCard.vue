<template>
  <div class="mc-table-card">
    lorem
  </div>
</template>

<script>
export default {
  name: "McTableCard",
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
.mc-table-card {
  $block-name: &;

  @include position(absolute, 0);
}
</style>
