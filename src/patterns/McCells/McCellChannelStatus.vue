<template>
  <section class="mc-channel-status"></section>
</template>

<script>
export default {
  name: "McChannelStatus",
  status: "deprecated",
  release: "1.0.0",
  components: {},
  props: {},
  computed: {
    classes() {
      return {
        // "mc-channel-status--theme-white": this.theme === "white",
      }
    },
  },
}
</script>

<style lang="scss">
.mc-channel-status {
  $block-name: &;
}
</style>

<docs>
  ```jsx
  <div>
    lorem
  </div>
  ```
</docs>
