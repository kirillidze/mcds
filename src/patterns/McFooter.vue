<template>
  <footer class="mc-footer">
    Футер
  </footer>
</template>

<script>
export default {
  name: "McFooter",
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
.mc-footer {
  $block-name: &;
}
</style>
