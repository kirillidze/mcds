<template>
  <mc-grid-row class="mc-get-info" align="middle" :gutter-x="10">
    <mc-grid-col v-if="total === null" class="mc-get-info__btn">
      <!-- @slot Слот по умолчанию -->
      <slot />
    </mc-grid-col>
    <mc-grid-col v-else class="mc-get-info__text">
      <!-- @slot Слот для отображаемой информации -->
      <slot name="answer" />
    </mc-grid-col>
  </mc-grid-row>
</template>

<script>
import McButton from "./McButton"
import McGridRow from "../patterns/McGrid/McGridRow"
import McGridCol from "../patterns/McGrid/McGridCol"
export default {
  name: "McGetInfo",
  status: "ready",
  release: "1.0.0",
  components: {
    McGridCol,
    McGridRow,
    McButton,
  },
  props: {
    total: {
      type: [Object, Number, String],
      default: null,
    },
  },
}
</script>

<style lang="scss">
.mc-get-info {
  $block-name: &;

  margin: 0 !important;

  &__text {
    @include ellipsis();
    color: $color-gray;
    font-size: $size-m;
    font-weight: $weight-medium;
    line-height: line-height(19, 16);
    text-transform: lowercase;
    font-family: $font-heading;
  }

  &__btn {
    @include ellipsis();
  }
}
</style>

<docs>
    ```jsx

    let total = null;

    <mc-get-info :total="total" >
        <mc-button size="s" variation="blue-link" uppercase @click.prevent="_ => total = 10">
            Button
        </mc-button>
        <template slot="answer">
            {{ total }} items
        </template>
    </mc-get-info>

    ```
</docs>
