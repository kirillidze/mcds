<template>
  <mc-chip
    class="mc-filter-dot"
    variation="white-invert"
    size="s"
    closable
    @click="handleChipClick"
  >
    <template slot="button">
      <div class="mc-filter-dot__circle"></div>
      <mc-svg-icon size="xxs" name="cancel" />
    </template>
  </mc-chip>
</template>

<script>
import McChip from "../../elements/McChip"
import McSvgIcon from "../../elements/McSvgIcon"

export default {
  name: "McFilterDot",
  components: { McChip, McSvgIcon },
  methods: {
    handleChipClick(e) {
      /**
       * Событие сохранения пресета
       * @property {Object}
       */
      this.$emit("click", e)
    },
  },
}
</script>

<style lang="scss">
.mc-filter-dot {
  $block-name: &;

  .mc-chip__button {
    margin: 0;

    #{$block-name}__circle {
      @include size($space-xs);
      @include position(absolute, 50%);
      transform: translate(-50%, -50%);
      background-color: $color-blue;
      border-radius: $radius-circle;
      display: inline-block;
      z-index: 2;
      transition: width $duration-quickly ease, height $duration-quickly ease;

      + .mc-svg-icon {
        visibility: hidden;
        position: relative;
        z-index: 1;
      }
    }

    &:hover {
      #{$block-name}__circle {
        @include size($space-s);
        background-color: transparent;
      }
      .mc-svg-icon {
        visibility: visible;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  const handleClick = e => alert(e.type)
  <div>
    <mc-filter-dot @click="handleClick" />
  </div>
  ```
</docs>
