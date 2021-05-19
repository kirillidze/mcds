<template>
  <section class="mc-cell">
    <div class="mc-cell__title">
      <!-- @slot Слот заголовка -->
      <slot name="title">
        <mc-title size="xs" uppercase>{{ title }}</mc-title>
      </slot>
    </div>
    <div class="mc-cell__content">
      <!-- @slot Слот контента -->
      <slot />
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
    display: inline-flex;
    flex-direction: column;
    width: 100%;

    > *:not(:first-child) {
      margin-top: $space-xxs;
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        <mc-cell title="Бюджет">
            <mc-title tag-name="p">
                30 000 $
            </mc-title>
        </mc-cell>

        <br>

        <mc-cell title="Бюджет">
            <mc-title tag-name="p">
                30 000 $
            </mc-title>
            <mc-title size="xs" uppercase>
                app/aug
            </mc-title>
        </mc-cell>

        <br>

        <mc-cell>
            <mc-title uppercase slot="title" size="s">
                Имя Фамилия
            </mc-title>
            <mc-title tag-name="p" size="l">
                MediaCube Network
            </mc-title>
        </mc-cell>

        <br>

        <mc-cell>
            <mc-title uppercase color="blue" slot="title">
                Имя Фамилия
            </mc-title>
            <mc-title tag-name="p" size="xl">
                MediaCube Network
            </mc-title>
        </mc-cell>
    </div>
    ```
</docs>
