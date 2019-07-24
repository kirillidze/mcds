<template>
  <article class="mc-table-card-body">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "McTableCardBody",
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
.mc-table-card-body {
  $block-name: &;
}
</style>
