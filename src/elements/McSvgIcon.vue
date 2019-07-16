<template>
  <component :is="type" class="mc-svg-icon" :class="classes" v-html="svg"></component>
</template>

<script>
const req = require.context("../assets/icons/", true, /^\.\/.*\.svg$/)

/**
 * Svg изображения, иконки
 *
 *
 */

export default {
  name: "McSvgIcon",
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     * Название
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Цвет заливки
     */
    fill: {
      type: String,
      default: "currentColor",
    },
    /**
     * html тег обёртки
     */
    type: {
      type: String,
      default: "span",
    },
    /**
     *  Размеры:
     *  `xxs, xs, s, m, l, xl`
     */
    size: {
      type: String,
      default: "xs",
    },
  },
  data() {
    return {
      svg: null,
    }
  },
  watch: {
    name: {
      handler(val) {
        this.svg = req("./" + val + ".svg").replace(/^<svg /, `<svg style="fill: ${this.fill}"`)
      },
      immediate: true,
    },
  },
  computed: {
    classes() {
      return {
        [`mc-svg-icon--size-${this.size}`]: this.size,
      }
    },
  },
}
</script>

<docs>
  ```jsx
  let icons = require('@/utils/load-icons').default;
  <div style="display: flex; flex-wrap: wrap">
    <div style="display: flex; flex-wrap: nowrap; margin: 5px; align-items: center; padding: 5px 10px; background-color: white; border-radius: 8px; border: 1px solid lightgray" v-for="(icon, index) in icons" :key="index">
      <McSvgIcon style="flex: 0 0 auto" :name="icon" size="xs"/>
      <div style="flex: 1 1 auto; margin-left: 10px">
        {{ icon }}
      </div>
    </div>
  </div>
  ```
</docs>

<style lang="scss">
.mc-svg-icon {
  @include reset();
  @include reset-text-indents();

  svg {
    width: inherit;
    height: inherit;
  }

  &--size-xxs {
    width: $tappable_element_xxs;
    height: $tappable_element_xxs;
  }

  &--size-xs {
    width: $tappable_element_xs;
    height: $tappable_element_xs;
  }

  &--size-s {
    width: $tappable_element_s;
    height: $tappable_element_s;
  }

  &--size-m {
    width: $tappable_element_m;
    height: $tappable_element_m;
  }

  &--size-l {
    width: $tappable_element_l;
    height: $tappable_element_l;
  }

  &--size-xl {
    width: $tappable_element_xl;
    height: $tappable_element_xl;
  }
}
</style>
