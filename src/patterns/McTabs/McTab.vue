<template>
  <section
    v-show="isActive"
    :aria-hidden="!isActive"
    class="tabs-component-panel"
    :id="computedId"
    role="tabpanel"
  >
    <!-- @slot контента -->
    <slot />
  </section>
</template>

<script>
import Tab from "vue-tabs-component/src/components/Tab"
/**
 * Смотреть McTabs
 */
export default {
  name: "McTab",
  status: "ready",
  release: "0.0.1",
  extends: Tab,
  props: {
    id: { default: null },
    name: { required: true },
    prefix: { default: "" },
    suffix: { default: "" },
    isDisabled: { default: false },
  },
}
</script>

<style lang="scss">
.tabs-component-panel {
  $block-name: &;
}
</style>
