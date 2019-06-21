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

  position: relative;
  border-radius: $radius-m;
  height: $space-xs;
  background-color: $color-gray-lightest;
  width: 100%;

  &__line {
    height: 100%;
    background-color: $color-gray-dark;
    border-radius: $radius-m;
    max-width: 100%;

    @each $color, $value in $token-colors {
      &--color-#{$color} {
        background-color: $value;
      }
    }
  }
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
