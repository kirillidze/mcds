<template>
  <div class="mc-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "McContainer",
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
.mc-container {
  $block-name: &;

  padding-left: $space-s;
  padding-right: $space-s;

  background-color: $color-white;
}
</style>
