<template>
  <div class="mc-field-text" :class="modifier">
    <span v-if="title" class="mc-field-text__title">
      {{ title }}
    </span>
    <span class="mc-field-text__input-wrap">
      <span class="mc-field-text__input-prepend" v-if="$slots.prepend">
        <slot name="prepend" />
      </span>
      <span class="mc-field-text__input-inner">
        <flat-pickr
          v-if="type === 'date'"
          class="mc-field-text__input"
          :style="inputStyles"
          :placeholder="placeholder"
          :value="value"
          @input="value => handleInput(value)"
          :name="name"
          ref="input"
          :disabled="disabled"
        ></flat-pickr>
        <textarea
          v-else-if="type === 'textarea'"
          v-autosize
          class="mc-field-text__input"
          :style="inputStyles"
          :placeholder="placeholder"
          :value="value"
          :name="name"
          @input="$event => handleInput($event.target.value)"
          :disabled="disabled"
        />
        <input
          v-else
          class="mc-field-text__input"
          :style="inputStyles"
          :disabled="disabled"
          :type="type"
          :placeholder="placeholder"
          :value="value"
          @input="$event => handleInput($event.target.value)"
          :name="name"
          ref="input"
        />
        <span class="mc-field-text__input-append" v-if="$slots.append">
          <slot name="append" />
        </span>
      </span>
      <span v-if="errorText" class="mc-field-text__help-text">{{ errorText }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "McFieldText",
  status: "deprecated",
  release: "3.5.0",
  props: {
    type: {
      type: String,
      default: "text",
    },
    title: {
      type: String,
      default: null,
    },
    design: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null,
    },
    errors: {
      type: Array,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      prependWidth: 0,
      appendWidth: 0,
    }
  },
  mounted() {
    this.calculatePadding()
  },
  computed: {
    modifier() {
      return {
        "mc-field-text--error": this.errorText,
        [`mc-field-text--${this.design}`]: this.design,
        "mc-field-text--light": this.theme === "light",
      }
    },
    errorText() {
      if (this.errors == null || this.errors.length == 0) return null
      return this.errors.join(", ")
    },
    inputStyles() {
      return {
        paddingLeft: `${this.prependWidth ? this.prependWidth + 12 : 0}px`,
        paddingRight: `${this.appendWidth ? this.appendWidth + 12 : 0}px`,
      }
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value)
    },
    calculatePadding() {
      this.prependWidth = this.calculateSlotPadding("prepend")
      this.appendWidth = this.calculateSlotPadding("append")
    },
    calculateSlotPadding(name) {
      if (this.$slots[name] == null) return 0
      return this.$slots[name].reduce((acc, cur) => {
        const $el = cur.elm ? cur.elm : cur
        return acc + $el.getBoundingClientRect().width
      }, 0)
    },
  },
}
</script>

<style lang="scss">
.mc-field-text {
  $block-name: &;

  display: block;

  &__input-wrap {
    display: block;
    position: relative;
  }

  &__input-prepend,
  &__input-append {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__input-prepend {
    left: 0;
    padding-left: 6px;
  }

  &__input-append {
    right: 0;
    padding-right: 6px;
  }

  &__title {
    display: block;
    margin-bottom: 7px;
    color: hsl(0, 0%, 13%);
    font-size: 16px;
    font-weight: 500;
    line-height: line-height(19, 16);
    font-family: $font-heading-secondary;
  }

  &__input {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    padding: px-to-em(10, 16px) 0;
    height: 40px;
    margin: 0;
    font-family: $font-text;
    background-color: hsl(0, 0%, 93%);
    outline: none;
    border-radius: 4px;
    appearance: textfield;
    color: $color-gray-darken;
    font-size: 16px;
    font-weight: 500;
    line-height: line-height(19, 16);
    transition: box-shadow $duration-quickly;
    border: none;

    &:focus {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.24);
      outline: none;

      &::placeholder {
        //color: $color-gray-darken !important;
      }
    }

    &[disabled] {
      cursor: default !important;
      background-color: hsl(0, 0%, 93%) !important;
      border-color: transparent !important;
    }

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      // height: auto;
    }

    &[type="color"] {
      // max-width: 100px;
      //padding: 0;
    }

    &::placeholder {
      color: $color-gray;
      transition: color $duration-quickly;
    }
  }

  &__input-inner {
    display: block;
  }

  &__help-text {
    @include field-error();

    &:empty {
      display: none;
    }
  }

  &--error {
    #{$block-name} {
      &__input {
        //border-bottom-color: #e73232;

        &::placeholder {
          //color: #e73232 !important;
        }

        &:focus {
          //border-bottom-color: $text-color;
          &::placeholder {
            //color: $color-gray-light !important;
          }
        }
      }
    }
  }

  &--simple {
    #{$block-name} {
      &__input {
        font-family: $font-heading-secondary;
        background-color: transparent;
        color: hsl(0, 0%, 13%);
        font-size: 16px;
        line-height: line-height(19, 16);
        font-weight: 400;
        padding: 4px 13px 5px 13px;
        border: 1px solid $color-gray-darker;
        height: 34px;
        border-radius: 4px;

        &:focus {
          box-shadow: none;
          outline: none;
          border-color: $color-navy-blue-light;
        }

        &::placeholder {
          color: #b3b3b3;
        }
      }
    }

    textarea#{$block-name} {
      &__input {
        $textarea-height: 150px;

        padding: 11px 13px;
        height: auto;
        min-height: calc(#{$textarea-height} + 2px);
        resize: vertical;
      }
    }
  }

  &--light {
    #{$block-name} {
      &__input {
        border-color: #b8b8b8;

        &::placeholder {
          color: hsl(0, 0%, 13%);
        }
      }
    }
  }

  &--total {
    #{$block-name} {
      &__input {
        color: hsl(0, 0%, 100%);
        font-size: 34px;
        line-height: line-height(37, 34);
        font-weight: 500;
        height: 59px;
        letter-spacing: 0.01px;
        font-family: $font-heading-secondary;
        padding: 4px 13px 5px 13px;
        background-image: linear-gradient(80deg, hsl(352, 89%, 65%) 0%, hsl(294, 93%, 78%) 100%);
      }
    }
  }
}
</style>

<docs>
    ```jsx
    let text = null
    <div>
        <McFieldText
                v-model="text"
                theme="light"
                type="text"
                design="simple"
        >
            <template slot="prepend">
                <McSvgIcon name="face"/>
            </template>
            <template slot="append">
                <McSvgIcon name="face"/>
            </template>
        </McFieldText>
        <br>
        <McFieldText
                v-model="text"
                theme="light"
                type="text"
                design="simple"
        >
            <template slot="prepend">
                <span>@</span>
            </template>
            <template slot="append">
                <span>$</span>
            </template>
        </McFieldText>
        <br>
        <McFieldText
                v-model="text"
                type="textarea"
        >
        </McFieldText>
    </div>
    ```
</docs>
