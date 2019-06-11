<template>
  <div class="mc-field-checkbox" :class="classes">
    <div class="mc-field-checkbox__input-wrap">
      <label class="mc-field-checkbox__name">
        <input
          class="mc-field-checkbox__input"
          type="checkbox"
          :name="name"
          :checked="value === checkedValue"
          @change="handleChange"
        />
        <span class="mc-field-checkbox__name-text">
          <slot></slot>
        </span>
      </label>
      <div class="mc-field-checkbox__help-text-wrap">
        <div class="mc-field-checkbox__help-text">
          {{ errorText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "McFieldCheckbox",
  status: "deprecated",
  release: "1.0.0",
  props: {
    value: {
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    checkedValue: {
      default: true,
    },
    uncheckedValue: {
      default: false,
    },
    type: {
      type: Number,
      default: 0,
    },
    errors: {
      type: Array,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  computed: {
    classes() {
      return {
        "mc-field-checkbox--error": this.errors,
        [`mc-field-checkbox--type-${this.type}`]: this.type,
      }
    },
    errorText() {
      if (this.errors == null || this.errors.length == 0) return null
      return this.errors.join(", ")
    },
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e.target.checked ? this.checkedValue : this.uncheckedValue)
    },
    emitInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss">
.mc-field-checkbox {
  display: block;

  $block-name: &;

  &__title {
    display: block;
  }

  &__input-wrap {
    & + & {
      margin-top: 1rem;
    }
  }

  &__name {
    position: relative;
    display: inline-block;
    padding-left: 27px;
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;
  }

  &__name-text {
    display: inline-block;
    line-height: 18px;
    user-select: none;
    color: $color-gray-light;
    font-family: $font-heading-secondary;
    font-size: 16px;
    font-weight: 500;
    // свой чекбокс без картинок
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 17px;
      height: 17px;
      border: 1px solid currentColor;
      border-radius: 4px;
      cursor: pointer;
    }
    .mc-field-checkbox__input:focus ~ &:before {
    }
    &:after {
      cursor: pointer;
      content: "";
      position: absolute;
      top: 1px;
      left: 4px;
      width: 15px;
      height: 7px;
      opacity: 0;
      border-left: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform: rotate(-45deg);
      //transition: opacity $duration-quickly;
      box-shadow: 1px 2px 0 #fff, inset 0 -2px 0 #fff;
      .mc-field-checkbox__input:checked ~ & {
        opacity: 1;
      }
    }
  }

  &__input {
    position: absolute;
    top: 0.7em;
    left: 0;
    padding: 0;
    margin: 0;
    transform: translateY(-50%);
    &:focus,
    &:active {
    }
    // сокрытие инпута в случае использования своего чекбокса
    opacity: 0;
  }

  &__help-text-wrap {
    padding-left: 27px;
  }

  &__help-text {
    @include field-error();
    margin-top: 2px;

    &:empty {
      display: none;
    }
  }

  &--type-2 {
    #{$block-name} {
      &__name-text {
        color: hsl(0, 0%, 13%);
        font-family: $font-text;
        font-size: 16px;
        line-height: line-height(19, 16);
        font-weight: 400;

        &:before {
          border-color: $color-gray-light;
        }

        &:after {
          border-left-color: $color-gray-light;
          border-bottom-color: $color-gray-light;
        }
      }
    }
  }

  &--type-3 {
    #{$block-name} {
      &__name-text {
        color: hsl(0, 0%, 13%);
        font-family: $font-heading-secondary;
        font-size: 11px;
        line-height: line-height(14, 11);
        font-weight: 500;
        cursor: default;

        &:before {
          border-color: #999999;
        }

        &:after {
          border-left-color: #999999;
          border-bottom-color: #999999;
        }

        a {
          color: $color-navy-blue-light;
          transition: color $duration-quickly;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  &--type-4 {
    #{$block-name} {
      &__name-text {
        color: hsl(0, 0%, 13%);
        font-family: $font-heading-secondary;
        font-size: 13px;
        line-height: line-height(14, 11);
        font-weight: 500;
        cursor: default;

        &:before {
          border-color: #999999;
        }

        &:after {
          border-left-color: #999999;
          border-bottom-color: #999999;
        }

        a {
          color: $color-navy-blue-light;
          transition: color $duration-quickly;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  &--error {
    .mc-field-checkbox__help-text {
      //color: $color-navy-blue-light;
    }
    .mc-field-checkbox__help-text {
      display: block;
    }
  }
  &--small-indent {
    margin-bottom: 20px;
  }
}
</style>

<docs>
  ```jsx
  let test = null
  let test2 = null
  let test3 = null
  let test4 = null
  <div>
    <McFieldCheckbox v-model="test4">
      Владилен
    </McFieldCheckbox>

    <McFieldCheckbox v-model="test" :type="2">
      Владилен
    </McFieldCheckbox>

    <McFieldCheckbox v-model="test3" :type="3">
      Владилен
    </McFieldCheckbox>

    <mc-field-checkbox v-model="test2" :type="4">
      Владилен
    </mc-field-checkbox>
  </div>
  ```
</docs>
