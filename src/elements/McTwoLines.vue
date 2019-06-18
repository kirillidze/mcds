<template>
  <section class="mc-two-lines">
    <div class="mc-two-lines__title">
      <slot name="title">
        <McTitle size="xs">{{ title }}</McTitle>
      </slot>
    </div>
    <div class="mc-two-lines__content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import McTitle from "./McTitle"
export default {
  name: "McTwoLines",
  components: { McTitle },
  status: "ready",
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
    margin-bottom: $space-xxxs;
  }
  &__content {
  }
}
</style>

<docs>
    ```jsx
    <div>
        <McTwoLines title="Бюджет">
            <McTitle tag-name="p" size="m">
                30 000 $
            </McTitle>
        </McTwoLines>

        <br>

        <McTwoLines>
            <McTitle slot="title" size="s">
                Имя Фамилия
            </McTitle>
            <McTitle tag-name="p" size="l">
                MediaCube Network
            </McTitle>
        </McTwoLines>

        <br>

        <McTwoLines>
            <McTitle color="primary" slot="title" size="m">
                Имя Фамилия
            </McTitle>
            <McTitle tag-name="p" size="xl">
                MediaCube Network
            </McTitle>
        </McTwoLines>
    </div>
    ```
</docs>
