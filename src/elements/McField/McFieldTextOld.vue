<template>
  <div class="mc-field-text" :class="modifier">
    <span v-if="title" class="mc-field-text__title">
      {{ title }}
    </span>
    <span class="mc-field-text__input-wrap">
      <span class="mc-field-text__input-inner">
        <flat-pickr
          v-if="type === 'date'"
          class="mc-field-text__input"
          :placeholder="placeholder"
          :value="value"
          @input="value => handleInput(value)"
          :name="name"
          ref="input"
          :disabled="disabled"
        ></flat-pickr>
        <textarea
          v-else-if="type === 'textarea'"
          class="mc-field-text__input"
          :placeholder="placeholder"
          :value="value"
          :name="name"
          @input="$event => handleInput($event.target.value)"
          :disabled="disabled"
        ></textarea>
        <input
          v-else
          class="mc-field-text__input"
          :disabled="disabled"
          :type="type !== 'password' ? type : passwordVisibility"
          :placeholder="placeholder"
          :value="value"
          @input="$event => handleInput($event.target.value)"
          :name="name"
          ref="input"
        />

        <template v-if="type === 'password'">
          <button
            tabindex="-1"
            type="button"
            class="mc-field-text__input-btn-eye"
            @click.prevent="togglePasswordVisibility"
          >
            <McSvgIcon
              width="24"
              height="24"
              class="mc-field-text__input-btn-eye-icon"
              :name="icon"
            />
          </button>
        </template>

        <McSvgIcon
          v-if="addon && addon !== 'search' && addon !== 'password' && !addonText"
          class="mc-field-text__input-addon"
          :name="addon"
          width="24"
          height="24"
          :type="addonType"
        />
        <span v-if="addonText" class="mc-field-text__input-addon mc-field-text__input-addon--text">
          {{ addon }}
        </span>
        <span class="mc-field-text__buttons" v-if="$slots['buttons']">
          <slot name="buttons"></slot>
        </span>
      </span>
      <span v-if="errorText" class="mc-field-text__help-text">{{ errorText }}</span>
    </span>
  </div>
</template>

<script>
import McSvgIcon from "../McSvgIcon"

export default {
  name: "McFieldTextOld",
  status: "deprecated",
  release: "3.5.0",
  components: { McSvgIcon },
  data() {
    return {
      isShowPassword: false,
    }
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    addon: {
      type: String,
      default: null,
    },
    addonText: {
      type: Boolean,
      default: false,
    },
    addonType: {
      type: String,
      default: null,
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
  methods: {
    handleInput(value) {
      this.emitInput(value)
    },
    clearField() {
      this.emitInput(null)
      this.$refs.input.focus()
    },
    togglePasswordVisibility() {
      this.isShowPassword = !this.isShowPassword
    },
    handleSearch() {
      this.value ? this.$emit("handleSearch") : ""
    },
    emitInput(value) {
      this.$emit("input", value)
    },
  },
  computed: {
    modifier() {
      return {
        "mc-field-text--error": this.errorText,
        "mc-field-text--addon": this.addon,
        "mc-field-text--search": this.addon === "search",
        "mc-field-text--password": this.addon === "password",
        "mc-field-text--show-search-close": this.type === "search",
        "mc-field-text--simple": this.design === "simple",
        "mc-field-text--total": this.design === "total",
        "mc-field-text--light": this.theme === "light",
        "mc-field-text--with-buttons": this.$slots["buttons"],
      }
    },
    icon() {
      return this.isShowPassword ? "visibility_off" : "visibility"
    },
    passwordVisibility() {
      return this.isShowPassword ? "text" : "password"
    },
    errorText() {
      if (this.errors == null || this.errors.length == 0) return null
      return this.errors.join(", ")
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

    &[type="search"]::-webkit-search-cancel-button,
    &[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
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

  &--search {
    #{$block-name} {
      &__input-inner {
        position: relative;
      }

      &__input {
        padding: 5px 10px;
        height: 32px;
        padding-right: 30px !important;
        padding-left: 32px;
      }

      &__input-btn-search,
      &__input-btn-close {
        @include reset-btn();

        position: absolute;
        z-index: 2;
        right: 0;
        top: 0;
        width: 32px;
        height: 32px;
        font-size: 17px;
        color: $color-gray-darken;
        overflow: hidden;
        transition: $duration-quickly;

        svg {
          fill: $color-gray-darken;
          transition: $duration-quickly;
        }

        &:hover,
        &:focus {
          color: fade-out($color-gray-darken, 0.2);

          svg {
            fill: fade-out($color-gray-darken, 0.2);
          }
        }

        &:active {
          color: fade-out($color-black, 0.2);

          svg {
            fill: fade-out($color-black, 0.2);
          }
        }
      }

      &__input-btn-search {
        left: 0;
      }

      &__input-btn-close {
        right: 0;
        display: none;
      }

      &__input-btn-search-icon {
        width: 24px;
        height: 24px;
      }

      &__input-btn-close-icon {
        position: relative;
        top: 0;
        width: 22px;
        height: 22px;
        fill: hsl(0, 0%, 13%);
      }
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

  &--show-search-close {
    #{$block-name} {
      &__input-btn-close {
        display: block;
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

  &--addon {
    #{$block-name} {
      &__input {
        padding-right: 35px;
      }

      &__input-addon {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        font-size: 14px;
        color: $color-gray-darker;
        width: 20px;
        height: 20px;

        &--text {
          font-size: 20px;
          height: auto;
          display: block;
          text-align: center;
        }
      }

      &__input-inner {
        position: relative;
      }
    }
  }

  &--password {
    #{$block-name} {
      &__input-inner {
        position: relative;
      }

      &__input {
        padding-right: 45px;
      }

      &__input-btn-eye {
        @include reset-btn();
        position: absolute;
        right: 0;
        top: 0;
        font-size: 16px;
        width: 36px;
        height: 34px;
      }

      &__input-btn-eye-icon {
        position: relative;
        width: 20px;
        height: 20px;
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

  &--with-buttons {
    #{$block-name} {
      &__input-inner {
        position: relative;
      }

      &__input {
        padding-right: 150px;
      }

      &__input[disabled] + .mc-field-text__buttons {
        pointer-events: none;
      }

      &__buttons {
        display: flex;
        flex-wrap: nowrap;
        position: absolute;
        right: 5px;
        height: 34px;
        top: 0;

        .el-link {
          padding: 8px;
          color: hsl(0, 0%, 45%);

          @include interplay-link($color: $color-cinnabar);
        }

        &:empty {
          display: none;
        }
      }
    }
  }
}
</style>

<docs>
    ```jsx
    let text = null
    let number = null
    <div>
        <McFieldTextOld
                v-model="text"
                theme="light"
                type="text"
                design="simple"
        />
        <br>
        <McFieldTextOld
                v-model="number"
                type="number"
                theme="light"
                design="simple"
                addon="%"
                addon-type="a"
                :addon-text="true"
        />
    </div>
    ```
</docs>
