<template>
  <div class="mc-grid-col" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "McGridCol",
  status: "ready",
  release: "0.0.1",
  props: {
    span: { type: Number },
    order: { type: Number },
    offset: { type: Number },
    push: { type: Number },
    pull: { type: Number },
    xs: { type: Number },
    sm: { type: Number },
    md: { type: Number },
    lg: { type: Number },
  },
  data() {
    return {
      gutter: 0,
    }
  },
  computed: {
    classes() {
      let list = {
        [`mc-grid-col--span-${this.span}`]: this.span,
        [`mc-grid-col--order-${this.order}`]: this.order,
        [`mc-grid-col--offset-${this.offset}`]: this.offset,
        [`mc-grid-col--push-${this.push}`]: this.push,
        [`mc-grid-col--pull-${this.pull}`]: this.pull,
      }
      let viewports = ["xs", "sm", "md", "lg"]
      viewports.forEach(viewport => {
        list[`mc-grid-col--span-${viewport}-${this[viewport]}`] = this.viewport
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

  $grid-col: 12;

  display: block;
  position: relative;

  @mixin generate-col($viewport: "") {
    @for $i from 1 through $grid-col {
      &--span#{$viewport}-#{$i} {
        width: percentage($i / $grid-col);
      }

      &--push#{$viewport}-#{$i} {
        left: percentage($i / $grid-col);
      }

      &--pull#{$viewport}-#{$i} {
        right: percentage($i / $grid-col);
      }

      &--offset#{$viewport}-#{$i} {
        margin-left: percentage($i / $grid-col);
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
