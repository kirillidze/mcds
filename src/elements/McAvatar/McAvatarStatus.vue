<template>
  <section class="mc-avatar-status" :class="classes">
    <McAvatar :size="size" :src="src" :lazy="lazy" rounded />
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
    /**
     *  Отложенная подгрузка
     *
     */
    lazy: {
      type: Boolean,
      default: false,
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
$color-borders: $token-colors;
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

  @each $color, $value in $color-borders {
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

  &--dot-color-transparent {
    &::after {
      border: none;
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
    <McAvatarStatus size="xs" border-color="blue" dot-color="orange" lazy/>
    <McAvatarStatus size="s" border-color="blue" dot-color="orange" lazy/>
    <McAvatarStatus size="m" border-color="blue" dot-color="orange" lazy/>
    <McAvatarStatus size="l" border-color="blue" dot-color="orange" lazy/>
    <McAvatarStatus size="xl" border-color="blue" dot-color="orange" lazy/>
  </div>
  ```
</docs>
