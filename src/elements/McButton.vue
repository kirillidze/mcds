<template>
  <component
    v-bind="tagBind"
    class="mc-button"
    v-on="$listeners"
    :is="tag"
    :class="classes"
    :exact="exact"
  >
    <!-- @slot Слот для вставки в начало -->
    <slot name="icon-prepend" />
    <btn-loader v-if="loading" class="mc-button__loader" color="inherit" size="19px" />
    <span class="mc-button__text" v-if="$slots.default">
      <!-- @slot Слот по умолчанию -->
      <slot />
    </span>
    <!-- @slot Слот для вставки в конец -->
    <slot name="icon-append" />
  </component>
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import { BallClipRotateMultipleLoader } from "vue-loaders"
import McSvgIcon from "./McSvgIcon"
import McTitle from "./McTitle"
import { FluentRevealEffect } from "fluent-reveal-effect"

export default {
  name: "McButton",
  status: "ready",
  release: "1.0.0",
  components: {
    McTitle,
    McSvgIcon,
    "btn-loader": BallClipRotateMultipleLoader,
  },
  props: {
    /**
     *  Если нужна ссылка внутри приложения:
     * `{name: 'test', params: { id: test.id }}`
     */
    to: {
      default: null,
    },
    /**
     *  Если нужна обычная ссылка:
     * `https://mediacube.agency/`
     */
    href: {
      default: null,
    },
    /**
     *  По умолчанию ожидается использование в `nuxt.js`
     *
     */
    nuxt: {
      type: Boolean,
      default: true,
    },
    /**
     *  Отключенное состояние
     *
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     *  Индикация загрузки
     *
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     *  Типы:
     *  `button, submit, reset`
     */
    type: {
      type: String,
      default: null,
    },
    /**
     *  Дизайн:
     *  `blue, red, blue-outline, blue-invert, blue-flat и т.д.`
     */
    variation: {
      type: String,
      default: "blue",
    },
    /**
     *  Размеры:
     *  `s, s-compact, m, m-compact, l, l-compact, xl, xl-compact`
     */
    size: {
      type: String,
      default: "m",
    },
    /**
     *  Радиус:
     *  `s, m, l, и т.д.`
     */
    radius: {
      type: String,
      default: "m",
    },
    /**
     *  Тень
     *
     */
    shadow: {
      type: Boolean,
      default: false,
    },
    /**
     *  Круглая
     *
     */
    rounded: {
      type: Boolean,
      default: false,
    },
    /**
     *  Позиция текста внутри кнопки:
     *  `left, center, right`
     */
    textAlign: {
      type: String,
      default: "center",
    },
    /**
     *  На всю ширину
     *
     */
    fullWidth: {
      type: Boolean,
      default: false,
    },
    /**
     *  Если нужно активное состояние
     *
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     *  exact
     *
     */
    exact: {
      type: Boolean,
      default: false,
    },
    /**
     * Uppercase
     */
    uppercase: {
      type: Boolean,
      default: false,
    },
    /**
     * Default tag
     */
    defaultTag: {
      type: String,
      default: "button",
    },
  },
  mounted() {
    FluentRevealEffect.applyEffect(".mc-button--variation-light-effect", {
      lightColor: "rgba(255,255,255,0.5)",
      gradientSize: 150,
      clickEffect: true,
    })
  },
  computed: {
    classes() {
      return {
        [`mc-button--variation-${this.variation}`]: this.variation,
        [`mc-button--size-${this.size}`]: this.size,
        [`mc-button--text-align-${this.textAlign}`]: this.textAlign,
        [`mc-button--radius-${this.radius}`]: this.radius,

        "mc-button--loading": this.loading,
        "mc-button--is-active": this.isActive,
        "mc-button--disabled": this.disabled,
        "mc-button--rounded": this.rounded,
        "mc-button--full-width": this.fullWidth,
        "mc-button--uppercase": this.uppercase,
        "mc-button--shadow": this.shadow,
      }
    },
    tag() {
      if (this.to) {
        return this.nuxt ? "nuxt-link" : "router-link"
      } else if (this.href) {
        return "a"
      }
      return this.defaultTag
    },
    tagBind() {
      const result = {}
      if (this.to) {
        result.to = this.to
      } else if (this.href) {
        result.href = this.href
      } else if (this.disabled || this.loading) {
        result.disabled = true
      }
      result.type = this.type

      return result
    },
    isTagActive() {
      if (this.tag === "nuxt-link") {
        return this.$router.resolve(this.to).route.path === this.$route.path
      }
      return false
    },
  },
}
</script>

<style lang="scss">
$colors: $token-colors;

