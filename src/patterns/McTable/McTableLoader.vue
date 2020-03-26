<template>
  <div ref="el" class="mc-table-loader">
    <pacman-loader color="rgb(197, 61, 20)" size="30px" />
  </div>
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import { PacmanLoader } from "vue-loaders"
export default {
  name: "McTableLoader",
  components: { "pacman-loader": PacmanLoader },

  props: {
    loading: {
      isVisible: false,
      default: false,
    },
  },

  data() {
    return {
      observer: null,
    }
  },

  mounted() {
    this.createObserver()
  },

  beforeDestroy() {
    this.observer.disconnect()
  },

  watch: {
    loading(newValue) {
      if (!newValue && this.isVisible) {
        this.load()
      }
    },
  },

  methods: {
    createObserver() {
      this.observer = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.isVisible = true
            this.load()
          } else {
            this.isVisible = false
          }
        },
        { threshold: 0.1 }
      )
      const element = this.$refs.el
      this.observer.observe(element)
    },

    load() {
      this.$emit("load")
    },
  },
}
</script>

<style lang="scss">
.mc-table-loader {
  $block-name: &;
}
</style>
