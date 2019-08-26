<template>
  <div class="mc-header-nav-item" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import McButton from "../../../elements/McButton"
import McSvgIcon from "../../../elements/McSvgIcon"
export default {
  name: "McHeaderNavItem",
  components: { McSvgIcon, McButton },
  status: "ready",
  release: "0.0.1",
  computed: {
    classes() {
      return {
        //[`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-header-nav-item {
  $block-name: &;

  @include reset-text-indents();
  position: relative;
  margin-left: $space-xxs;
  margin-right: $space-xxs;
  z-index: 2;

  .mc-button {
    &--size-m {
      padding-left: $space-xs;
      padding-right: $space-xs;
    }
    &--size-l-compact {
      width: $avatar-l;
      height: $avatar-l;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McHeaderNavItem>
      <McButton href="javascript:void(0);" variation="gray-dark-flat">
        <McSvgIcon slot="icon-prepend" name="public" />
        Пункт меню
      </McButton>
    </McHeaderNavItem>
  </div>
  ```
</docs>
