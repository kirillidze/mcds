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
    this.container = findParentComponent(this, this.containerElement)
    this.handleScroll()
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll, true)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
  },

  watch: {
    loading(val) {
      if (!val) {
        this.handleScroll()
      }
    },
    visible(val) {
      val ? this.handleEnter() : this.handleLeave()
    },
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
      let rect = el.getBoundingClientRect()
      this.visible =
        rect.top >= this.offsetTop &&
        rect.left >= this.offsetLeft &&
        rect.bottom - this.offsetBottom <= height &&
        rect.right - this.offsetRight <= width
    },

    handleClick() {
      this.$emit("click")
      this.load()
    },

    handleEnter() {
      this.$emit("enter")
      this.load()
    },

    handleLeave() {
      this.$emit("leave")
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
