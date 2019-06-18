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
    /**
     *  Расстояние между колонками
     */
    gutter: {
      type: Number,
    },

    /**
     *  Выравнивание по горизонтали
     */
    justify: {
      type: String,
      default: "start",
      validator: function(value) {
        return ["start", "end", "center", "space-around", "space-between"].indexOf(value) !== -1
      },
    },

    /**
     *  Выравнивание по вертикали
     */
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
        [`mc-grid-row--justify-${this.justify}`]: this.justify,
        [`mc-grid-row--align-${this.align}`]: this.align,
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
  watch: {
    gutter() {
      this.updateGutter()
    },
  },
  methods: {
    updateGutter() {
      this.$children.forEach(children => {
        let componentName = children.$options.name
        if (componentName === "McGridCol") {
          children.gutter = this.gutter
        }
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
        <mc-grid-row :gutter="30">
            <mc-grid-col :span="12" :span-xl="1">
                <div style="background: #e74c3c">1</div>
            </mc-grid-col>
            <mc-grid-col :span="12" :span-xl="2">
                <div style="background: #1abc9c">2</div>
            </mc-grid-col>
            <mc-grid-col :span="12" :span-xl="3">
                <div style="background: #9b59b6">3</div>
            </mc-grid-col>
            <mc-grid-col :span="12" :span-xl="6">
                <div style="background: #f1c40f">6</div>
            </mc-grid-col>
        </mc-grid-row>

        <br>

        <mc-grid-row :gutter="30">
            <mc-grid-col>
                <div style="background: #e74c3c">4</div>
            </mc-grid-col>
            <mc-grid-col>
                <div style="background: #f1c40f">4</div>
            </mc-grid-col>
            <mc-grid-col>
                <div style="background: #f1c40f">4</div>
            </mc-grid-col>
        </mc-grid-row>
    </div>
    ```
</docs>
