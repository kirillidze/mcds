<template>
  <label class="mc-toggle" :class="classes">
    <span class="mc-toggle__text"> <slot></slot> </span>
    <span class="mc-toggle__wrapper">
      <input
        class="mc-toggle__field"
        type="checkbox"
        :checked="_value"
        :disabled="disabled"
        @input="e => change(e.target.checked)"
      />
      <span class="mc-toggle__slider"></span>
    </span>
  </label>
</template>

<script>
export default {
  name: "McToggle",
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
        "mc-toggle--checked": this._value,
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

<docs>
  ```jsx
  let test = null
  <div>
    <McToggle v-model="test">Тогглер</McToggle>
  </div>
  ```
</docs>

<style lang="scss">
.mc-toggle {
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
    .mc-toggle__text {
      color: $color-navy-blue-light;
    }
  }

  &__wrapper {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 20px;
    & > .mc-toggle__field {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .mc-toggle__slider {
        background-color: $color-navy-blue-light;

        &:before {
          transform: translateX(22px);
        }
      }
    }

    .mc-toggle__slider {
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
