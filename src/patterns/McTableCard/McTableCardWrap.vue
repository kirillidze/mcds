<template>
  <div class="mc-table-card-wrap">
    <slot name="card"></slot>
    <div class="mc-table-card-wrap__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "McTableCardWrap",
  status: "ready",
  release: "1.0.0",
}
</script>

<style lang="scss">
.mc-table-card-wrap {
  $block-name: &;

  @include position(absolute, 0);
  overflow-y: auto;
  border: 1px solid $color-gray-light;

  > .page-enter-active,
  > .page-leave-active {
    transition: opacity $transition-time, transform $transition-time;
  }
  > .page-enter,
  > .page-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  &__inner {
    border-bottom: 1px solid $color-gray-light;
    margin-bottom: -1px;
  }

  .mc-table-head,
  .mc-table-body,
  .mc-table-foot {
    border-left: none;
    border-right: none;
  }

  th.mc-table-cell {
    &::before {
      display: none;
    }
  }

  .mc-table-foot {
    .mc-table-cell {
      border-bottom: none;
    }
  }
}
</style>
