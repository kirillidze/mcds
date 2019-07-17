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

  padding-left: 16px;
  padding-right: 16px;

  background-color: $color-white;
}
</style>
