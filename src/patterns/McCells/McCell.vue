<template>
  <section class="mc-cell">
    <div class="mc-cell__title">
      <slot name="title">
        <McTitle size="xs" uppercase>{{ title }}</McTitle>
      </slot>
    </div>
    <div class="mc-cell__content">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import McTitle from "../../elements/McTitle"
export default {
  name: "McCell",
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
.mc-cell {
  @include reset-text-indents();

  &__title {
    margin-bottom: $space-xxs;
  }

  &__content {
    display: flex;
    flex-direction: column;

    > *:not(:first-child) {
      margin-top: $space-xxs;
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        <McCell title="Бюджет">
            <McTitle tag-name="p" size="m">
                30 000 $
            </McTitle>
        </McCell>

        <br>

        <McCell title="Бюджет">
            <McTitle tag-name="p" size="m">
                30 000 $
            </McTitle>
            <McTitle size="xs" uppercase>
                app/aug
            </McTitle>
        </McCell>

        <br>

        <McCell>
            <McTitle uppercase slot="title" size="s">
                Имя Фамилия
            </McTitle>
            <McTitle tag-name="p" size="l">
                MediaCube Network
            </McTitle>
        </McCell>

        <br>

        <McCell>
            <McTitle uppercase color="primary" slot="title" size="m">
                Имя Фамилия
            </McTitle>
            <McTitle tag-name="p" size="xl">
                MediaCube Network
            </McTitle>
        </McCell>
    </div>
    ```
</docs>
