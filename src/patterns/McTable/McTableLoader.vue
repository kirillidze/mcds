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
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      observer: null,
      container: null,
    }
  },

  mounted() {
    this.createObserver()
    this.container = window.document.getElementsByClassName("mc-table-card-wrap__inner")[0] || null
  },

  beforeDestroy() {
    this.observer.disconnect()
  },

  watch: {
    loading(newValue) {
      if (!newValue && this.container) {
        this.container.scrollTop = this.container.scrollTop - 60
      }
    },
  },

  methods: {
    createObserver() {
      this.observer = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.load()
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
