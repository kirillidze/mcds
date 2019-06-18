<template>
  <section class="mc-lines">
    <div class="mc-lines__title">
      <slot name="title">
        <McTitle size="xs" uppercase>{{ title }}</McTitle>
      </slot>
    </div>
    <div class="mc-lines__content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import McTitle from "./McTitle"
export default {
  name: "McLines",
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
.mc-lines {
  &__title {
    margin-bottom: $space-xxxs;
  }
  &__content {
  }
}
</style>

<docs>
    ```jsx
    <div>
        <McLines title="Бюджет">
            <McTitle tag-name="p" size="m">
                30 000 $
            </McTitle>
        </McLines>

        <br>

        <McLines>
            <McTitle uppercase slot="title" size="s">
                Имя Фамилия
            </McTitle>
            <McTitle tag-name="p" size="l">
                MediaCube Network
            </McTitle>
        </McLines>

        <br>

        <McLines>
            <McTitle uppercase color="primary" slot="title" size="m">
                Имя Фамилия
            </McTitle>
            <McTitle tag-name="p" size="xl">
                MediaCube Network
            </McTitle>
        </McLines>
    </div>
    ```
</docs>
