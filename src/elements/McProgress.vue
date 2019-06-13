<template>
  <div class="mc-progress">
    <div class="mc-progress__line" :class="classes" :style="{ width: `${percent}%` }"></div>
  </div>
</template>

<script>
export default {
  name: "McProgress",
  status: "deprecated",
  release: "1.0.0",
  props: {
    percent: {
      type: Number,
      default: 0,
    },
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
  border-radius: 20px;
  height: 8px;
  background-color: #e8e8e8;
  width: 100%;
  overflow: hidden;

  &__line {
    height: 100%;
    background-color: $color-gray-dark;
    border-radius: 20px;
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
    <McProgress :percent="20" />
    <br>
    <McProgress :percent="60" color="dodger-blue-lighter" />
  </div>
  ```
</docs>
