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

    return h(
      "div",
      {
        class: {
          "mc-stack": true,
          [`${data.staticClass}`]: data.staticClass,
        },
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
  <div>
    <McStack :limit="5">
      <McAvatar rounded lazy size="s"/>
      <McAvatar rounded lazy size="s"/>
      <McAvatar rounded lazy size="s"/>
      <McAvatar rounded lazy size="s"/>
      <McAvatar rounded lazy size="s"/>
      <McAvatar rounded lazy size="s"/>
      <McAvatar rounded lazy size="s"/>
      <McAvatar rounded lazy size="s"/>
      <McAvatar rounded lazy size="s"/>
    </McStack>
    <br>
    <McStack :limit="4">
      <McChip style="width: 150px;" variation="gray-dark-invert">Статусы в проектах</McChip>
      <McChip style="width: 150px;" variation="gray-dark-invert">Экспорт канала</McChip>
      <McChip style="width: 150px;" variation="gray-dark-invert">Администратор</McChip>
      <McChip style="width: 150px;" variation="gray-dark-invert">Пользователь</McChip>
      <McChip style="width: 150px;" variation="gray-dark-invert">Способы оплаты</McChip>
      <McChip style="width: 150px;" variation="gray-dark-invert">Статусы в проектах</McChip>
    </McStack>
  </div>
  ```
</docs>
