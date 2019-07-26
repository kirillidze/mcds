<template>
  <McGridRow class="mc-get-info" align="middle" :gutter-x="10">
    <McGridCol v-if="total === null" class="mc-get-info__btn">
      <slot></slot>
    </McGridCol>
    <McGridCol v-else class="mc-get-info__text">
      <slot name="answer"></slot>
    </McGridCol>
  </McGridRow>
</template>

<script>
import McButton from "./McButton"
import McGridRow from "../patterns/McGrid/McGridRow"
import McGridCol from "../patterns/McGrid/McGridCol"
export default {
  name: "McGetInfo",
  status: "deprecated",
  release: "1.0.0",
  components: {
    McGridCol,
    McGridRow,
    McButton,
  },
  props: {
    total: {},
  },
}
</script>

<style lang="scss">
.mc-get-info {
  $block-name: &;

  margin: 0 !important;

  &__text {
    @include ellipsis();
    color: $gray-light;
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

    <McGetInfo :total="total" >
        <McButton
            size="s"
            variation="primary-link"
            @click.prevent="_ => total = 10"
            uppercase
        >
            Button
        </McButton>
        <template slot="answer">
            {{ total }} items
        </template>
    </McGetInfo>

    ```
</docs>
