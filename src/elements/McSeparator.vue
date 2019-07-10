<template>
  <div class="mc-separator" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "McSeparator",
  status: "ready",
  release: "1.0.0",

  props: {
    /**
     * Отступ сверху
     */
    indentTop: {
      type: String,
      default: null,
    },
    /**
     * Отступ снизу
     */
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
$spaces: (
  "xxl": $space_xxl,
  "xl": $space_xl,
  "l": $space_l,
  "m": $space_m,
  "s": $space_s,
  "xs": $space_xs,
  "xxs": $space_xxs,
  "xxxs": $space_xxxs,
);

.mc-separator {
  $block-name: &;

  width: 100%;
  height: $separator-xs;
  background-color: $color-border;

  @each $key, $value in $spaces {
    &--indent-top-#{$key} {
      margin-top: #{$value};
    }

    &--indent-bottom-#{$key} {
      margin-bottom: #{$value};
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McSeparator indent-top="xs" indent-bottom="xs"/>
  </div>

  <div>
    <McSeparator indent-top="xl" indent-bottom="xl"/>
  </div>
  ```
</docs>
