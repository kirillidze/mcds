<template>
  <div class="mc-preview">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "McPreview",
  status: "ready",
  release: "1.0.0",
  props: {},
}
</script>

<style lang="scss">
.mc-preview {
  $block-name: &;
}
</style>

<docs>
  ```jsx
  <div>
    <McPreview>
      lorem
    </McPreview>
  </div>
  ```
</docs>
