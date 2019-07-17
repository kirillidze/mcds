<template>
  <div class="mc-table-infinity-wrap">
    <div class="mc-table-infinity-wrap__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "McTableInfinityWrap",
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
.mc-table-infinity-wrap {
  $block-name: &;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    transition: background 0.3s;
  }
  ::-webkit-scrollbar-track {
    //background: rgba(0, 0, 0, 0.1);
    //border: 1px solid #dcdcdc;
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(240, 4%, 91%);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #c1c1c1;
  }
  ::-webkit-scrollbar-thumb:active {
  }

  overflow-y: auto;
  border: 1px solid $color-gray-light;
  // border-radius: $radius-l;

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
    &:not(.mc-table--loading) {
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
