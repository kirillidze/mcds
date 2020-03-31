<script>
import tokens from "../../assets/tokens/tokens"
export default {
  functional: true,
  name: "McTableCell",

  props: {
    tag: {
      type: String,
      default: "td",
    },
    item: {
      type: Object,
      default: null,
    },
    size: {
      type: String,
      default: "m",
    },
    checkable: {
      type: Boolean,
      default: false,
    },
  },

  render(h, { props, slots, data }) {
    let style = {}
    if (props.item) {
      style.width = props.item.width
      style.borderRight = props.item.hasBorder ? `1px solid ${tokens.color_outline_gray}` : null
    }

    if (data.staticStyle) {
      style = {
        ...style,
        ...data.staticStyle,
      }
    }
    return h(
      "component",
      {
        class: {
          "mc-table-cell": true,
          [`mc-table-cell--size-${props.size}`]: props.size,
          "mc-table-cell--checkable": props.checkable,
          [`${data.staticClass}`]: data.staticClass,
        },
        style,
        is: props.tag,
      },
      [
        h(
          "div",
          {
            class: "mc-table-cell__inner",
          },
          slots()["default"]
        ),
      ]
    )
  },
}
</script>

<style lang="scss">
.mc-table-cell {
  $block-name: &;

  @include reset-text-indents();
  border-bottom: 1px solid $color-outline-gray;
  vertical-align: middle;
  position: relative;

  &__inner {
    @include layout-flex-fix();
    display: flex;
    align-items: center;
  }

  &:first-child {
    // position: sticky;
    // left: 0;
    // z-index: 1;
  }

  &--size-m {
    height: $tappable-element-l;
    padding: $space-xxxs $space_m / 2;
  }
  &:not(#{$block-name}) {
    &--height-fixed {
      height: auto;
    }
  }

  .mc-field-text {
    &__footer {
      display: none;
    }
  }

  .mc-bage--vertical-line {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .mc-field-checkbox,
  .mc-button,
  .mc-field-text,
  .mc-button {
    position: relative;
    z-index: 2;
  }

  &--checkable {
    #{$block-name} {
      &__inner {
        display: flex;
        align-items: center;

        .mc-field-checkbox {
          flex: 0 0 auto;
          margin-right: 12px;

          + * {
            @include layout-flex-fix();
            flex: 1 1 auto;
          }
        }
      }
    }
  }

  & .mc-grid-row {
    position: absolute;
    top: 0;
    right: 2.5px;
    bottom: 0;
    height: 100%;
    background: #fff;
    align-items: center;
    padding-right: 8px;
    padding-left: 4px;
    display: flex;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      right: 100%;
      bottom: 0;
      height: 100%;
      width: 16px;
      background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, #fff);
    }
  }
}

th.mc-table-cell {
  $block-name: &;

  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: $color-white;
  z-index: 3;
  border-bottom: none;

  &::before,
  &::after {
    @include position(absolute, 0);
    @include pseudo();
    height: 1px;
    background-color: $color-outline-gray;
  }

  &::before {
    bottom: auto;
  }

  &::after {
    top: auto;
  }
}
</style>
