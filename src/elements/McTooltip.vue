<template>
  <span v-tooltip="{ content, placement }">
    <slot></slot>
  </span>
</template>

<script>
import { VTooltip } from "v-tooltip"
export default {
  name: "McTooltip",
  status: "deprecated",
  release: "1.0.0",
  props: {
    /**
     *  Тектс подсказки:
     */
    content: {
      type: String,
      required: true,
    },
    /**
     *  Расположение:
     */
    placement: {
      type: String,
      default: "bottom-center",
    },
  },
  directives: {
    tooltip: VTooltip,
  },
}
</script>

<style lang="scss">
.tooltip {
  z-index: 10003;
  &-inner {
    padding: 8px 15px;
    background: #222;
    color: #fff;
    border-radius: 10px;
  }
  &-arrow {
    border-width: 0 5px 5px;
    border-color: #222;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    margin-top: 0;
    margin-bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McTooltip content="Подсказка">Текст с подсказкой</McTooltip>
  </div>
  ```
</docs>
