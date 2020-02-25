<template>
  <div class="mc-table-card-wrap" :class="classes">
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
    /** Добавляет горизонтальный скролл таблице
     *
     */
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    innerClasses() {
      return {
        [`mc-table-card-wrap__inner--size-${this.titleSize}`]: this.titleSize,
      }
    },
    classes() {
      return {
        ["mc-table-card-wrap--scrollable"]: this.scrollable,
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

  &--scrollable {
    #{$block-name}__inner-2 {
      border-bottom: none;
    }

    .mc-table {
      &-head {
        .mc-table-cell {
          position: relative;
        }
      }

      &-foot {
        .mc-table-cell {
          border-bottom: 1px solid $color-outline-gray;
        }
      }

      .mc-table-row {
        .mc-table-cell:first-child {
          position: sticky !important;
          left: 0;
          z-index: $z-index-sticky;
          background-color: $color-white;
          &::before {
            @include position(absolute, 0 -1px 0 100%);
            content: "";
            display: block;
            height: 100%;
            width: 1px;
            background-color: $color-outline-gray;
          }
        }

        &--link:hover {
          .mc-table-cell:first-child {
            background-color: rgb(244, 244, 244) !important;
          }
        }
      }
    }
  }
}
</style>
