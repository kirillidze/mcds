<template>
  <tr class="mc-table-row" :class="classes">
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
import { findChildrenComponents } from "../../utils/treeSearch"
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
      isChildActive: false,
    }
  },
  computed: {
    isChecked() {
      return !!this.checkedItems.find(i => i[this.checkBy] === this.item[this.checkBy])
    },
    classes() {
      return {
        "mc-table-row--link": this.$slots.link,
        "nuxt-link-active": this.isChildActive,
      }
    },
  },
  mounted() {
    this.setIsChildActive()
  },
  watch: {
    $route() {
      this.setIsChildActive()
    },
  },
  methods: {
    _get(...args) {
      return _get(...args)
    },
    handleCheckInput(value) {
      this.$emit("check", value)
    },
    setIsChildActive() {
      let cellLinks = findChildrenComponents(this, "McTableCellLink")
      if (cellLinks.length > 0) {
        this.isChildActive = cellLinks[0].isTagActive
      }
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
    &.nuxt-link-active {
      background-color: $color-lightest-blue;
      transition: none;
      position: sticky;
      z-index: 3;
      top: $height-header + $height-top-line + 48px;

      & .mc-table-cell .mc-grid-row {
        background-color: $color-lightest-blue;

        &:before {
          background: linear-gradient(90deg, hsla(0, 0%, 92.9%, 0) 0, $color-lightest-blue);
        }
      }
    }

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
