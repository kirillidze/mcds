<template>
  <section class="mc-cell-info" :class="classes" @click="handleClick">
    <div class="mc-cell-info__inner">
      <h4 class="mc-cell-info__title">
        <slot name="title"></slot>
      </h4>
      <div class="mc-cell-info__value">
        <slot name="value">—</slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "McCellInfo",
  status: "deprecated",
  release: "1.0.0",
  components: {},
  props: {
    theme: {
      type: String,
      default: "dark",
    },
    size: {
      type: String,
      default: "middle",
    },
    borderColor: {
      type: String,
      default: null,
    },
    borderGradient: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "mc-cell-info--theme-white": this.theme === "white",
        "mc-cell-info--size-large": this.size === "large",
        "mc-cell-info--size-ex-large": this.size === "ex-large",
        [`mc-cell-info--bordered mc-cell-info--border-color-${this.borderColor}`]: this.borderColor,
        "mc-cell-info--border-gradient": this.borderGradient,
        "mc-cell-info--click": !!this.$listeners.click,
      }
    },
  },
  methods: {
    handleClick() {
      this.$emit("click")
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
);

.mc-cell-info {
  $block-name: &;

  color: hsl(0, 0%, 13%);
  font-family: $font-heading-secondary;

  &__title {
    font-size: 10px;
    line-height: line-height(13, 10);
    font-weight: 500;
    margin-top: 0;
    text-transform: uppercase;
    margin-bottom: 2px;

    &:empty {
      display: none;
    }
  }

  &__value {
    font-size: 16px;
    line-height: line-height(19, 16);
    font-weight: 500;
  }

  &--theme-white {
    color: $color-white;

    #{$block-name} {
    }
  }

  &--size-large {
    #{$block-name} {
      &__value {
        font-size: 20px;
        line-height: line-height(23, 20);
        font-weight: 500;
      }
    }
  }

  &--size-ex-large {
    #{$block-name} {
      &__value {
        font-size: 34px;
        line-height: line-height(34, 31);
        font-weight: 500;
      }
    }
  }

  &--bordered {
    #{$block-name} {
      &__title {
      }

      &__inner {
        border-radius: 4px;
        border: 1px solid #c1c1c1;
        padding: 8px;
        height: 62px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      &__value {
        @include ellipsis();
      }
    }
  }

  &--click {
    cursor: pointer;
    user-select: none;

    #{$block-name} {
      &__inner {
        transition: border-color $duration-quickly;

        &:hover {
          border-color: #8c8b8b;
        }
      }
    }
  }
}

[class^="mc-cell-info mc-cell-info--bordered mc-cell-info--border-color"] {
  .mc-cell-info {
    $block-name: &;

    &__inner {
      position: relative;
      padding-left: 15px;
      //border-left: none;
      //overflow: hidden;

      &::after {
        position: absolute;
        left: -2px;
        top: -1px;
        bottom: -1px;
        content: "";
        width: 4px;
        border-radius: 4px 0 0 4px;
      }
    }
  }
}

.mc-cell-info {
  $block-name: &;

  @each $color, $value in $colors {
    &--border-color-#{$color} {
      #{$block-name} {
        &__inner {
          &::after {
            background-color: $value;
          }
        }
      }

      &.mc-cell-info--border-gradient {
        #{$block-name} {
          &__inner {
            &::after {
              background-image: linear-gradient($value, adjust_hue($value, -45));
            }
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
    <McCellInfo>
      <template slot="title">ИМЯ ФАМИЛИЯ</template>
      <template slot="value">
        MediaCube Network
      </template>
    </McCellInfo>
    <br>
    <McCellInfo size="ex-large">
      <template slot="title">ИМЯ ФАМИЛИЯ</template>
      <template slot="value">MediaCube Network</template>
    </McCellInfo>
    <br>
    <McCellInfo size="large">
      <template slot="title">ИМЯ ФАМИЛИЯ</template>
      <template slot="value">MediaCube Network</template>
    </McCellInfo>
    <br>
    <McCellInfo :border-color="'color-dodger-blue-lighter'" :border-gradient="false">
      <template slot="title">ИМЯ ФАМИЛИЯ</template>
      <template slot="value">
        MediaCube Network
      </template>
    </McCellInfo>
  </div>
  ```
</docs>
