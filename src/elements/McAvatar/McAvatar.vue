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
        "data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+DQogIDxnIGlkPSLQodCz0YDRg9C/0L/QuNGA0L7QstCw0YLRjF8xNjYwIiBkYXRhLW5hbWU9ItCh0LPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMIDE2NjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zOTAuMDAxIC0xMTQuMDAxKSI+DQogICAgPGNpcmNsZSBpZD0i0K3Qu9C70LjQv9GBXzIiIGRhdGEtbmFtZT0i0K3Qu9C70LjQv9GBIDIiIGN4PSI2NCIgY3k9IjY0IiByPSI2NCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzkwLjAwMSAxMTQuMDAxKSIgZmlsbD0iI2RlZTFlOSIvPg0KICAgIDxnIGlkPSJiYXNlbGluZS1jYW1lcmFfYWx0LTI0cHgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQzNC4zNDMgMTU4LjM0MykiPg0KICAgICAgPGNpcmNsZSBpZD0i0K3Qu9C70LjQv9GBXzE4OCIgZGF0YS1uYW1lPSLQrdC70LvQuNC/0YEgMTg4IiBjeD0iNS4yNDIiIGN5PSI1LjI0MiIgcj0iNS4yNDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0LjQxNiAxNC40MTYpIiBmaWxsPSIjYjNiYmQwIi8+DQogICAgICA8cGF0aCBpZD0i0JrQvtC90YLRg9GAXzEwOTYiIGRhdGEtbmFtZT0i0JrQvtC90YLRg9GAIDEwOTYiIGQ9Ik0xMy40NjcsMmwtMywzLjI3Nkg1LjI3NkEzLjI4NiwzLjI4NiwwLDAsMCwyLDguNTUzVjI4LjIxMWEzLjI4NiwzLjI4NiwwLDAsMCwzLjI3NiwzLjI3NkgzMS40ODdhMy4yODYsMy4yODYsMCwwLDAsMy4yNzYtMy4yNzZWOC41NTNhMy4yODYsMy4yODYsMCwwLDAtMy4yNzYtMy4yNzZIMjYuMjk0TDIzLjMsMlptNC45MTQsMjQuNTcyYTguMTkxLDguMTkxLDAsMSwxLDguMTkxLTguMTkxQTguMTk0LDguMTk0LDAsMCwxLDE4LjM4MiwyNi41NzJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjI3NiAxLjI3NikiIGZpbGw9IiNiM2JiZDAiLz4NCiAgICAgIDxwYXRoIGlkPSLQmtC+0L3RgtGD0YBfMTA5NyIgZGF0YS1uYW1lPSLQmtC+0L3RgtGD0YAgMTA5NyIgZD0iTTAsMEgzOS4zMTZWMzkuMzE2SDBaIiBmaWxsPSJub25lIi8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4NCg==",
    }
  },
  computed: {
    figureClasses() {
      return {
        [`mc-avatar--size-${this.size}`]: this.size,
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
    <McAvatar size="xl" rounded lazy edit-avatar oauth-app/>

  </div>
  ```
</docs>
