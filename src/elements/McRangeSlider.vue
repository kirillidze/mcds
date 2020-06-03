<template>
  <vue-slider
    :class="classes"
    :value="value"
    @change="handleInput"
    :dot-size="18"
    :interval="step"
    :min="min"
    :max="max"
    :disabled="disabled"
    :lazy="lazy"
    :tooltip-formatter="tooltip"
  />
</template>

<script>
import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/default.css"

export default {
  name: "McRangeSlider",
  status: "ready",
  release: "1.0.0",
  components: {
    VueSlider,
  },
  props: {
    value: {
      type: [Number, Array],
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      default: 1,
    },
    color: {
      type: String,
      default: "blue",
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "mc-range-slider": true,
        [`mc-range-slider--color-${this.color}`]: this.color,
      }
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value)
    },
    tooltip(value) {
      if (Number(value) !== value) return value
      return ("" + value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    },
  },
}
</script>

<style lang="scss">
.mc-range-slider {
  $block-name: &;

  .vue-slider-dot-tooltip-inner {
    line-height: 1;
  }

  @each $color, $value in $token-colors {
    &--color-#{$color} {
      .vue-slider-process {
        background-color: $value;
      }

      .vue-slider-dot-tooltip-inner {
        background-color: $value;
        border-color: $value;
      }

      .vue-slider-dot-handle-focus {
        box-shadow: 0px 0px 1px 2px rgba($value, 0.3);
      }
    }
  }
}
</style>

<docs>
    ```jsx
    let value = 10
    let value2 = [100, 500]
    <McRangeSlider :min="0" :max="100" v-model="value" :step="2"/>
    <br>
    <McRangeSlider :min="0" :max="100" v-model="value" :step="2" color="light-green"/>
    <br>
    <McRangeSlider :min="0" :max="10000" v-model="value2" :step="100"/>
    ```
</docs>
