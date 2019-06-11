<template>
  <div class="mc-counter" :class="classObject">+{{ count }}</div>
</template>

<script>
export default {
  name: "McCounter",
  status: "deprecated",
  release: "1.0.0",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "inherit",
    },
  },

  computed: {
    classObject() {
      return {
        [`mc-counter--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-counter {
  $block-name: &;

  &--type-inherit {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
  }

  &--type-default {
    color: #222222;
    font-family: $font-text;
    font-size: 16px;
    line-height: line-height(19, 16);
    font-weight: 400;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McCounter type="default" :count="10"/>
  </div>
  ```
</docs>
