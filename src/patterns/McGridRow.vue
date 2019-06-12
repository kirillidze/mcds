<template>
  <div class="mc-grid-row" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import McGridCol from "./McGridCol"
export default {
  name: "McGridRow",
  components: { McGridCol },
  status: "ready",
  release: "0.0.1",
  props: {
    gutter: {
      type: Number,
    },
    justify: {
      type: String,
      default: "start",
      validator: function(value) {
        return ["start", "end", "center", "space-around", "space-between"].indexOf(value) !== -1
      },
    },
    align: {
      type: String,
      default: "top",
      validator: function(value) {
        return ["top", "middle", "bottom"].indexOf(value) !== -1
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    classes() {
      return {
        [`mc-grid-row__justify-${this.justify}`]: this.justify,
        [`mc-grid-row__align-${this.align}`]: this.align,
      }
    },
    styles() {
      return this.gutter !== 0
        ? {
            "margin-left": `${-this.gutter / 2}px`,
            "margin-right": `${-this.gutter / 2}px`,
          }
        : {}
    },
  },
  methods: {
    updateGutter() {
      this.$children.forEach(children => {
        children.gutter = this.gutter
      })
    },
  },
}
</script>

<style lang="scss">
.mc-grid-row {
  $block-name: &;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @each $justify in ("start", "end", "center", "space-around", "space-between") {
    .mc-grid-row--justify-#{$justify} {
      justify-content: #{$justify};
    }
  }
  @each $key, $value in ("top": "flex-start", "middle": "center", "bottom": "flex-end") {
    .mc-grid-row--align-#{$key} {
      align-items: #{$value};
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        <mc-grid-row>
            <mc-grid-col :span="1" style="background: aqua">1</mc-grid-col>
            <mc-grid-col :span="2" style="background: red">2</mc-grid-col>
            <mc-grid-col :span="3" :push="2" style="background: blue">2</mc-grid-col>
        </mc-grid-row>
    </div>
    ```
</docs>
