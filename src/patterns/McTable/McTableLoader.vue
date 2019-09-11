<template>
  <div ref="el" class="mc-table-loader">
    <pacman-loader color="rgb(197, 61, 20)" size="30px" />
  </div>
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import { PacmanLoader } from "vue-loaders"
import { findParentComponent } from "../../utils/treeSearch"
export default {
  name: "McTableLoader",
  components: { "pacman-loader": PacmanLoader },

  props: {
    loading: {
      default: false,
    },
    offsetTop: {
      default: 0,
    },
    offsetRight: {
      default: 0,
    },
    offsetBottom: {
      default: 300,
    },
    offsetLeft: {
      default: 0,
    },
    containerElement: {
      default: null,
    },
  },

  data() {
    return {
      visible: false,
      container: null,
    }
  },

  mounted() {
    this.container = this.containerElement ? findParentComponent(this, this.containerElement) : null
    this.handleScroll()
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll, true)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
  },

  methods: {
    handleScroll() {
      let el = this.$refs.el
      let container = this.container

      let height = container
        ? this.container.$el.clientHeight
        : window.innerHeight || document.documentElement.clientHeight
      let width = container
        ? this.container.$el.clientWidth
        : window.innerWidth || document.documentElement.clientWidth
      if (!el) return

      let childrenPosition = el.getBoundingClientRect()
      let parentPosition = container ? container.$el.getBoundingClientRect() : null

      let top = parentPosition ? childrenPosition.top - parentPosition.top : childrenPosition.top
      let left = parentPosition
        ? childrenPosition.left - parentPosition.left
        : childrenPosition.left
      let right = parentPosition
        ? childrenPosition.right - parentPosition.right
        : childrenPosition.right
      let bottom = parentPosition
        ? childrenPosition.bottom - parentPosition.bottom
        : childrenPosition.bottom

      let isVisible =
        top >= this.offsetTop &&
        left >= this.offsetLeft &&
        bottom - this.offsetBottom <= height &&
        right - this.offsetRight <= width
    },

    handleClick() {
      this.$emit("click")
      this.load()
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
