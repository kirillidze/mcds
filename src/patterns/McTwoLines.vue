<template>
  <div class="mc-two-lines">
    <div class="mc-two-lines__title" v-if="title">
      {{ title }}
    </div>
    <div class="mc-two-lines__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "McTwoLines",
  status: "deprecated",
  release: "1.0.0",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss">
.mc-two-lines {
  &__title {
    text-transform: uppercase;
    font-size: $size-xs;
    font-weight: $weight-medium;
    margin-bottom: $space-xxs;
  }
  &__content {
    font-weight: $weight-semi-bold;
  }
}
</style>

<docs>
    ```jsx
    <div>
        <McTwoLines title="Бюджет">
            1 200 $
        </McTwoLines>
    </div>
    ```
</docs>