.mc-button {
  $block-name: &;

  @include reset();
  padding: $space_xxs / 2 $space_m;
  font-family: $font-heading;
  letter-spacing: $spacing-m;
  font-weight: $weight-medium;
  font-size: $size-m;
  line-height: $line-height-m;
  border-radius: $radius-m;
  height: $tappable-element-m;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  text-decoration: none;
  text-transform: none;
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  outline: 0;
  display: inline-flex;
  border: 1px solid transparent;
  justify-content: center;
  position: relative;
  transition: all $duration-quickly;
  flex-wrap: nowrap;
  max-width: 100%;
  align-items: center;
  color: $color-black;
  -webkit-appearance: none;
  -webkit-text-fill-color: currentColor;

  &__loader {
    position: absolute !important;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: none !important;
  }

  &__text {
    @include ellipsis($display: inline-block);
    @include layout-flex-fix();

    &:empty {
      display: none;
    }
  }

  &--size {
    &-s {
      padding: $space_xxs / 2 $space_s;
      letter-spacing: normal;
      font-weight: $weight-bold;
      font-size: $size-s;
      height: $tappable-element-s;

      &-compact {
        @include size($tappable-element-s);
        padding: $space_xxs / 2;
      }

      .mc-svg-icon,
      .mc-avatar {
        &:first-child {
          margin-right: $space_xs;
        }

        &:last-child {
          margin-left: $space_xs;
        }
      }
    }
    &-m {
      padding: $space_xxs / 2 $space_m;
      letter-spacing: $spacing-m;
      font-weight: $weight-medium;
      font-size: $size-m;
      height: $tappable-element-m;

      &-compact {
        @include size($tappable-element-m);
        padding: $space_xxs / 2;
      }

      .mc-svg-icon,
      .mc-avatar {
        &:first-child {
          margin-right: $space_xs;
        }

        &:last-child {
          margin-left: $space_xs;
        }
      }
    }
    &-l {
      padding: $space_xxs / 2 $space_s * 2;
      letter-spacing: $spacing-m;
      font-weight: $weight-medium;
      font-size: $size-m;
      height: $tappable-element-l;

      &-compact {
        @include size($tappable-element-l);
        padding: $space_xxs / 2;
      }

      .mc-svg-icon,
      .mc-avatar {
        &:first-child {
          margin-right: $space_xs;
        }

        &:last-child {
          margin-left: $space_xs;
        }
      }
    }
    &-xl {
      padding: $space_xxs / 2 $space_l;
      letter-spacing: normal;
      font-weight: $weight-medium;
      font-size: $size-l;
      height: $tappable-element-xl;

      &-compact {
        @include size($tappable-element-xl);
        padding: $space_xxs / 2;
      }

      .mc-svg-icon,
      .mc-avatar {
        &:first-child {
          margin-right: $space_s;
        }

        &:last-child {
          margin-left: $space_s;
        }
      }
    }
  }

  @each $color, $value in $colors {
    &--variation-#{$color} {
      @if $color == "white" {
        background-color: $value;

        &:hover,
        &:focus {
          background-color: fade-out($value, 1 - $opacity_hover);
        }

        &:active {
          background-color: fade-out($value, 1 - $opacity_active);
        }

        &-flat {
          color: $value;

          &:hover,
          &:focus {
            opacity: $opacity_hover;
          }

          &:active {
            opacity: $opacity_active;
          }
        }
      } @else {
        background-color: $value;
        color: $color-white;

        &:hover,
        &:focus {
          background-color: darken($value, 10%);
        }

        &:active {
          background-color: darken($value, 15%);
        }

        &#{$block-name} {
          &--shadow {
            box-shadow: 0 3px 10px fade-out($value, 0.8);
          }
        }

        &-blur {
          background-color: fade-out($value, 0.75);
          color: $color-white;
          padding: $space-xxs $space-xs;

          &:hover,
          &:focus {
            background-color: fade-out($value, 0.8);
          }

          &:active {
            background-color: fade-out($value, 0.9);
          }
        }

        &-invert {
          background-color: fade-out($value, 0.9);
          color: $value;

          &:hover,
          &:focus {
            background-color: fade-out($value, 0.8);
          }

          &:active {
            background-color: fade-out($value, 0.75);
          }

          &#{$block-name} {
            &--shadow {
              box-shadow: 0 3px 10px fade-out($value, 0.8);
            }
          }
        }

        &-outline {
          border-color: $value;
          color: $value;

          &:hover,
          &:focus {
            background-color: $value;
            color: $color-white;
          }

          &:active {
            border-color: darken($value, 15%);
            background-color: darken($value, 15%);
          }

          &#{$block-name} {
            &--shadow {
              box-shadow: 0 3px 10px fade-out($value, 0.8);
            }
          }
        }

        &-flat {
          color: $value;

          &:hover,
          &:focus {
            background-color: fade-out($value, 0.9);
          }

          &:active {
            background-color: fade-out($value, 0.85);
          }

          &#{$block-name} {
            &--shadow {
              box-shadow: 0 3px 10px fade-out($value, 0.8);
            }
          }
        }

        &-link {
          color: $value;
          padding: 0;
          height: auto;
          width: auto;
          border: none;
          user-select: text;

          &:hover,
          &:focus {
            color: darken($value, 12%);
          }

          &:active {
            color: darken($value, 16%);
          }

          &#{$block-name} {
            &--disabled {
              opacity: $opacity-disabled;
              background-color: transparent !important;
              color: $value !important;
              border-color: transparent !important;
            }
          }
        }
      }
    }
  }

  &--variation-toxic {
    color: $color-black;
  }

  &--uppercase {
    text-transform: uppercase;
  }

  &--is-active,
  &.nuxt-link-active {
    color: $color-blue;
    background-color: transparent;
    border-color: transparent;
    pointer-events: none;
  }

  &--radius {
    &-m {
      border-radius: $radius-m;
    }
    &-l {
      border-radius: $radius-l * 3;
    }
    &-xl {
      border-radius: $radius-xl;
    }
    &-xxl {
      border-radius: $radius-xxl;
    }
  }

  &--variation-light-effect {
    background-color: $color-secondary-purple;
    color: $color-white;
    border: 0;
    border-radius: 12px;
    &.mc-button--disabled {
      color: $color-deep-gray !important;
      background-color: $color-secondary-gray !important;
      border-color: $color-secondary-gray !important;
    }
  }

  &--rounded {
    border-radius: $radius-circle;
  }

  &--full-width {
    width: 100%;
  }

  &--text-align {
    &-left {
      #{$block-name} {
        &__text {
          margin-right: auto;
        }
      }
    }
    &-center {
      #{$block-name} {
        &__text {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
    &-right {
      #{$block-name} {
        &__text {
          margin-left: auto;
        }
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
    }

    > *:not(#{$block-name}__loader) {
      opacity: 0;
    }
  }

  &--disabled {
    background-color: $color-outline-gray !important;
    color: $color-white !important;
    border-color: $color-outline-gray !important;
  }
}
</style>

