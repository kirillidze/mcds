<template>
  <component :is="tag" v-bind="tagBind" class="mc-logo" :class="classes">
    <img :src="src" class="mc-logo__img" width="29" height="32" :alt="title" />
    <span class="mc-logo__text">
      {{ title }}
    </span>
  </component>
</template>

<script>
export default {
  name: "McLogo",
  status: "ready",
  release: "0.0.1",
  props: {
    /**
     *  Название сервиса
     *
     */
    title: {
      type: String,
      default: "Mediacube",
    },
    /**
     *  Путь до изображения
     *
     */
    src: {
      type: String,
      default: "/icons/mediacube.svg",
    },
    /**
     *  Если нужна ссылка внутри приложения:
     * `{name: 'test', params: { id: test.id }}`
     */
    to: {
      default: null,
    },
    /**
     *  Если нужна обычная ссылка:
     * `https://mediacube.agency/`
     */
    href: {
      default: null,
    },
    /**
     *  По умолчанию ожидается использование в `nuxt.js`
     *
     */
    nuxt: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes() {
      return {
        // [`el-logo--size-${this.size}`]: this.size,
      }
    },

    defaultTag() {
      return "div"
    },

    tag() {
      if (this.to) {
        return this.nuxt ? "nuxt-link" : "router-link"
      } else if (this.href) {
        return "a"
      }
      return this.defaultTag
    },

    tagBind() {
      const result = {}
      if (this.to) {
        result.to = this.to
      } else if (this.href) {
        result.href = this.href
      } else if (this.disabled || this.loading) {
        result.disabled = true
      }
      result.type = this.type

      return result
    },

    isTagActive() {
      if (this.tag === "nuxt-link") {
        return this.$router.resolve(this.to).route.path === this.$route.path
      }
      return false
    },
  },
}
</script>

<style lang="scss">
.mc-logo {
  $block-name: &;

  @include reset-text-indents();

  color: $color-text;
  font-family: $font-heading;
  display: inline-flex;
  white-space: nowrap;
  text-decoration: none;
  flex-wrap: nowrap;
  align-items: center;
  flex: 0 0 auto;
  padding: $space-xs;
  outline: none;

  &:hover,
  &:focus {
    #{$block-name} {
      &__text {
        color: $color-secondary;
      }
    }
  }

  &:active {
    #{$block-name} {
      &__text {
        color: darken($color-secondary, 8%);
      }
    }
  }

  &__img {
    display: inline-block;
    margin-right: $space-xs;
  }

  &__text {
    font-size: 30px;
    font-weight: $weight-semi-bold;
    line-height: $line-height-xs;
    transition: color $duration-quickly;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McLogo @click.prevent href="javascript:void(0);" title="Network"/>
    <McLogo @click.prevent href="javascript:void(0);" title="Stats"/>
    <McLogo @click.prevent href="javascript:void(0);" title="Identity"/>
    <McLogo @click.prevent href="javascript:void(0);" title="Studio"/>
  </div>
  ```
</docs>
