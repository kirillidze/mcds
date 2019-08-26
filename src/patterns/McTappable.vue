<template>
  <div class="mc-tappable">
    <slot></slot>
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
    <McTappable>
        <McPreview>
            <McAvatar slot="left"/>
            <McTitle size="l" slot="top">Татьяна Владимирова Татьяна Владимирова Татьяна Владимирова</McTitle>
            <McTitle color="gray" size="m" slot="bottom">
                <McSvgIcon fill="rgb(61, 143, 65)" slot="icon-prepend" name="ready"/>
                ildar@mediacube.in
            </McTitle>
            <McAvatar size="xs" slot="right"/>
        </McPreview>
    </McTappable>
  </div>
  ```
</docs>
