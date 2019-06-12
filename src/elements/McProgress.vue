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
$colors: (
  "red-light": $color-red-light,
  "dodger-blue-light": $color-dodger-blue-light,
  "dodger-blue-lighten": $color-dodger-blue-lighten,
  "dodger-blue-lighter": $color-dodger-blue-lighter,
  "mantis-dark": $color-mantis-dark,
  "gorse": $color-gorse,
  "gray-dark": $color-gray-dark,
  "gray-lighter": $color-gray-lighter,
  "black": $color-black,
  "dark-orchid": $color-dark-orchid,
  "bright-turquoise-darker": $color-bright-turquoise-darker,
  "aqua-darken": $color-aqua-darken,
  "cinnabar-dark": $color-cinnabar-dark,
  "bermuda-gray": $color-bermuda-gray,
);
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
    @each $color, $value in $colors {
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
