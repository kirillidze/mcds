<template>
  <div>
    <transition name="slide-left">
      <div v-if="!open" @click="toggleOpen()">
        <slot name="activator" />
      </div>
    </transition>
    <transition name="slide-right">
      <mc-panel v-if="open" class="slider">
        <div class="slider__head" @click="clickToBack()">
          <slot name="head" />
        </div>
        <div class="slider__body">
          <slot name="body" />
        </div>
        <div class="slider__footer">
          <slot name="footer" />
        </div>
      </mc-panel>
    </transition>
  </div>
</template>
<script>
import McPanel from "../McPanel"
import McTitle from "../../elements/McTitle"
import McButton from "../../elements/McButton"
import McSvgIcon from "../../elements/McSvgIcon"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"

export default {
  name: "McFilterSlider",
  props: {
    open: {
      type: Boolean,
    },
  },
  components: {
    McTitle,
    McButton,
    McPanel,
    McSvgIcon,
    McGridRow,
    McGridCol,
  },
  methods: {
    toggleOpen(value = null) {
      this.$emit("open", value ? value : !this.open)
    },

    clickToBack() {
      this.$emit("clickToBack")
    },
  },
}
</script>
<style lang="scss">
.slider {
  $block-name: &;

  max-width: none;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  margin: -48px -8px -58px;
  min-height: 500px;

  &__head {
    padding: $space-xs;
    height: 38px;
    flex-shrink: 0;

    .mc-svg-icon {
      svg {
        transform: rotate(-90deg);
      }
    }
  }

  &__body {
    padding: $space-xs;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &__footer {
    border-top: 1px solid $color-outline-gray;
    padding-top: $space-xs;
    flex-shrink: 0;
    margin-top: auto;
  }
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
  opacity: 1;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(20%);
  opacity: 0;
  transform-origin: right center;
  z-index: -100;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
  opacity: 1;
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(-20%);
  opacity: 0;
  transform-origin: left center;
  z-index: -100;
}
</style>
