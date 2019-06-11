<template>
  <div class="mc-header-search-list">
    <div class="mc-header-search-list__item" v-for="(item, index) in items" :key="index">
      <div class="mc-header-search-list__headline">
        <div class="mc-header-search-list__headline-text">
          <h4 class="mc-header-search-list__headline-title">
            {{ item.title }}
          </h4>
          <McButton
            variation="primary-flat"
            size="m"
            @click.native="handleClickSearchAll"
            :href="item.button.href"
            :to="item.button.to"
            exact
          >
            <McSvgIcon slot="icon-append" name="arrow_forward_ios" size="xxs" />
            {{ item.button.name }}
          </McButton>
        </div>
      </div>
      <div class="mc-header-search-list__body">
        <McHeaderSearchItem
          v-for="item in item.items"
          :item="item"
          :key="item.key"
          @click-item="handleClickSearchItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import McButton from "../../../elements/McButton"
import McHeaderSearchItem from "../McHeaderSearch/McHeaderSearchItem"
import McSvgIcon from "../../../elements/McSvgIcon"

export default {
  name: "McHeaderSearchList",
  components: { McSvgIcon, McHeaderSearchItem, McButton },
  status: "ready",
  release: "0.0.1",
  props: {
    /**
     *  Список результатов
     *
     */
    items: {
      type: Array,
      default: null,
    },
  },
  computed: {},
  methods: {
    handleClickSearchItem() {
      this.$emit("click-search-item")
    },
    handleClickSearchAll() {
      this.$emit("click-search-all")
    },
  },
}
</script>

<style lang="scss">
.mc-header-search-list {
  $block-name: &;

  padding: $space_xs;

  &__item {
    &:not(:last-child) {
      border-bottom: 2px solid $color-border;
      padding-bottom: $space_xs;
      margin-bottom: $space_xs;
    }
  }

  &__headline {
    display: flex;
    flex-wrap: nowrap;
    padding-left: $space_xs;
    padding-bottom: $space_xs;

    .mc-button {
      &--size-m {
        padding-left: $space_s;
        padding-right: $space_xs;
      }
    }
  }

  &__headline-text {
    flex: 1 1 auto;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }

  &__headline-title {
    @include ellipsis();

    font-family: $font_heading;
    color: $color-gray-darken;
    font-size: $size-m;
    font-weight: $weight-medium;
    line-height: $line-height-s;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: $space-m;
  }

  &__body {
  }
}
</style>

<docs>
  ```jsx
  let searchResult = require('@/mocks/searchResult').default;
  <div>
    <McHeaderSearchList :items="searchResult"/>
  </div>
  ```
</docs>
