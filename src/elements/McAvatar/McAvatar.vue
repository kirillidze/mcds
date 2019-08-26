<template>
  <figure class="mc-avatar" :class="classes">
    <img
      v-if="lazy"
      v-lazy="{ src: _src, error: defaultSrc, attempt: 1 }"
      :key="_src"
      alt=""
      class="mc-avatar__img"
    />
    <img v-else :src="_src" alt="" class="mc-avatar__img" />
  </figure>
</template>

<script>
import tokens from "../../assets/tokens/tokens"

export default {
  name: "McAvatar",
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
     *  Отложенная подгрузка
     *
     */
    lazy: {
      type: Boolean,
      default: false,
    },
    /**
     *  Круглая
     *
     */
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        [`mc-avatar--size-${this.size}`]: this.size,

        "mc-avatar--rounded": this.rounded,
      }
    },
    sizeInPx() {
      if (this.size === "xs") return tokens.avatar_xs
      if (this.size === "s") return tokens.avatar_s
      if (this.size === "m") return tokens.avatar_m
      if (this.size === "l") return tokens.avatar_l
      if (this.size === "xl") return tokens.avatar_xl
      return tokens.avatar_xl
    },
    defaultSrc() {
      return `//yt3.ggpht.com/-xxp17w8gwH4/AAAAAAAAAAI/AAAAAAAAAAA/yoFDaHVr8os/s${this.sizeInPx.slice(
        0,
        -2
      ) * 2}-c-k-no-mo-rj-c0xffffff/photo.jpg`
    },
    _src() {
      return this.src ? this.src : this.defaultSrc
    },
  },
}
</script>

<style lang="scss">
.mc-avatar {
  $block-name: &;

  @include reset();
  position: relative;
  display: inline-block;
  border-radius: $radius-m;
  overflow: hidden;
  background-color: $color-hover-gray;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &--size-xs {
    @include size($avatar-xs);
  }

  &--size-s {
    @include size($avatar-s);
  }

  &--size-m {
    @include size($avatar-m);
  }

  &--size-l {
    @include size($avatar-l);
  }

  &--size-xl {
    @include size($avatar-xl);
  }

  &--rounded {
    border-radius: 50%;
  }
}
</style>

<docs>
  ```jsx
  <div>

    <McAvatar size="xs"/>
    <McAvatar size="s"/>
    <McAvatar size="m"/>
    <McAvatar size="l"/>
    <McAvatar size="xl"/>

    <McAvatar size="xs" rounded/>
    <McAvatar size="s" rounded/>
    <McAvatar size="m" rounded/>
    <McAvatar size="l" rounded/>
    <McAvatar size="xl" rounded lazy/>

  </div>
  ```
</docs>
