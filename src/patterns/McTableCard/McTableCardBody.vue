<template>
  <article class="mc-table-card-body" :class="classes">
    <div class="mc-table-card-body__inner" v-if="$slots.default">
      <slot />
    </div>
    <template v-else>
      <div class="mc-table-card-body__left">
        <div class="mc-table-card-body__inner">
          <slot name="left" />
        </div>
      </div>
      <div class="mc-table-card-body__right">
        <div class="mc-table-card-body__inner">
          <slot name="right" />
        </div>
      </div>
    </template>
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

  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;

  &__left,
  &__right {
    position: relative;
  }

  &__inner {
    @include position(absolute, 0);
    overflow-y: auto;
  }

  &--variation-default {
    #{$block-name} {
      &__left {
        width: calc(100% - 240px);
        border-right: 1px solid $color-gray-light;
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
}
</style>
