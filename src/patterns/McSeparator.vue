<template>
  <div class="mc-separator" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "McSeparator",
  status: "ready",
  release: "0.0.1",

  props: {
    indentTop: {
      type: String,
      default: null,
    },
    indentBottom: {
      type: String,
      default: null,
    },
  },

  computed: {
    classes() {
      return {
        [`mc-separator--indent-top-${this.indentTop}`]: this.indentTop,
        [`mc-separator--indent-bottom-${this.indentBottom}`]: this.indentBottom,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-separator {
  $block-name: &;

  width: 100%;
  height: $separator-xs;
  background-color: $color-border;

  &--indent-top-xs {
    margin-top: $space-xs;
  }

  &--indent-bottom-xs {
    margin-bottom: $space-xs;
  }
}
</style>
