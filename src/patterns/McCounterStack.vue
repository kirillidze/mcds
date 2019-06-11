<script>
import McCounterBtn from "../elements/McCounterBtn"
export default {
  name: "McCounterStack",
  components: { McCounterBtn },
  status: "deprecated",
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
        class: "mc-counter-stack",
      },
      [
        h(
          "div",
          {
            class: "mc-counter-stack__body",
          },
          this.items
        ),
        this.more <= 0
          ? null
          : h("mc-counter", {
              class: "mc-counter-stack__counter",
              props: {
                count: this.more,
                type: "default",
              },
            }),
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
.mc-counter-stack {
  $block-name: &;

  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 0;
  line-height: 0;

  .el-avatar {
    &:not(:first-child) {
      margin-right: -15px;
    }

    &__border {
      position: relative;
      z-index: 1;
      height: 34px !important;
      width: 34px !important;
    }
  }

  &__body {
    min-width: 0;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
  }

  &__counter {
    margin-left: 5px;
    flex: 0 0 auto;
  }

  .mc-counter-btn {
    &:not(:first-child) {
      margin-right: 10px;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McCounterStack v-for="country in [{id: 2, country_id: 65, payment_methods: ['account_individual', 'card', 'yandexmoney', 'qiwi', 'webmoney', 'eWallet']}]" :key="country.id" :limit="3">
      <McCounterBtn v-for="paymentMethod in country.payment_methods" :key="paymentMethod">
        {{ paymentMethod }}
      </McCounterBtn>
    </McCounterStack>
  </div>
  ```
</docs>
