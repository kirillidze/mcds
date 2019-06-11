<template>
  <div class="mc-counter-btn">
    <span class="mc-counter-btn__text">
      <slot></slot>
    </span>
    <ElCounter v-if="count" class="mc-counter-btn__counter" :count="count" />
  </div>
</template>

<script>
import ElCounter from "./McCounter"
export default {
  name: "McCounterBtn",
  status: "deprecated",
  release: "1.0.0",
  components: { ElCounter },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss">
.mc-counter-btn {
  $block-name: &;

  color: #222222;
  font-family: $font-text;
  font-size: 16px;
  line-height: line-height(19, 16);
  font-weight: 400;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  min-width: 0;
  text-align: center;

  &__text {
    @include ellipsis();
    border-radius: 16px;
    background-color: #e8e8e8;
    padding: 7px 15px;
    width: 100%;
  }

  &__counter {
    flex: 0 0 auto;
    margin-left: 5px;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McCounterBtn style="width: 170px;" :count="122">
       Владиленов
    </McCounterBtn>
  </div>
  ```
</docs>
