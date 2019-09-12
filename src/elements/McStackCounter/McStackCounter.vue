<template>
  <div class="mc-stack-counter">+{{ count }}</div>
</template>

<script>
export default {
  name: "McStackCounter",
  status: "ready",
  release: "1.0.0",
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss">
.mc-stack-counter {
  $block-name: &;

  color: $color-black;
  font-family: $font-heading;
  font-size: $size-m;
  line-height: $line-height-s;
  font-weight: $weight-normal;
}
</style>

<docs>
  ```jsx
  <div>
    <McStackCounter type="default" :count="10"/>
  </div>
  ```
</docs>
