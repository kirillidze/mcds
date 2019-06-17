<template>
  <component
    :is="tag"
    :class="classes"
    v-bind="tagBind"
    class="mc-button"
    v-on="$listeners"
    :exact="exact"
  >
    <slot name="icon-prepend" />
    <btn-loader class="mc-button__loader" color="inherit" size="19px"></btn-loader>
    <span class="mc-button__text">
      <slot />
    </span>
    <slot name="icon-append" />
  </component>
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import { BallClipRotateMultipleLoader } from "vue-loaders"
import McSvgIcon from "./McSvgIcon"
export default {
  name: "McButton",
  status: "ready",
  release: "1.0.0",
  components: {
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
     *  `primary, secondary, primary-outline, primary-invert, primary-flat и т.д.`
     */
    variation: {
      type: String,
      default: "primary",
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
  },

  computed: {
    classes() {
      return {
        [`mc-button--variation-${this.variation}`]: this.variation,
        [`mc-button--size-${this.size}`]: this.size,
        [`mc-button--text-align-${this.textAlign}`]: this.textAlign,

        "mc-button--loading": this.loading,
        "mc-button--is-active": this.isActive,
        "mc-button--disabled": this.disabled,
        "mc-button--rounded": this.rounded,
        "mc-button--full-width": this.fullWidth,
      }
    },
    defaultTag() {
      return "button"
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
$colors: (
  "primary": $color-primary,
  "secondary": $color-secondary,
  "danger": $color-danger,
  "soft-green-dark": $color-soft-green-dark,
  "gray-darkest": $color-gray-darkest,
  "white": $color-white,
);

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
  color: $color-text;
  -webkit-appearance: none;
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
    @include ellipsis($display: inline-flex);
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
        }
      }
    }
  }

  &--is-active,
  &.nuxt-link-active {
    color: $color-primary;
    background-color: transparent;
    border-color: transparent;
    pointer-events: none;
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
    background-color: $color-gray-lighten !important;
    color: $color-white !important;
    border-color: $color-gray-lighten !important;
  }
}
</style>

<docs>
  ```jsx
  let variations = [
    'primary',
    'link',
    'soft-green-dark-invert',
    'danger-outline',
    'gray-darkest-flat',
    'white',
    'white-flat',
  ]

  <div style="text-align: center">
    <div v-for="(variation, index) in variations" :key="index">
      <McButton :variation="variation" class="mc-button--is-active" size="s">
        <McSvgIcon slot="icon-prepend" name="assessment"/>
        Активная
      </McButton>

      <McButton :variation="variation">
        Без отступов
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

    <McButton variation="gray-darkest-invert" size="m" full-width>
      <McSvgIcon slot="icon-prepend" name="assessment"/>
      На всю ширину родителя
      <McSvgIcon slot="icon-append" name="add"/>
    </McButton>
  </div>
  ```
</docs>
