<template>
  <div ref="el" class="mc-btn-load-more" :class="classes">
    <pacman-loader color="rgb(197, 61, 20)" size="30px" />
  </div>
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import { PacmanLoader } from "vue-loaders"
export default {
  name: "McBtnLoadMore",
  status: "deprecated",
  release: "1.0.0",
  components: {
    "pacman-loader": PacmanLoader,
  },

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
  },

  data() {
    return {
      visible: false,
    }
  },

  mounted() {
    this.handleScroll()
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll)
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

  computed: {
    classes() {
      return {
        "el-tabble-load-more--loading": this.loading,
      }
    },
  },

  methods: {
    handleScroll() {
      let el = this.$refs["el"]
      let rect = el.getBoundingClientRect()
      this.visible =
        rect.top >= this.offsetTop &&
        rect.left >= this.offsetLeft &&
        rect.bottom - this.offsetBottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right - this.offsetRight <= (window.innerWidth || document.documentElement.clientWidth)
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
.mc-btn-load-more {
  $block-name: &;

  @include reset-btn();
  cursor: default;
}
</style>

<docs>
  ```jsx
  <div>
    <McBtnLoadMore></McBtnLoadMore>
  </div>
  ```
</docs>
