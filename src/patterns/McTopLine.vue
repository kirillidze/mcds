<template>
  <section class="mc-top-line">
    <div class="mc-top-line__left">
      <slot></slot>
    </div>
    <div class="mc-top-line__right">
      <slot name="right"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "McTopLine",
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
.mc-top-line {
  $block-name: &;

  display: flex;
  flex-wrap: nowrap;
  background-color: $color-white;
  padding-top: $space-xs;
  padding-bottom: $space-xs;
  padding-left: $space_xxs;
  padding-right: $space_xxs;
  align-items: center;
  height: $tappable-element-l + 8px;

  &__left,
  &__right {
    @include layout-flex-fix();
    display: flex;
    flex-wrap: nowrap;

    &:empty {
      display: none;
    }

    > * {
      margin-left: $space-m / 2;
      margin-right: $space-m / 2;
    }
  }

  &__left {
    margin-right: auto;
  }

  &__right {
    margin-left: auto;
  }
}
</style>
