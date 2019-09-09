<template>
  <section tabindex="0" class="mc-chip" :class="classes">
    <slot name="icon" />
    <div class="mc-chip__title">
      <slot></slot>
    </div>
    <div v-if="counter" class="mc-chip__counter">
      {{ counter }}
    </div>
    <button v-if="closable" class="mc-chip__button" v-on="$listeners">
      <slot name="button">
        <McSvgIcon size="xxs" name="cancel" />
      </slot>
    </button>
  </section>
</template>

<script>
import McSvgIcon from "./McSvgIcon"
export default {
  name: "McChip",
  status: "ready",
  release: "1.0.0",
  components: { McSvgIcon },
  props: {
    /**
     *  Отключенное состояние
     *
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     *  Кнопка закрытия
     *
     */
    closable: {
      type: Boolean,
      default: false,
    },
    /**
     *  Дизайн:
     *  `blue, blue-invert т.д.`
     */
    variation: {
      type: String,
      default: "transparent",
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
     *  Счетчик
     *
     */
    counter: {
      type: Number,
      default: null,
    },
  },

  methods: {
    handleClick() {},
  },

  computed: {
    classes() {
      return {
        [`mc-chip--variation-${this.variation}`]: this.variation,
        [`mc-chip--size-${this.size}`]: this.size,

        "mc-chip--disabled": this.disabled,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-chip {
  $block-name: &;

  color: $color-black;
  font-family: $font-text;
  font-size: $size-m - 1;
  line-height: $line-height-s;
  font-weight: $weight-normal;
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  height: $tappable-element-s;
  padding-left: $space-xs;
  padding-right: $space-xs;
  border-radius: $radius-xxxxl;
  vertical-align: middle;
  outline: none;

  &__title {
    @include ellipsis();
    @include layout-flex-fix();
    margin-right: $space_xxs;
    margin-left: $space_xxs;

    &:empty {
      display: none;
    }
  }

  &__counter {
    flex: 0 0 auto;
    font-family: $font-heading;
    font-size: 13px;
    margin-right: $space_xxs;
    margin-left: $space_xxs;
    color: $color-gray-dark;

    &:empty {
      display: none;
    }
  }

  &__button {
    @include size($tappable-element-xxs);
    position: relative;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 0;
    vertical-align: middle;
    user-select: none;
    text-decoration: none;
    text-transform: none;
    background-color: transparent;
    background-image: none;
    cursor: pointer;
    outline: 0;
    border: none;
    transition: all $duration-quickly;
    flex-wrap: nowrap;
    -webkit-appearance: none;
    -webkit-text-fill-color: currentColor;
    color: $color-blue;
    margin-left: $space_xxs;

    &:hover,
    &:focus {
      color: darken($color-red, 10%);
    }

    &:active {
      color: darken($color-red, 15%);
    }
  }

  @each $color, $value in $token-colors {
    &--variation-#{$color} {
      background-color: $value;
      color: $color-white;

      #{$block-name} {
        &__button {
          color: $color-white;

          &:hover,
          &:focus {
            color: fade-out($color-white, 1 - $opacity_hover);
          }

          &:active {
            color: fade-out($color-white, 1 - $opacity_active);
          }
        }

        &__counter {
          color: fade-out($color-white, 0.5);
        }
      }

      &-invert {
        background-color: fade-out($value, 0.85);
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let eventTest = (val) => alert(val)
  <div>
    <McChip variation="gray-dark-invert" closable @click="eventTest('close')">
      Чипс
    </McChip>
    <McChip variation="ultraviolet">
      <McSvgIcon slot="icon" size="xxs" name="favorite" fill="red"/>
      Чипс c иконкой
    </McChip>
    <McChip variation="blue-invert" closable @click="eventTest('close')">
      <McSvgIcon slot="icon" size="xxs" name="favorite" fill="red"/>
      Чипс c иконкой и кнопкой
    </McChip>
    <McChip :counter="15" variation="blue" closable @click="eventTest('close')">
      <McSvgIcon slot="icon" size="xxs" name="favorite" fill="red"/>
      Чипс c иконкой, кнопкой и счетчкиком
    </McChip>
    <McChip :counter="15">
      <McSvgIcon slot="icon" size="xxs" name="favorite" fill="red"/>
      Чипс cо счетчиком
    </McChip>
  </div>
  ```
</docs>
