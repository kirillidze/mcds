<template>
  <section class="mc-avatar-status" :class="classes">
    <McAvatar :size="size" :src="src" rounded />
  </section>
</template>

<script>
import McAvatar from "./McAvatar"

export default {
  name: "McAvatarStatus",
  components: { McAvatar },
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     *  Размеры:
     *  `xs, s, m, l, xl`
     */
    size: {
      type: String,
      default: "m",
    },
    /**
     *  Путь до изображения
     *
     */
    src: {
      type: String,
      default: null,
    },
    /**
     *  Цвет рамки
     *
     */
    borderColor: {
      type: String,
      default: "transparent",
    },
    /**
     *  Цвет точки
     *
     */
    dotColor: {
      type: String,
      default: "transparent",
    },
  },

  computed: {
    classes() {
      return {
        [`mc-avatar-status--size-${this.size}`]: this.size,
        [`mc-avatar-status--border-color-${this.borderColor}`]: this.borderColor,
        [`mc-avatar-status--dot-color-${this.dotColor}`]: this.dotColor,

        "mc-avatar-status--rounded": this.rounded,
      }
    },
  },
}
</script>

<style lang="scss">
$border-colors: $token-colors;
$dot-colors: $token-colors;

.mc-avatar-status {
  $block-name: &;

  display: inline-flex;
  border: $space-xxxs solid transparent;
  padding: $space-xxxs - 1px;
  position: relative;
  border-radius: 50%;

  &::after {
    @include size(11px);
    @include pseudo();
    border: 1px solid $color-white;
    position: absolute;
    z-index: 2;
    border-radius: 50%;
  }

  @each $color, $value in $border-colors {
    &--border-color-#{$color} {
      border-color: $value;
    }
  }

  @each $color, $value in $dot-colors {
    &--dot-color-#{$color} {
      &::after {
        background-color: $value;
      }
    }
  }

  &--size-xs {
    &::after {
      bottom: 0;
      left: -$space-xxs;
    }
  }

  &--size-s {
    &::after {
      bottom: 0;
      left: -$space-xxxs;
    }
  }

  &--size-m {
    &::after {
      bottom: 0;
      left: 0;
    }
  }

  &--size-l {
    &::after {
      bottom: 0;
      left: $space-xxs;
    }
  }

  &--size-xl {
    &::after {
      bottom: $space-xs - 1;
      left: $space-xs;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McAvatarStatus size="xs" border-color="dodger-blue-light" dot-color="green"/>
    <McAvatarStatus size="s" border-color="dodger-blue-light" dot-color="green"/>
    <McAvatarStatus size="m" border-color="dodger-blue-light" dot-color="green"/>
    <McAvatarStatus size="l" border-color="dodger-blue-light" dot-color="green"/>
    <McAvatarStatus size="xl" border-color="dodger-blue-light" dot-color="green"/>
  </div>
  ```
</docs>
