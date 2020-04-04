<script>
export default {
  functional: true,
  name: "McTableCellLink",
  data() {
    return {
      isTagActive: false,
      isLink: false,
    }
  },
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
  render(h, { props, data, listeners, parent }) {
    const classes = {
      "mc-table-cell-link": true,
      "mc-table-cell-link--active": isTagActive,
      ...(data.class || {}),
    }

    if (data.staticClass) {
      const staticClasses = data.staticClass.split(" ")
      staticClasses.forEach(c => {
        if (c) {
          classes[c] = true
        }
      })
    }
    let style = {}
    if (data.staticStyle) {
      style = data.staticStyle
    }

    const link = props.nuxt ? "nuxt-link" : "router-link"
    const tag = props.to ? link : "a"

    const tagBind = {}
    if (props.to) {
      tagBind.to = props.to
    } else if (props.href) {
      tagBind.href = props.href
    }

    let isTagActive = false
    if (tag === "nuxt-link") {
      isTagActive = parent.$router.resolve(props.to).route.path === parent.$route.path
    }

    data.isLink = props.to || props.href

    return h("component", {
      class: classes,
      style,
      is: tag,
      on: listeners,
      attrs: tagBind,
    })
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
