<template>
  <section class="mc-chip" :class="classes">
    <div class="mc-chip__name">
      <slot></slot>
    </div>
    <button v-if="closeBtn && !type" @click.prevent="handleClick" class="mc-chip__btn">
      <McSvgIcon class="mc-chip__btn-icon" :width="17" :height="17" name="cancel" />
    </button>
  </section>
</template>

<script>
import McSvgIcon from "./McSvgIcon"
export default {
  name: "McChip",
  status: "deprecated",
  release: "1.0.0",
  components: { McSvgIcon },
  props: {
    closeBtn: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleClick() {
      this.$emit("remove")
    },
  },

  computed: {
    classes() {
      return {
        "mc-chip--without-close": !this.closeBtn,
        [`mc-chip--without-close mc-chip--type-${this.type}`]: this.type,
        [`mc-chip--color-${this.color}`]: this.color,
      }
    },
  },
}
</script>

<style lang="scss">
$colors: (
  "color-red-light": $color-red-light,
  "color-dodger-blue-light": $color-dodger-blue-light,
  "color-dodger-blue-lighten": $color-dodger-blue-lighten,
  "color-dodger-blue-lighter": $color-dodger-blue-lighter,
  "color-mantis-dark": $color-mantis-dark,
  "color-gorse": $color-gorse,
  "color-gray-dark": $color-gray-dark,
  "color-gray-lighter": $color-gray-lighter,
  "color-black": $color-black,
  "color-dark-orchid": $color-dark-orchid,
  "color-bright-turquoise-darker": $color-bright-turquoise-darker,
  "color-aqua-darken": $color-aqua-darken,
  "color-cinnabar-dark": $color-cinnabar-dark,
  "color-bermuda-gray": $color-bermuda-gray,
  "color-green": $color-green,
  "color-purple": $color-purple,
  "color-blue": $color-blue,
  "color-orange": $color-orange,
  "color-azure": $color-azure,
  "color-red": $color-red,
);
.mc-chip {
  $block-name: &;

  border-radius: 12px;
  background-color: hsl(0, 0%, 84%);
  position: relative;
  font-size: 0;
  line-height: 0;
  height: 23px;
  padding: 4px 28px 4px 11px;
  font-family: $font-text;
  display: inline-flex;

  &__name {
    @include ellipsis();

    color: hsl(0, 0%, 27%);
    font-size: 14px;
    font-weight: 500;
    line-height: line-height(17, 14);
  }

  &__btn {
    @include reset-btn();
    position: absolute;
    right: 4px;
    top: 3px;
    color: hsl(0, 0%, 53%);
    transition: color $duration-quickly;

    &:hover,
    &:focus {
      color: $color-navy-blue-light;
    }

    &:active {
      color: darken($color-navy-blue-light, 8%);
    }
  }

  &__btn-icon {
    height: 17px;
    width: 17px;
  }

  &--without-close {
    padding-right: 11px;
  }

  &--type-2 {
    border-radius: 4px;
    background-color: $color-white;
    padding: 2px 8px;
    height: 16px;

    #{$block-name} {
      &__name {
        color: hsl(0, 0%, 13%);
        font-family: $font-heading-secondary;
        font-size: 10px;
        line-height: line-height(13, 10);
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }
  &--color {
    @each $color, $value in $colors {
      &-#{$color} {
        #{$block-name} {
          &__name {
            color: $color-white;
          }
        }
        background-color: $value;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McChip>Владилен</McChip>
    <McChip color="color-dodger-blue-light" type="2">Максим</McChip>
    <McChip type="2">Егор</McChip>
  </div>
  ```
</docs>
