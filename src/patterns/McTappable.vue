<template>
  <div class="mc-tappable">
    <!-- @slot Слот контента -->
    <slot />
  </div>
</template>

<script>
import McPreview from "./McPreview"
import McAvatar from "../elements/McAvatar/McAvatar"
import McTitle from "../elements/McTitle"
import McSvgIcon from "../elements/McSvgIcon"
export default {
  name: "McTappable",
  components: { McSvgIcon, McTitle, McAvatar, McPreview },
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     *  Размеры:
     *  `s, m, l, xl`
     */
    size: {
      type: String,
      default: "m",
    },
  },

  computed: {
    classes() {
      return {
        [`mc-tappable--size-${this.size}`]: this.size,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-tappable {
  $block-name: &;

  padding: $space-xs;
  transition: background-color $duration-quickly;
  border-radius: $radius-m;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: fade-out($color-black, 0.9);
  }

  &:active {
    background-color: fade-out($color-black, 0.85);
  }
}
</style>

<docs>
  ```jsx
  <div>
    <mc-tappable>
        <mc-preview>
            <mc-avatar slot="left"/>
            <mc-title size="l" slot="top">Татьяна Владимирова Татьяна Владимирова Татьяна Владимирова</mc-title>
            <mc-title color="gray" slot="bottom">
                <mc-svg-icon fill="rgb(61, 143, 65)" slot="icon-prepend" name="ready"/>
                ildar@mediacube.in
            </mc-title>
            <mc-avatar size="xs" slot="right"/>
        </mc-preview>
    </mc-tappable>
      <mc-tappable>
          <mc-title size="l">Lorem ipsum.</mc-title>
      </mc-tappable>
  </div>
  ```
</docs>
