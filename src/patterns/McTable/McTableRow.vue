<template>
  <tr
    class="mc-table-row"
    :class="classes"
    :style="{ visibility: isVisible ? 'visible' : 'hidden' }"
  >
    <slot>
      <McTableCell
        :checkable="index === 0 && checkable"
        :size="size"
        v-for="(cell, index) in headers"
        :key="cell.key"
        :item="cell"
      >
        <slot name="link" v-if="$slots.link"></slot>
        <McFieldCheckbox
          v-if="index === 0 && checkable"
          :value="isChecked"
          @input="handleCheckInput"
        />
        <slot :name="`cell-${cell.key}`">
          <McTitle :text-align="cell.textAlign || textAlign" tagName="span">
            {{ _get(item, cell.key) }}
          </McTitle>
        </slot>
      </McTableCell>
    </slot>
  </tr>
</template>

<script>
import _get from "lodash/get"
import McTableCell from "./McTableCell"
import McTitle from "../../elements/McTitle"
import McFieldCheckbox from "../../elements/McField/McFieldCheckbox"
import { findParentComponent } from "../../utils/treeSearch"
export default {
  name: "McTableRow",
  components: { McTitle, McTableCell, McFieldCheckbox },
  props: {
    headers: {
      type: [Array, Object],
      default: null,
    },
    item: {
      type: Object,
      default: null,
    },
    size: {
      type: String,
      default: "m",
    },
    /**
     *  Позиция текста:
     *  `left, center, right`
     */
    textAlign: {
      type: String,
      default: "right",
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    checkedItems: {
      type: Array,
      default() {
        return []
      },
    },
    checkBy: {
      type: String,
      default: "id",
    },
    optimizeVisibility: {
      type: Boolean,
      default: true,
    },
    containerElement: {
      default: null,
    },
  },
  data() {
    return {
      isVisible: true,
      offsetHeight: 0,
      wrapper: null,
    }
  },
  computed: {
    isChecked() {
      return !!this.checkedItems.find(i => i[this.checkBy] === this.item[this.checkBy])
    },
    classes() {
      return {
        "mc-table-row--link": this.$slots.link,
      }
    },
  },
  mounted() {
    if (this.optimizeVisibility && this.containerElement) {
      if (this.containerElement === "McTableCardWrap") {
        this.wrapper = findParentComponent(this, "McTableCardWrap").$el.getElementsByClassName(
          "mc-table-card-wrap__inner"
        )[0]
      }

      if (this.containerElement === "McTableCardBody") {
        this.wrapper = findParentComponent(this, "McTableCardBody").$el.querySelector(
          ".mc-table-card-body__left .mc-table-card-body__inner-col"
        )
      }

      if (this.wrapper) {
        this.checkVisibility()
        this.wrapper.addEventListener("scroll", this.checkVisibility)
        window.addEventListener("resize", this.checkVisibility)
        setInterval(() => {
          this.offsetHeight = this.$el.offsetHeight
        }, 250)
      }
    }
  },
  watch: {
    offsetHeight(val, prevVal) {
      if (val && !prevVal) {
        this.checkVisibility()
      }
    },
  },
  methods: {
    _get(...args) {
      return _get(...args)
    },
    handleCheckInput(value) {
      this.$emit("check", value)
    },
    checkVisibility() {
      let el = this.$el
      let wrapper = this.wrapper

      let boxWrapper = wrapper.getBoundingClientRect()
      let boxRow = el.getBoundingClientRect()

      this.isVisible = boxRow.bottom > boxWrapper.top && boxRow.top < boxWrapper.bottom
    },
  },
}
</script>

<style lang="scss">
.mc-table-row {
  $block-name: &;

  background-color: $color-white;
  position: relative;

  &--link {
    &:hover,
    &:focus {
      background-color: fade-out($color-black, 0.95);

      & .mc-table-cell .mc-grid-row {
        background-color: #f3f3f3;

        &:before {
          background: linear-gradient(90deg, hsla(0, 0%, 92.9%, 0) 0, #f3f3f3);
        }
      }
    }

    &:active {
      background-color: fade-out($color-black, 0.9);

      & .mc-table-cell .mc-grid-row {
        background-color: #e7e7e7;

        &:before {
          background: linear-gradient(90deg, hsla(0, 0%, 92.9%, 0) 0, #e7e7e7);
        }
      }
    }
  }
}
</style>
