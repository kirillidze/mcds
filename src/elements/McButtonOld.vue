<template>
  <component :is="is" v-bind="bind" class="mc-button-old" :class="classes" @click="handleClick">
    <btn-loader class="mc-button-old__loader" color="inherit" size="19px"></btn-loader>
    <McSvgIcon
      v-if="icon && !reverse"
      :width="24"
      :height="24"
      class="mc-button-old__icon"
      :name="icon"
    />
    <span class="mc-button-old__text"><slot></slot></span>
    <McSvgIcon
      v-if="icon && reverse"
      :width="24"
      :height="24"
      class="mc-button-old__icon"
      :name="icon"
    />
  </component>
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import { BallClipRotateMultipleLoader } from "vue-loaders"
import McSvgIcon from "./McSvgIcon"
export default {
  name: "McButtonOld",
  status: "deprecated",
  release: "1.0.0",
  components: {
    McSvgIcon,
    "btn-loader": BallClipRotateMultipleLoader,
  },
  props: {
    to: {
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    btnType: {
      type: String,
      default: null,
    },
    design: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    bgColor: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    squared: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    is() {
      if (this.to) {
        return "nuxt-link"
      } else if (this.href) {
        return "a"
      }
      return "button"
    },
    bind() {
      let result = {}
      if (this.to) {
        result["to"] = this.to
      } else if (this.href) {
        result["href"] = this.href
      }
      if (this.disabled || this.loading) {
        result["disabled"] = true
      }
      return result
    },

    classes() {
      return {
        "mc-button-old--type-submit": this.btnType === "submit",
        [`mc-button-old--design-${this.design}`]: this.design,
        [`mc-button-old--bg-color-${this.bgColor}`]: this.bgColor,
        [`mc-button-old--color-${this.color}`]: this.color,
        [`mc-button-old--size-${this.size}`]: this.size,
        [`mc-button-old--width-${this.width}`]: this.width,
        "mc-button-old--height-small": this.height === "small",
        "mc-button-old--reverse": this.reverse,
        "mc-button-old--loading": this.loading,
        "mc-button-old--disabled": this.disabled,
        "mc-button-old--squared": this.squared,
      }
    },
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e)
    },
  },
}
</script>

<style lang="scss">
$colors: (
  "color-red-light": $color-red-light,
  "color-dodger-blue-light": $color-dodger-blue-light,
  "color-dodger-blue-lighten": $color-dodger-blue-lighten,
  "color-dodger-blue-lighter": $color-dodger-blue-lighter,
  "color-mantis-dark": $color-mantis-dark,
  "color-gorse": $color-gorse,
  "color-gray-dark": $color-gray-dark,
  "color-gray-lighter": $color-gray-lighter,
  "color-black": $color-black,
  "color-dark-orchid": $color-dark-orchid,
  "color-bright-turquoise-darker": $color-bright-turquoise-darker,
  "color-aqua-darken": $color-aqua-darken,
  "color-cinnabar-dark": $color-cinnabar-dark,
  "color-bermuda-gray": $color-bermuda-gray,
);

