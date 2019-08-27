<template>
  <McButton
    class="mc-header-search-item"
    :href="item.href"
    :to="item.to"
    text-align="left"
    variation="black-flat"
    size="l"
    full-width
    @click.native="handleClick"
  >
    <McAvatar
      class="mc-header-search-item__avatar"
      slot="icon-prepend"
      :src="item.avatar"
      size="s"
      rounded
    />
    {{ item.name }}
  </McButton>
</template>

<script>
import McButton from "../../../elements/McButton"
import McSvgIcon from "../../../elements/McSvgIcon"
import McAvatar from "../../../elements/McAvatar/McAvatar"
export default {
  name: "McHeaderSearchItem",
  components: { McAvatar, McSvgIcon, McButton },
  status: "ready",
  release: "0.0.1",
  props: {
    /**
     *  Результат
     *
     */
    item: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleClick() {
      this.$emit("click-item")
    },
  },
}
</script>

<style lang="scss">
.mc-header-search-item {
  $block-name: &;

  padding-left: $space-xs;
  padding-right: $space-xs;

  &__avatar {
    flex: 0 0 auto;
  }
}
</style>

<docs>
  ```jsx
  let searchResult = require('@/mocks/searchResult').default;
  let eventTest = (val) => alert(val)
  <div>
    <McHeaderSearchItem
            :item="searchResult[0].items[0]"
    />
  </div>
  ```
</docs>
