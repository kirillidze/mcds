<template>
  <section class="mc-bage" :class="classes">
    <div class="mc-bage__text">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "McBage",
  props: {
    /**
     *  Вертикальная черта (в таблице, к примеру)
     *
     */
    verticalLine: {
      type: Boolean,
      default: false,
    },
    /**
     *  Размеры:
     *  `s, m, l и т.д.`
     */
    size: {
      type: String,
      default: "m",
    },
    /**
     *  Дизайн:
     *  `blue, blue-outline т.д.`
     */
    variation: {
      type: String,
      default: "transparent",
    },
  },
  computed: {
    classes() {
      return {
        [`mc-bage--variation-${this.variation}`]: this.variation,
        [`mc-bage--size-${this.size}`]: this.size,
        ["mc-bage--vertical-line"]: this.verticalLine,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-bage {
  $block-name: &;

  @include ellipsis();
  color: $color-white;
  font-family: $font-heading;
  font-size: $size-xs;
  line-height: $line-height-s;
  font-weight: $weight-medium;
  text-transform: uppercase;
  vertical-align: middle;
  max-width: 100%;
  border-radius: $radius-m;
  padding: $space-xxxs $space-xs;
  border: 1px solid transparent;

  @each $color, $value in $token-colors {
    &--variation-#{$color} {
      background-color: $value;

      @if $color == "hover-gray" {
        color: $color-black;
      }

      &-outline {
        background-color: $color-white;
        color: $color-black;
        border-color: $value;
      }
    }
  }

  &--variation-transparent {
    background-color: transparent;

    &-outline {
      background-color: $color-white;
      color: $color-black;
      border-color: transparent;
    }
  }

  &--vertical-line {
    padding: 0;
    border-radius: 0;
    width: 5px;
    #{$block-name} {
      &__text {
        display: none;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let eventTest = (val) => alert(val)
  <div>
    <McBage>
      В обработке
    </McBage>
    <McBage variation="red">
      Ошибка
    </McBage>
    <McBage variation="light-green">
      Ок
    </McBage>
    <McBage variation="outline-gray-outline">
      network
    </McBage>
    <McBage vertical-line variation="blue-outline">
      В обработке
    </McBage>
  </div>
  ```
</docs>
