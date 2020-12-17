<template>
  <div class="mc-avatar-wrapper" :class="classes">
    <figure class="mc-avatar" :class="figureClasses">
      <img
        v-if="lazy"
        v-lazy="{ src: _src, error: defaultSrc, attempt: 1 }"
        :key="_src"
        alt=""
        class="mc-avatar__img"
      />
      <img v-else :src="_src" alt="" class="mc-avatar__img" />
    </figure>
    <div class="mc-avatar__icon-wrapper" v-if="editAvatar">
      <mc-svg-icon class="mc-avatar__icon" :name="icon" fill="#5500FF" />
    </div>
  </div>
</template>

<script>
import tokens from "../../assets/tokens/tokens"
import McSvgIcon from "../McSvgIcon"

export default {
  name: "McAvatar",
  components: { McSvgIcon },
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
     *  Радиус
     *  `s, m, l, и т.д.`
     */
    radius: {
      type: String,
      default: "m",
    },
    /**
     *  Круглая
     *
     */
    rounded: {
      type: Boolean,
      default: false,
    },
    oauthApp: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "create",
    },
    editAvatar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      oauthAppDefaultSrc:
        "data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+CiAgPGcgaWQ9Ikdyb3VwXzE2NjAiIGRhdGEtbmFtZT0iR3JvdXAgMTY2MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM5MC4wMDEgLTExNC4wMDEpIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMTEyNyIgZGF0YS1uYW1lPSJSZWN0YW5nbGUgMTEyNyIgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM5MC4wMDEgMTE0LjAwMSkiIGZpbGw9IiNkZWUxZTkiLz4KICAgIDxnIGlkPSJiYXNlbGluZS1jYW1lcmFfYWx0LTI0cHgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQzNC4zNDMgMTU4LjM0MykiPgogICAgICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzE4OCIgZGF0YS1uYW1lPSJFbGxpcHNlIDE4OCIgY3g9IjUuMjQyIiBjeT0iNS4yNDIiIHI9IjUuMjQyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNC40MTYgMTQuNDE2KSIgZmlsbD0iI2IzYmJkMCIvPgogICAgICA8cGF0aCBpZD0iUGF0aF8xMDk2IiBkYXRhLW5hbWU9IlBhdGggMTA5NiIgZD0iTTEzLjQ2NywybC0zLDMuMjc2SDUuMjc2QTMuMjg2LDMuMjg2LDAsMCwwLDIsOC41NTNWMjguMjExYTMuMjg2LDMuMjg2LDAsMCwwLDMuMjc2LDMuMjc2SDMxLjQ4N2EzLjI4NiwzLjI4NiwwLDAsMCwzLjI3Ni0zLjI3NlY4LjU1M2EzLjI4NiwzLjI4NiwwLDAsMC0zLjI3Ni0zLjI3NkgyNi4yOTRMMjMuMywyWm00LjkxNCwyNC41NzJhOC4xOTEsOC4xOTEsMCwxLDEsOC4xOTEtOC4xOTFBOC4xOTQsOC4xOTQsMCwwLDEsMTguMzgyLDI2LjU3MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMjc2IDEuMjc2KSIgZmlsbD0iI2IzYmJkMCIvPgogICAgICA8cGF0aCBpZD0iUGF0aF8xMDk3IiBkYXRhLW5hbWU9IlBhdGggMTA5NyIgZD0iTTAsMEgzOS4zMTZWMzkuMzE2SDBaIiBmaWxsPSJub25lIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
    }
  },
  computed: {
    figureClasses() {
      return {
        [`mc-avatar--size-${this.size}`]: this.size,
        [`mc-avatar--radius-${this.radius}`]: this.radius && !this.rounded,
        "mc-avatar--rounded": this.rounded,
      }
    },
    classes() {
      return {
        "mc-avatar-wrapper--edit": this.editAvatar,
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
      return this.src || this.setDefaultSrc
    },
    setDefaultSrc() {
      return this.oauthApp ? this.oauthAppDefaultSrc : this.defaultSrc
    },
  },
}
</script>

<style lang="scss">
.mc-avatar-wrapper {
  display: inline-block;
  @include reset-text-indents();
  .mc-avatar {
    $block-name: &;

    @include reset();
    position: relative;
    display: inline-block;
    border-radius: $radius-m;
    overflow: hidden;

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
    @each $radius, $value in $token-border-radius {
      &--radius-#{$radius} {
        border-radius: $value;
      }
    }
    &--rounded {
      border-radius: 50%;
    }
  }
  &.mc-avatar-wrapper--edit {
    position: relative;
    .mc-avatar {
      &__icon-wrapper {
        width: 38px;
        height: 38px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 5px;
        bottom: 10px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0px 9px 36px #2859de1a;
      }
    }
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
