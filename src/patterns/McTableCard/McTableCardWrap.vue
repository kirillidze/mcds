<template>
  <div class="mc-table-card-wrap">
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

  .mc-table {
    &:not(.mc-table--loading):not(.mc-table--compleate) {
      .mc-table-body {
        .mc-table-row {
          &:last-child {
            .mc-table-cell {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
}
</style>
