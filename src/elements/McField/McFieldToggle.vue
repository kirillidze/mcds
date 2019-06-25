<template>
  <label class="mc-field-toggle" :class="classes">
    <span class="mc-field-toggle__text"> <slot></slot> </span>
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
  status: "deprecated",
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
    color: #999;
    margin-right: 8px;
    transition: color 0.2s;
    &:empty {
      margin-right: 0;
    }
  }

  &--checked {
    .mc-field-toggle__text {
      color: $color-navy-blue-light;
    }
  }

  &__wrapper {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 20px;
    & > .mc-field-toggle__field {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .mc-field-toggle__slider {
        background-color: $color-navy-blue-light;

        &:before {
          transform: translateX(22px);
        }
      }
    }

    .mc-field-toggle__slider {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.2s;
      border-radius: 20px;

      &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 2px;
        bottom: 2px;
        background-color: #fff;
        transition: 0.2s;
        border-radius: 50%;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let toggler = null
  <div>
    <McFieldToggle v-model="toggler">Тогглер</McFieldToggle>
  </div>
  ```
</docs>
