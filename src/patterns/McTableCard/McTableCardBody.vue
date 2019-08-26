<template>
  <article class="mc-table-card-body" :class="classes">
    <div class="mc-table-card-body__inner">
      <slot>
        <div class="mc-table-card-body__left">
          <div class="mc-table-card-body__inner-col">
            <slot name="left" />
          </div>
        </div>
        <div class="mc-table-card-body__right">
          <div class="mc-table-card-body__inner-col">
            <slot name="right" />
          </div>
        </div>
      </slot>
    </div>
  </article>
</template>

<script>
export default {
  name: "McTableCardBody",
  props: {
    variation: {
      type: String,
      default: "default",
    },
  },
  computed: {
    classes() {
      return {
        [`mc-table-card-body--variation-${this.variation}`]: this.variation,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table-card-body {
  $block-name: &;

  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__inner {
    @include position(absolute, 0);
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    overflow-y: auto;
  }

  &__left,
  &__right {
    position: relative;
  }

  &__inner-col {
    @include position(absolute, 0);
    overflow-y: auto;
  }

  &--variation-default {
    #{$block-name} {
      &__left {
        width: calc(100% - 240px);
        border-right: 1px solid $color-outline-gray;
        flex: 1 1 auto;

        @media #{$media-query-xxl} {
          flex: 0 1 auto;
          width: 75%;
        }
      }

      &__right {
        width: 240px;
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;

        @media #{$media-query-xxl} {
          flex: 0 1 auto;
          width: 25%;
        }
      }
    }
  }

  th.mc-table-cell {
    &::before {
      display: block;
    }
  }
}
</style>
