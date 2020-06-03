<template>
  <div class="mc-progress">
    <div class="mc-progress__line" :class="classes" :style="{ width: `${percent}%` }"></div>
  </div>
</template>

<script>
export default {
  name: "McProgress",
  status: "ready",
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
        [`mc-progress__line--color-${this.color}`]: this.color,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-progress {
  $block-name: &;

  position: relative;
  border-radius: $radius-m;
  height: $space-xs;
  background-color: $color-hover-gray;
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
    <mc-progress :percent="20" />
    <br>
    <mc-progress :percent="90" color="azure" />
  </div>
  ```
</docs>
