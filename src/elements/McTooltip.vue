<template>
  <div class="mc-tooltip-target" v-tooltip="{ content, placement, classes: tooltipClasses }">
    <slot></slot>
  </div>
</template>

<script>
import { VTooltip } from "v-tooltip"
import McButton from "./McButton"
import McSvgIcon from "./McSvgIcon"
export default {
  name: "McTooltip",
  components: { McSvgIcon, McButton },
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     *  Текст подсказки:
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
      default: "bottom",
    },
    /**
     *  Цвет:
     */
    color: {
      type: String,
      default: "default",
    },
  },
  directives: {
    tooltip: VTooltip,
  },
  computed: {
    tooltipClasses() {
      return ["mc-tooltip", `mc-tooltip--color-${this.color}`]
    },
  },
}
</script>

<style lang="scss">
.mc-tooltip-target {
  display: inline-flex;
}

.mc-tooltip.tooltip {
  $arrow-size: $space-xs;

  display: block !important;
  z-index: 10000;
  max-width: $panel-s;

  .tooltip-inner {
    @include inset-squish-space($space-m);
    background: $color-text;
    color: $color-white;
    border-radius: $radius-l;
    font-family: $font-family--headings-2;
    font-weight: $weight-medium;
    letter-spacing: $spacing-m;
    line-height: $line-height-s;
    font-size: $size-m;
    box-shadow: $shadow-l;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: $arrow-size;
    border-color: $color-text;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: $arrow-size;

    .tooltip-arrow {
      border-width: $arrow-size $arrow-size 0 $arrow-size;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -$arrow-size;
      left: calc(50% - #{$arrow-size});
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: $arrow-size;

    .tooltip-arrow {
      border-width: 0 $arrow-size $arrow-size $arrow-size;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -$arrow-size;
      left: calc(50% - #{$arrow-size});
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: $arrow-size;

    .tooltip-arrow {
      border-width: $arrow-size $arrow-size $arrow-size 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -$arrow-size;
      top: calc(50% - #{$arrow-size});
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: $arrow-size;

    .tooltip-arrow {
      border-width: $arrow-size 0 $arrow-size $arrow-size;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -$arrow-size;
      top: calc(50% - #{$arrow-size});
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity $duration-quickly, visibility $duration-quickly;
  }

  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity $duration-quickly;
  }
}

@each $color, $value in $token-colors {
  .mc-tooltip {
    &--color-#{$color} {
      @if $color == "white" {
        &.tooltip {
          .tooltip-inner {
            color: $gray-darkest;
            background-color: $value;
          }
          .tooltip-arrow {
            border-color: $value;
          }
        }
      } @else {
        &.tooltip {
          .tooltip-inner {
            background-color: $value;
          }
          .tooltip-arrow {
            border-color: $value;
          }
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McTooltip color="gray-darkest" placement="right" content="А если текста реально очень очень много, например как сейчас?">
      <McButton>Тултип</McButton>
    </McTooltip>
    <br>
    <br>
    <McTooltip color="white" content="А если текста реально очень очень много, например как сейчас?">
      <McSvgIcon name="face"/>
    </McTooltip>
    <br>
    <br>
    <McTooltip color="primary" placement="top" content="А если текста реально очень очень много, например как сейчас?">
      Тултип
    </McTooltip>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
  ```
</docs>
