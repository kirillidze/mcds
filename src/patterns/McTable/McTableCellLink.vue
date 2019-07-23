<template>
  <component :is="tag" v-bind="tagBind" class="mc-table-cell-link" v-on="$listeners"> </component>
</template>

<script>
export default {
  name: "McTableCellLink",
  props: {
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
    isLink() {
      return this.to || this.href
    },

    tag() {
      let link = this.nuxt ? "nuxt-link" : "router-link"

      return this.to ? link : "a"
    },

    tagBind() {
      return {
        target: this.target,
        to: this.to,
        href: this.href,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table-cell-link {
  $block-name: &;
  @include position(absolute, 0);
  z-index: 1;
}
</style>
