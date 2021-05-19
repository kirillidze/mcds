<template>
  <div class="mc-header-nav-item">
    <!-- @slot Слот контента -->
    <slot />
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
    <mc-header-nav-item>
      <mc-button href="javascript:void(0);" variation="black-flat">
        <mc-svg-icon slot="icon-prepend" name="public" />
        Пункт меню
      </mc-button>
    </mc-header-nav-item>
  </div>
  ```
</docs>
