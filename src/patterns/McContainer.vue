<template>
  <div class="mc-container">
    <!-- @slot Слот контента -->
    <slot />
  </div>
</template>

<script>
export default {
  name: "McContainer",
  status: "ready",
  release: "1.0.0",
}
</script>

<style lang="scss">
.mc-container {
  $block-name: &;

  padding-left: $space-s;
  padding-right: $space-s;

  background-color: $color-white;
}
</style>

<docs>
  ```jsx
  <mc-container>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam commodi ea necessitatibus. Aspernatur distinctio doloribus expedita inventore, molestias mollitia quia.
  </mc-container>
  ```
</docs>
