<template>
  <div class="mc-tappable">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "McTappable",
  status: "deprecated",
  release: "1.0.0",
  props: {
    /**
     *  Процент
     *
     */
    percent: {
      type: Number,
      default: 0,
    },
    /**
     *  Цвет
     *
     */
    color: {
      type: String,
      default: null,
    },
  },

  computed: {
    classes() {
      return {
        [`mc-tappable__line--color-${this.color}`]: this.color,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-tappable {
  $block-name: &;
}
</style>

<docs>
  ```jsx
  <div>
    <McTappable>
      lorem
    </McTappable>
  </div>
  ```
</docs>
