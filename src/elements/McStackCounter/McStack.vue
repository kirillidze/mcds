<script>
import McAvatar from "../McAvatar/McAvatar"
import McChip from "../McChip"
export default {
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
  render(h) {
    return h(
      "div",
      {
        class: "mc-stack",
      },
      [
        h(
          "div",
          {
            class: "mc-stack__body",
          },
          this.items
        ),
        this.more > 0
          ? h("McStackCounter", {
              class: "mc-stack__counter",
              props: {
                count: this.more,
                type: "default",
              },
            })
          : null,
      ]
    )
  },
  computed: {
    renderItems() {
      let items = this.$slots["default"]
      return items == null ? [] : items.filter(i => i.tag != null)
    },
    items() {
      let items = this.renderItems
      if (this.limit == null) return items
      return items.slice(0, this.limit)
    },
    more() {
      return this.renderItems.length - this.items.length
    },
  },
}
</script>

<style lang="scss">
.mc-stack {
  $block-name: &;

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
      <McChip style="width: 150px;" variation="gray-darkest-invert">Статусы в проектах</McChip>
      <McChip style="width: 150px;" variation="gray-darkest-invert">Экспорт канала</McChip>
      <McChip style="width: 150px;" variation="gray-darkest-invert">Администратор</McChip>
      <McChip style="width: 150px;" variation="gray-darkest-invert">Пользователь</McChip>
      <McChip style="width: 150px;" variation="gray-darkest-invert">Способы оплаты</McChip>
      <McChip style="width: 150px;" variation="gray-darkest-invert">Статусы в проектах</McChip>
    </McStack>
  </div>
  ```
</docs>
