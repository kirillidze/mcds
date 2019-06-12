<template>
  <div class="mc-grid-col" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import _upperFirst from "lodash/upperFirst"
const values = ["span", "order", "offset", "push", "pull"]
const sizes = ["xs", "sm", "md", "lg"]
const props = {}
values.forEach(value => {
  props[`${value}`] = { type: Number }
  sizes.forEach(size => {
    props[`${value}-${size}`] = { type: Number }
  })
})
export default {
  name: "McGridCol",
  status: "ready",
  release: "0.0.1",
  props,
  data() {
    return {
      gutter: 0,
    }
  },
  computed: {
    classes() {
      const list = {}
      console.log(this["span-xs"])
      values.forEach(value => {
        list[`mc-grid-col--${value}-${this[value]}`] = this[value]
        sizes.forEach(size => {
          const sizeValue = this[`${value}${_upperFirst(size)}`]
          list[`mc-grid-col--${value}-${size}-${sizeValue}`] = sizeValue
        })
      })
      return list
    },
    styles() {
      let colStyle =
        this.gutter !== 0
          ? {
              "padding-left": `${this.gutter / 2}px`,
              "padding-right": `${this.gutter / 2}px`,
            }
          : {}
      return this.order ? { ...colStyle, order: this.order } : colStyle
    },
  },
  mounted() {
    this.$parent.updateGutter()
  },
}
</script>

<style lang="scss">
.mc-grid-col {
  $block-name: &;

  $cols: 12;

  display: block;
  position: relative;

  @mixin generate-col($viewport: "") {
    @for $i from 1 through $cols {
      &--span#{$viewport}-#{$i} {
        width: percentage($i / $cols);
      }

      &--push#{$viewport}-#{$i} {
        left: percentage($i / $cols);
      }

      &--pull#{$viewport}-#{$i} {
        right: percentage($i / $cols);
      }

      &--offset#{$viewport}-#{$i} {
        margin-left: percentage($i / $cols);
      }

      &--order#{$viewport}-#{$i} {
        order: #{$i};
      }
    }
  }

  @include generate-col("");
  @media (max-width: 768px) {
    @include generate-col("-xs");
  }

  @media (min-width: 768px) {
    @include generate-col("-sm");
  }

  @media (min-width: 992px) {
    @include generate-col("-md");
  }

  @media (min-width: 1200px) {
    @include generate-col("-lg");
  }
}
</style>
