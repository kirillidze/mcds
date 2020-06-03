<script>
import McAvatar from "../McAvatar/McAvatar"
import McChip from "../McChip"
import McStackCounter from "./McStackCounter"
export default {
  inject: {
    components: {
      default: {
        McStackCounter,
      },
    },
  },
  functional: true,
  name: "McStack",
  components: { McChip, McAvatar },
  status: "ready",
  release: "1.0.0",

  props: {
    limit: {
      type: Number,
      default: null,
    },
  },
  render(h, { props, slots, data, injections }) {
    let items = slots()["default"]
    const renderItems = items ? items.filter(i => i.tag !== null) : []
    items = props.limit === null ? renderItems : renderItems.slice(0, props.limit)
    const more = renderItems.length - items.length

    const classes = {
      "mc-stack": true,
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
      "div",
      {
        class: classes,
        style,
      },
      [
        h(
          "div",
          {
            class: "mc-stack__body",
          },
          items
        ),
        more > 0
          ? h("component", {
              is: injections.components.McStackCounter,
              class: "mc-stack__counter",
              props: {
                count: more,
                type: "default",
              },
            })
          : null,
      ]
    )
  },
}
</script>

<style lang="scss">
.mc-stack {
  $block-name: &;

  position: relative;
  @include reset-text-indents();
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  &__body {
    min-width: 0;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row-reverse;

    .mc-avatar {
      border: 2px solid $color-white;

      &:not(:first-child) {
        margin-right: -$space-s;
      }
    }

    .mc-chip {
      justify-content: center;

      &:not(:first-child) {
        margin-right: $space-xs + 2;
      }
    }
  }

  &__counter {
    margin-left: $space-xs;
    flex: 0 0 auto;
  }
}
</style>

<docs>
  ```jsx
  let categories = require('../../mocks/categories').default
  <div>
    <mc-stack :limit="5">
      <mc-avatar v-for="num in 9" :key="num" rounded lazy size="s" />
    </mc-stack>
    <br>
    <mc-stack :limit="2">
      <mc-chip v-for="(category, index) in categories" :key="index" style="width: 150px;" variation="gray-dark-invert">
        {{ category.title }}
      </mc-chip>
    </mc-stack>
  </div>
  ```
</docs>