<docs>
  ```jsx
  let variations = [
    'blue',
    'dark-green-invert',
    'red-outline',
    'black-flat',
    'white',
    'white-flat',
    'blue-link',
    'light-effect',
    'ezzy-red',
  ]

  <div style="text-align: center">
    <div v-for="(variation, index) in variations" :key="index">

      <McTitle style="margin-bottom: 20px;" size="l">{{ variation }}</McTitle> <br>

      <McButton :variation="variation" class="mc-button--is-active" size="s">
        <McSvgIcon slot="icon-prepend" name="assessment"/>
        Активная
      </McButton>

      <McButton :variation="variation" size="s" radius="xxl">
        <McSvgIcon slot="icon-prepend" name="people"/>
        Маленькая
      </McButton>

      <McButton :variation="variation" size="s">
        <McSvgIcon slot="icon-prepend" name="people"/>
        Маленькая
      </McButton>

      <McButton :variation="variation" loading size="s-compact">
        <McSvgIcon slot="icon-append" name="people"/>
      </McButton>

      <McButton :variation="variation">
        Стандартная
        <McSvgIcon slot="icon-append" name="add"/>
      </McButton>

      <McButton :variation="variation" rounded size="m-compact">
        <McSvgIcon slot="icon-append" name="cancel"/>
      </McButton>

      <McButton :variation="variation" size="l">
        <McSvgIcon slot="icon-prepend" name="create"/>
        Большая
        <McSvgIcon slot="icon-append" name="copyright"/>
      </McButton>

      <McButton uppercase shadow radius="l" :variation="variation" size="l">
        <McSvgIcon fill="#3d8f41" slot="icon-prepend" name="add"/>
        Добавить
      </McButton>

      <McButton :variation="variation" size="l-compact">
        <McSvgIcon slot="icon-append" name="delete"/>
      </McButton>

      <McButton :variation="variation" size="xl">
        <McSvgIcon slot="icon-prepend" name="mediacube" size="m"/>
        Огромная
      </McButton>

      <McButton :variation="variation" disabled size="xl-compact">
        <McSvgIcon slot="icon-append" name="visibility" size="m"/>
      </McButton>

      <br><br>
    </div>

    <McButton variation="gray-dark-invert" size="m" full-width>
      <McSvgIcon slot="icon-prepend" name="assessment"/>
      На всю ширину родителя
      <McSvgIcon slot="icon-append" name="add"/>
    </McButton>
  </div>
  ```
</docs>