.mc-button-old {
  $block-name: &;

  @include reset-btn();
  @include ellipsis();

  font-family: "Roboto", sans-serif;

  display: inline-block;
  position: relative;
  color: $color-navy-blue-light;
  font-size: 14px;
  line-height: line-height(17, 14);
  font-weight: 500;
  text-transform: uppercase;
  padding: 10px;
  transition: color $duration-quickly ease;
  letter-spacing: 0.35px;

  &:hover,
  &:focus {
    color: $color-cinnabar;
  }

  &:active {
    color: darken($color-cinnabar, 8%);
  }

  &__text {
    color: inherit;
    transition: inherit;
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin: -7px -5px;
    transition: color $duration-quickly ease;
  }

  &__loader {
    position: absolute !important;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: none !important;
  }

  &--type-submit {
    padding: 0;

    &:hover,
    &:focus {
      color: $color-gray-darker;
    }

    &:active {
      color: darken($color-gray-darker, 8%);
    }

    #{$block-name} {
      &__icon {
        width: 24px;
        height: 24px;
        margin: 0;
      }
    }
  }

  &--design-button {
    border-radius: 4px;
    background-color: $color-navy-blue-light;
    color: $color-white;
    padding-bottom: 8px;
    transition: background-color $duration-quickly ease;

    &:hover,
    &:focus {
      color: $color-white;
      background-color: darken($color-navy-blue-light, 5%);
    }

    &:active {
      color: $color-white;
      background-color: darken($color-navy-blue-light, 10%);
    }
  }

  &--design-download {
    color: #333333;

    &:hover,
    &:focus {
      color: $color-navy-blue-light;
    }

    &:active {
      color: darken($color-navy-blue-light, 8%);
    }
  }

  &--color-main {
    color: $color-cinnabar;
    transition: color $duration-quickly ease;

    &:hover,
    &:focus {
      color: darken($color-cinnabar, 5%);
    }

    &:active {
      color: darken($color-cinnabar, 10%);
    }
  }

  &--size-middle {
    padding: 11px 16px 10px;
  }

  &--size-small {
    font-size: 14px;
    line-height: 17px;
    text-transform: none;
  }

  &--size-tiny {
    font-size: 12px;
    line-height: 14px;
    text-transform: none;
    padding: 7px 12px 6px;
  }

  &--reverse {
    #{$block-name} {
      &__icon {
        margin-right: 0;
        //margin-left: 2px;
        position: relative;
      }
    }
  }

  &--color-dark {
    color: $color-black;
    transition: color $duration-quickly ease;
  }

  &--color-gray {
    color: $color-gray-light;
    transition: color $duration-quickly ease;

    #{$block-name} {
      &__icon {
        color: $color-black;
      }
    }
  }

  &--color-white {
    color: $color-white;
    transition: opacity $duration-quickly ease;

    &:hover,
    &:focus,
    &:active {
      color: $color-white;
      opacity: 0.85;
    }
  }

  &--width-middle {
    min-width: 144px;
    max-width: 100%;
  }

  &--width-small {
    min-width: 128px;
    max-width: 100%;
  }

  &--width-wide {
    width: 100%;
    max-width: 215px;
  }

  &--width-full {
    width: 100%;
  }

  &--height-small {
    padding-top: 10px;
    padding-bottom: 8px;
  }

  &--bg-color-main {
    background-color: $color-cinnabar;

    &:hover,
    &:focus {
      background-color: darken($color-cinnabar, 5%);
    }

    &:active {
      background-color: darken($color-cinnabar, 10%);
    }
  }

  &--bg-color-third {
    background-color: fade-out(hsl(0, 0%, 13%), 0.9);
    color: hsl(0, 0%, 13%);
    border-radius: 30px;

    #{$block-name} {
      &__text {
        transition: color $duration-quickly ease;
      }
    }

    &:hover,
    &:focus {
      background-color: darken($color-navy-blue-light, 5%);
    }

    &:active {
      background-color: darken($color-navy-blue-light, 10%);
    }
  }

  &--bg-color-white {
    background-color: $color-white;
    color: hsl(0, 0%, 13%);
    transition: opacity $duration-quickly ease;

    &:hover,
    &:focus,
    &:active {
      color: hsl(0, 0%, 13%);
      background-color: $color-white;
      opacity: 0.85;
    }
  }

  @each $color, $value in $colors {
    &--bg-color-#{$color} {
      background-color: $value;

      &:hover,
      &:focus {
        background-color: darken($value, 5%);
      }

      &:active {
        background-color: darken($value, 10%);
      }
    }
  }

  &--loading,
  &--disabled {
    pointer-events: none;
  }

  &--loading {
    #{$block-name} {
      &__loader {
        display: inline-block !important;
      }

      &__icon {
        opacity: 0 !important;
      }

      &__text {
        opacity: 0 !important;
      }
    }
  }

  &--disabled {
    opacity: 0.6 !important;
  }

  &--squared {
    width: 32px;
    height: 32px;
    padding: 8px;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McButtonOld type="button">Регистрация</McButtonOld>
    <McButtonOld type="submit" design="button" size="middle">Дальше</McButtonOld>
    <McButtonOld type="submit" design="button" size="middle" disabled>Disabled</McButtonOld>
    <McButtonOld type="submit" design="button" size="middle" loading>Дальше</McButtonOld>
    <McButtonOld size="middle" height="small" color="main">Отменить</McButtonOld>
    <McButtonOld design="button" size="tiny">Tiny</McButtonOld>
    <McButtonOld design="button" size="middle" height="small" width="middle">Перевести</McButtonOld>
    <McButtonOld color="dark" :reverse="true" size="small" icon="arrow_drop_down">Русский</McButtonOld>
    <McButtonOld bg-color="third" size="middle" design="button">Информация профиля</McButtonOld>
    <McButtonOld type="submit" btn-type="submit">
      <McSvgIcon class="mc-button-old__icon" :width="24" :height="24" name="send"/>
    </McButtonOld>
    <McButtonOld icon="get_app" design="download"/>
    <McButtonOld icon="keyboard_arrow_left">Назад</McButtonOld> <br> <br>
    <McButtonOld design="button" bg-color="color-bermuda-gray" width="full">Принять</McButtonOld> <br> <br>
    <McButtonOld design="button" width="wide">Отклонить</McButtonOld>
    <McButtonOld :squared="true" design="button">1</McButtonOld>
  </div>
  ```
</docs>
