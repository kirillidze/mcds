<template>
  <div class="mc-table-card" :style="{ marginLeft: ml + 'px' }">
    <div class="mc-table-card__header">
      <slot name="header"></slot>
    </div>
    <div class="mc-table-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "McTableCard",
  props: {
    ml: {
      type: Number,
      default: 252,
    },
  },
  computed: {
    classes() {
      return {
        // [`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table-card {
  $block-name: &;

  @include position(absolute, 0);
  z-index: 10;
  margin-left: 252px;
  background-color: $color-white;
  border: 1px solid $color-gray-light;
  display: flex;
  flex-direction: column;

  &__header {
    height: $tappable-element-l;
    border-bottom: 1px solid $color-gray-light;
    flex-shrink: 0;
  }

  &__body {
    flex-grow: 1;
  }
}
</style>
