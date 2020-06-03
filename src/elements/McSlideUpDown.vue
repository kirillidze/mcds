<script>
/**
 * Используется исключительно для mc-collapse
 */
export default {
  name: "McSlideUpDown",
  status: "ready",
  release: "1.0.0",

  props: {
    active: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 500,
    },
    tag: {
      type: String,
      default: "div",
    },
    useHidden: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    style: {},
    initial: false,
    hidden: false,
  }),

  watch: {
    active() {
      this.layout()
    },
  },

  render(h) {
    return h(
      this.tag,
      {
        style: this.style,
        attrs: this.attrs,
        ref: "container",
        on: { transitionend: this.onTransitionEnd },
      },
      this.$slots.default
    )
  },

  mounted() {
    this.layout()
    this.initial = true
  },

  created() {
    this.hidden = !this.active
  },

  computed: {
    el() {
      return this.$refs.container
    },

    attrs() {
      const attrs = {
        "aria-hidden": !this.active,
        "aria-expanded": this.active,
      }

      if (this.useHidden) {
        attrs.hidden = this.hidden
      }

      return attrs
    },
  },

  methods: {
    layout() {
      if (this.active) {
        this.hidden = false
        /**
         * Событие перед началом открытия
         */
        this.$emit("slide-open-start")
        if (this.initial) {
          this.setHeight("0px", () => `${this.el.scrollHeight}px`)
        }
      } else {
        /**
         * Событие перед началом закрытия
         */
        this.$emit("slide-close-start")
        this.setHeight(`${this.el.scrollHeight}px`, () => "0px")
      }
    },

    asap(callback) {
      if (!this.initial) {
        callback()
      } else {
        this.$nextTick(callback)
      }
    },

    setHeight(temp, afterRelayout) {
      this.style = { height: temp }

      this.asap(() => {
        // force relayout so the animation will run
        this.__ = this.el.scrollHeight

        this.style = {
          height: afterRelayout(),
          overflow: "hidden",
          "transition-property": "height",
          "transition-duration": this.duration + "ms",
        }
      })
    },

    onTransitionEnd() {
      if (this.active) {
        this.style = {}
        /**
         * Событие после открытия
         */
        this.$emit("slide-open-end")
      } else {
        this.style = {
          height: "0",
          overflow: "hidden",
        }
        this.hidden = true
        /**
         * Событие после закрытия
         */
        this.$emit("slide-close-end")
      }
    },
  },
}
</script>

<docs>
    ```jsx
    let isActive = false
    <div>
        <mc-button @click="isActive = !isActive">
            Toggle
        </mc-button>
        <mc-slide-up-down :active="isActive">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Autem doloribus est illo laborum libero nostrum suscipit tempora voluptates! Assumenda, provident!
        </mc-slide-up-down>
    </div>
    ```
</docs>
