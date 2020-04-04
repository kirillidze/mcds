<script>
import McSvgIcon from "./McSvgIcon"
export default {
  functional: true,
  name: "McTitle",
  components: { McSvgIcon },
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     * Уровень: `h1`, `h2` и т.д.
     */
    level: {
      type: Number,
      default: 2,
    },
    /**
     * Размер: `xs`, `s` и т.д.
     */
    size: {
      type: String,
      default: "m",
    },
    /**
     * Размер: `xs`, `s`, `m`
     */
    lineHeight: {
      type: String,
      default: "xs",
    },
    /**
     * В одну строку с точками в конце, если не вмещается
     */
    ellipsis: {
      type: Boolean,
      default: true,
    },
    /**
     * Цвет
     */
    color: {
      type: String,
      default: "black",
    },
    /**
     * Family: heading, semi-bold, bold, light
     */
    family: {
      type: String,
      default: "heading",
    },
    /**
     * Если нужен другой тэг
     */
    tagName: {
      type: String,
    },
    /**
     * Uppercase
     */
    uppercase: {
      type: Boolean,
      default: false,
    },
    /**
     *  Позиция текста:
     *  `left, center, right`
     */
    textAlign: {
      type: String,
      default: "left",
    },
  },
  render(h, { props, slots, data }) {
    const contentOptions = {
      class: "mc-title__text",
    }
    if (data.domProps && data.domProps.innerHTML) {
      contentOptions.domProps = {
        innerHTML: data.domProps.innerHTML,
      }
    }
    const classes = {
      "mc-title": true,
      [`mc-title--size-${props.size}`]: props.size,
      [`mc-title--line-height-${props.lineHeight}`]: props.lineHeight,
      [`mc-title--family-${props.family}`]: props.family,
      ["mc-title--ellipsis"]: props.ellipsis,
      [`mc-title--color-${props.color}`]: props.color,
      [`mc-title--text-align-${props.textAlign}`]: props.textAlign,
      "mc-title--uppercase": props.uppercase,
      ...(data.class || {}),
    }

    if (data.staticClass) {
      const staticClasses = data.staticClass.split(" ")
      staticClasses.forEach(c => {
        if (c) {
          classes[c] = true
        }
      })
    }
    let style = {}
    if (data.staticStyle) {
      style = data.staticStyle
    }
    return h(
      "component",
      {
        class: classes,
        style,
        is: props.tagName || `h${props.level}`,
      },
      [
        slots()["icon-prepend"],
        h("div", contentOptions, slots()["default"]),
        slots()["icon-append"],
      ]
    )
  },
}
</script>

<style lang="scss">
.mc-title {
  $block-name: &;
  margin-top: 0;
  margin-bottom: 0;
  display: inline-flex;
  max-width: 100%;
  width: 100%;
  text-decoration: none;

  &__text {
    padding-bottom: 1px; // fix overflow
    margin-bottom: -1px; // fix overflow
  }

  .mc-svg-icon {
    font-size: inherit;
    width: 1em;
    height: 1em;
  }

  > .mc-svg-icon,
  .mc-tooltip-target {
    &:first-child {
      margin-right: 0.3em;
    }
    &:last-child {
      margin-left: 0.3em;
    }
  }

  @each $size, $value in $token-sizes {
    &--size-#{$size} {
      font-size: $value;
    }
  }

  @each $line-height, $value in $token-line-heights {
    &--line-height-#{$line-height} {
      line-height: $value;
    }
  }

  &--ellipsis {
    align-items: center;

    #{$block-name} {
      &__text {
        @include ellipsis($display: inline-block);
        @include layout-flex-fix();
      }
    }
  }

  &--uppercase {
    text-transform: uppercase;
  }

  &--color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        color: $value;
      }
    }
  }

  &--family-heading {
    font-family: $font-heading;
    font-weight: $weight-medium;
  }

  &--family-bold {
    font-family: $font-heading;
    font-weight: $weight-bold;
  }

  &--family-semi-bold {
    font-family: $font-heading;
    font-weight: $weight-semi-bold;
  }

  &--family-light {
    font-family: $font-heading;
    font-weight: $weight-light;
  }

  &--family-text {
    font-family: $font-heading;
    font-weight: $weight-medium;
  }

  &--text-align {
    &-left {
      justify-content: flex-start;
    }
    &-center {
      justify-content: center;
    }
    &-right {
      justify-content: flex-end;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McTitle size="s" family="semi-bold" line-height="m">
      <McSvgIcon slot="icon-prepend" name="copyright"/>
      Заголовок123123
    </McTitle>

    <br><br>

    <McTitle size="s">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
      <McSvgIcon slot="icon-append" name="error"/>
    </McTitle>

    <br><br>

    <McTitle size="m">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
      <McSvgIcon slot="icon-append" name="error"/>
    </McTitle>

    <br><br>

    <McTitle size="l">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок
      <McSvgIcon slot="icon-append" name="error"/>
    </McTitle>

    <br><br>

    <McTitle :ellipsis="false" size="xl">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок
      <McSvgIcon slot="icon-append" name="error"/>
    </McTitle>

    <br><br>

    <McTitle uppercase size="xxl">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
    </McTitle>

    <br><br>

    <McTitle size="xxxl">
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
    </McTitle>

    <br><br>

    <McTitle  size="xxxxl" color="blue" >
      <McSvgIcon slot="icon-prepend" name="ready"/>
      Заголовок
    </McTitle>
  </div>
  ```
</docs>
