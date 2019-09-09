<template>
  <div class="mc-table-card-wrap">
    <slot name="card"></slot>
    <div class="mc-table-card-wrap__inner" :class="innerClasses">
      <div class="mc-table-card-wrap__inner-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "McTableCardWrap",
  status: "ready",
  release: "1.0.0",
  props: {
    /** Ширина левого столбца таблицы (xs = 190px, s = 215px, m = 251px, l = 300px, xl = 350px)
     *
     */
    titleSize: {
      type: String,
      default: "m",
    },
  },
  computed: {
    innerClasses() {
      return {
        [`mc-table-card-wrap__inner--size-${this.titleSize}`]: this.titleSize,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table-card-wrap {
  $sizes: (
    xs: 190px,
    s: 215px,
    m: 251px,
    l: 300px,
    xl: 350px,
  );
  $block-name: &;

  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > .page-enter-active,
  > .page-leave-active {
    transition: opacity $duration-standart ease, transform $duration-standart ease;
  }
  > .page-enter,
  > .page-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  &__inner {
    @include position(absolute, 0);
    overflow-y: auto;
    border: 1px solid $color-outline-gray;
    border-radius: 8px 8px 0 0;
  }

  &__inner-2 {
    border-bottom: 1px solid $color-outline-gray;
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

  .mc-table-card {
    & + .mc-table-card-wrap__inner {
      border-top-right-radius: 0;
      overflow-x: hidden;
      box-sizing: content-box;

      &--size {
        @each $key, $value in $sizes {
          &-#{$key} {
            width: $value;
            .mc-table-cell {
              max-width: $value - 5px;
            }
          }
        }
      }

      .mc-table {
        table-layout: auto;
      }

      .mc-table-row {
        box-sizing: border-box;
        .mc-table-cell {
          border-right: none !important;
          &:not(:first-child) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
