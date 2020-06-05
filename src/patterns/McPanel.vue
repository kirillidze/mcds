<template>
  <section class="mc-panel">
    <!-- @slot Слот контента -->
    <slot />
  </section>
</template>

<script>
import McButton from "../elements/McButton"
import McSvgIcon from "../elements/McSvgIcon"
export default {
  name: "McPanel",
  components: { McSvgIcon, McButton },
  status: "ready",
  release: "0.0.1",
}
</script>

<style lang="scss">
.mc-panel {
  $block-name: &;

  box-shadow: $shadow-l;
  border-radius: $radius-l;
  background-color: $color-white;
  padding: $space-xs;
  max-width: $panel-m;

  &:empty {
    display: none;
  }

  .mc-button {
    &--size-l {
      padding-left: $space_s;
      padding-right: $space_s;
    }

    &--size-xl {
      padding-left: $space_s;
      padding-right: $space_s;
    }
  }

  .mc-preview {
    padding: $space-s;
  }
}
</style>

<docs>
  ```jsx

  let tokens = require('../assets/tokens/tokens')
  let stylesPanel = {
    marginRight: tokens.space_s,
    marginBottom: tokens.space_s
  }
  const buttons_1 = ['партнера', 'рекрутера', 'контракт']
  const buttons_2 = [
    {icon: 'account_circle', name: 'Профиль'},
    {icon: 'swap_horizontal_circle', name: 'Транзакции'},
    {icon: 'settings', name: 'Безопасность'},
    {icon: 'exit_to_app', name: 'Выйти'},
  ]
  const buttons_3 = ['Stats', 'Network', 'Studio', 'Assist']

  <div style="display: flex; flex-wrap: wrap; align-items: flex-start;">
    <mc-panel :style="stylesPanel">
      <mc-button
        v-for="(btn, i) in buttons_1"
        :key="i"
        href="#"
        @click.prevent
        full-width
        text-align="left"
        variation="black-flat"
        size="l"
      >
        Добавить {{ btn }}
      </mc-button>
    </mc-panel>


    <mc-panel :style="stylesPanel">
      <mc-button
        v-for="(btn, i) in buttons_2"
        :key="i"
        href="#"
        full-width
        text-align="left"
        :variation="btn.icon === 'exit_to_app' ? 'red-flat' : 'black-flat'"
        size="l"
        @click.prevent
      >
        <mc-svg-icon slot="icon-prepend" :name="btn.icon" size="xxs"/>
        {{ btn.name }}
      </mc-button>
    </mc-panel>

    <mc-panel :style="stylesPanel">
      <mc-button
        v-for="(btn, i) in buttons_3"
        :key="i"
        href="#"
        full-width
        text-align="left"
        variation="black-flat"
        size="xl"
        @click.prevent
      >
        <mc-svg-icon slot="icon-prepend" name="mediacube" size="m"/>
        MediaCube {{ btn }}
      </mc-button>
    </mc-panel>
  </div>
  ```
</docs>
