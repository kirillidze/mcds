<template>
  <label class="mc-field-toggle" :class="classes">
    <span class="mc-field-toggle__text">
      <!-- @slot Слот для тайтла тогглера -->
      <slot />
    </span>
    <span class="mc-field-toggle__wrapper">
      <input
        class="mc-field-toggle__field"
        type="checkbox"
        :checked="_value"
        :disabled="disabled"
        @input="e => change(e.target.checked)"
      />
      <span class="mc-field-toggle__slider"></span>
    </span>
  </label>
</template>

<script>
export default {
  name: "McFieldToggle",
  status: "ready",
  release: "1.0.0",
  props: {
    value: {
      type: [Boolean, String, Number],
      default: null,
    },
    checkedValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    uncheckedValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _value() {
      return this.value === this.checkedValue
    },
    classes() {
      return {
        "mc-field-toggle--checked": this._value,
      }
    },
  },
  methods: {
    change(checked) {
      /**
       * Событие тоггла
       * @property {boolean}
       */
      this.$emit("input", checked ? this.checkedValue : this.uncheckedValue)
    },
  },
}
</script>

<style lang="scss">
.mc-field-toggle {
  $block-name: &;

  display: flex;
  align-items: center;
  cursor: pointer;

  &__text {
    color: $color-gray;
    margin-right: $space-xs;
    transition: color $duration-standart;
    line-height: $line-height-m;
    &:empty {
      margin-right: 0;
    }
  }

  &--checked {
    #{$block-name}__text {
      color: $color-blue;
    }
  }

  &__wrapper {
    position: relative;
    display: inline-block;
    width: $tappable-element-m + $space-xxxs;
    height: $size-l;
    & > #{$block-name}__field {
      opacity: 0;
      @include size(0);

      &:checked + #{$block-name}__slider {
        background-color: $color-blue;

        &:before {
          transform: translateX($size-l + $space-xxxs);
        }
      }
    }

    #{$block-name}__slider {
      @include position(absolute, 0 0 0 0);
      background-color: $color-outline-gray;
      transition: $duration-standart;
      border-radius: $radius-l * 3;

      &:before {
        @include pseudo();
        @include size($tappable-element-xxs);
        @include position(null, null null $space-xxxs $space-xxxs);
        background-color: $color-white;
        transition: $duration-standart;
        border-radius: $radius-circle;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let toggler = null
  <div>
    <mc-field-toggle v-model="toggler">Тогглер</mc-field-toggle>
  </div>
  ```
</docs>
