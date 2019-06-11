<template>
  <div class="mc-avatar-old" :class="classes">
    <div
      v-if="statusColor"
      :class="['mc-avatar-old__status', `mc-avatar-old__status--${statusColor}`]"
    ></div>
    <figure class="mc-avatar-old__figure">
      <img
        v-if="lazy"
        v-lazy="{ src: _src, error: defaultSrc, attempt: 1 }"
        :key="_src"
        alt=""
        class="mc-avatar-old__img"
      />
      <img v-else :src="_src" alt="" class="mc-avatar-old__img" />
    </figure>
    <div
      v-if="borderColor"
      :class="['mc-avatar-old__border', `mc-avatar-old__border--${borderColor}`]"
    ></div>
  </div>
</template>

<script>
export default {
  name: "McAvatarOld",
  status: "deprecated",
  release: "1.0.0",
  props: {
    size: {
      type: String,
      default: "middle",
    },
    statusColor: {
      type: String,
      default: null,
    },
    borderColor: {
      type: String,
      default: null,
    },
    src: {
      type: String,
      default: null,
    },
    shadow: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: "alt",
    },
    wideBorder: {
      type: Boolean,
      default: false,
    },
    isPhoto: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    sizeInPx() {
      if (this.size == "small") return 32
      if (this.size == "middle") return 42
      if (this.size == "large") return 56
      if (this.size == "ex-large") return 180
      return 512
    },
    defaultSrc() {
      return `//yt3.ggpht.com/-xxp17w8gwH4/AAAAAAAAAAI/AAAAAAAAAAA/yoFDaHVr8os/s${this.sizeInPx *
        2}-c-k-no-mo-rj-c0xffffff/photo.jpg`
    },
    _src() {
      return this.src ? this.src : this.defaultSrc
    },
    classes() {
      return {
        "mc-avatar-old--size-ex-small": this.size === "ex-small",
        "mc-avatar-old--size-small": this.size === "small",
        "mc-avatar-old--size-middle": this.size === "middle",
        "mc-avatar-old--size-large": this.size === "large",
        "mc-avatar-old--size-more-large": this.size === "more-large",
        "mc-avatar-old--size-ex-large": this.size === "ex-large",

        "mc-avatar-old--status": this.statusColor,
        "mc-avatar-old--border": this.borderColor,
        "mc-avatar-old--rounded": this.rounded,
        [`mc-avatar-old--shadow mc-avatar-old--shadow-${this.shadow}`]: this.shadow,
        "mc-avatar-old--wide-border": this.wideBorder,
        "mc-avatar-old--no-photo": !this.isPhoto,
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
);
.mc-avatar-old {
  $block-name: &;

  position: relative;
  display: inline-block;

  &__figure {
    margin: 0;
    display: block;
    //background-color: $placeholder-color;
    background-color: $color-white;
    overflow: hidden;
    border-radius: 4px;
  }

  &__img {
    display: block;
    width: inherit;
    height: inherit;
    object-fit: cover;
  }

  &__status {
    @include size(11px);
    border: 1px solid $color-white;
    position: absolute;
    z-index: 2;
    @each $color, $value in $colors {
      &--#{$color} {
        background-color: $value;
      }
    }
  }

  &__border {
    border: 2px solid transparent;
    background-color: transparent;
    @each $color, $value in $colors {
      &--#{$color} {
        border-color: $value;
      }
    }

    &--white {
      border-color: $color-white;
    }
  }

  &--rounded {
    #{$block-name}__figure,
    #{$block-name}__status,
    #{$block-name}__border {
      border-radius: 50%;
    }
  }

  &--size-ex-small {
    #{$block-name} {
      &__figure {
        @include size(24px);
      }
    }
  }

  &--size-small {
    #{$block-name} {
      &__figure {
        @include size(32px);
      }
    }
  }

  &--size-middle {
    #{$block-name} {
      &__figure {
        @include size(42px);
      }
    }
  }

  &--size-large {
    #{$block-name} {
      &__figure {
        @include size(56px);
      }
    }
  }

  &--size-more-large {
    #{$block-name} {
      &__figure {
        @include size(97px);
      }
    }
  }

  &--size-ex-large {
    #{$block-name} {
      &__figure {
        @include size(180px);
      }
    }
  }

  &--shadow {
    #{$block-name} {
      &__figure {
        //box-shadow: 8px 8px 16px rgba(197, 0, 255, 0.16);
      }
    }
  }

  &--shadow-purple {
    #{$block-name} {
      &__figure {
        box-shadow: 8px 8px 16px rgba(197, 0, 255, 0.16);
      }
    }
  }

  &--shadow-gray {
    #{$block-name} {
      &__figure {
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.16);
      }
    }
  }

  // border

  &--size-small {
    &#{$block-name} {
      &--border {
        #{$block-name} {
          &__status {
            bottom: 2px;
            left: 0;
          }

          &__border {
            @include size(38px);
          }

          &__figure {
            position: absolute;
            top: 50%;
            z-index: 1;
            margin-top: -16px;
            left: 50%;
            margin-left: -16px;
          }
        }
      }
    }
  }

  &--size-middle {
    &#{$block-name} {
      &--border {
        #{$block-name} {
          &__status {
            bottom: 2px;
            left: 2px;
          }

          &__border {
            @include size(48px);
          }

          &__figure {
            position: absolute;
            top: 50%;
            z-index: 1;
            margin-top: -21px;
            left: 50%;
            margin-left: -21px;
          }
        }
      }
    }
  }

  &--size-large {
    &#{$block-name} {
      &--border {
        #{$block-name} {
          &__status {
            bottom: 4px;
            left: 4px;
          }

          &__border {
            @include size(62px);
          }

          &__figure {
            position: absolute;
            top: 50%;
            z-index: 1;
            margin-top: -28px;
            left: 50%;
            margin-left: -28px;
          }
        }
      }
    }
  }

  // border-wide

  &--wide-border {
    box-sizing: content-box;

    #{$block-name} {
      &__figure {
        border: 4px solid $color-white;
      }
    }
  }

  &--no-photo {
    #{$block-name} {
      &__figure {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__img {
        max-width: 35px;
        height: auto;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McAvatarOld size="ex-small" :src="null"/>
    <McAvatarOld size="small" :src="null"/>
    <McAvatarOld size="middle" :src="null"/>
    <McAvatarOld size="large" shadow="gray"/>
    <McAvatarOld size="more-large" shadow="gray"/>
    <McAvatarOld size="ex-large" :src="null"/>
    <McAvatarOld :src="null" shadow="gray"/>
    <McAvatarOld :src="null" shadow="purple"/>
    <McAvatarOld :src="null" :rounded="false"/>
    <McAvatarOld border-color="color-dodger-blue-light" status-color="color-dark-orchid"/>
    <McAvatarOld shadow="purple" :wide-border="true" :src="null"/>
    <!--<McAvatarOld :src="null" size="more-large" shadow="gray" :is-photo="false"/>-->
  </div>
  ```
</docs>
