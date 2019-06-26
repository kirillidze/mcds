<template>
  <section class="mc-panel">
    <slot></slot>
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
  computed: {
    classes() {
      return {
        //[`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-panel {
  $block-name: &;

  box-shadow: $shadow-l;
  border-radius: $radius-l;
  background-color: $color-white;
  padding: $space-xs;
  max-width: $panel_m;

  &:empty {
    display: none;
  }

  .mc-button {
    &--size-s {
    }

    &--size-m {
    }

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

  <div style="display: flex; flex-wrap: wrap; align-items: flex-start;">

    <McPanel :style="stylesPanel">
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="l"
      >
        Добавить партнера
      </McButton>
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="l"
      >
        Добавить рекрутера
      </McButton>
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="l"
      >
        Добавить контракт
      </McButton>
    </McPanel>


    <McPanel :style="stylesPanel">
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="l"
      >
        <McSvgIcon slot="icon-prepend" name="account_circle" size="xxs"/>
        Профиль
      </McButton>
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="l"
      >
        <McSvgIcon slot="icon-prepend" name="swap_horizontal_circle" size="xxs"/>
        Транзакции
      </McButton>
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="l"
      >
        <McSvgIcon slot="icon-prepend" name="settings" size="xxs"/>
        Безопасность
      </McButton>
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="danger-flat"
              size="l"
      >
        <McSvgIcon slot="icon-prepend" name="exit_to_app" size="xxs"/>
        Выйти
      </McButton>
    </McPanel>


    <McPanel :style="stylesPanel">
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="xl"
      >
        <McSvgIcon slot="icon-prepend" name="mediacube" size="m"/>
        MediaCube Stats
      </McButton>
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="xl"
      >
        <McSvgIcon slot="icon-prepend" name="mediacube" size="m"/>
        MediaCube Network
      </McButton>
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="xl"
      >
        <McSvgIcon slot="icon-prepend" name="mediacube" size="m"/>
        MediaCube Studio
      </McButton>
      <McButton
              href="#"
              @click.prevent
              full-width
              text-align="left"
              variation="gray-darkest-flat"
              size="xl"
      >
        <McSvgIcon slot="icon-prepend" name="mediacube" size="m"/>
        MediaCube Assist
      </McButton>
    </McPanel>

  </div>
  ```
</docs>
