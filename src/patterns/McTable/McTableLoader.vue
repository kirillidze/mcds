<template>
  <pacman-loader color="rgb(197, 61, 20)" size="30px" />
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import { PacmanLoader } from "vue-loaders"
export default {
  name: "McTableLoader",
  components: { "pacman-loader": PacmanLoader },
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
.McTableLoader {
  $block-name: &;
}
</style>
