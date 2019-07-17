<template>
  <tfoot class="mc-table-foot">
    <McTableRow v-if="items.length">
      <McTableCell :size="size" :item="headers[0]">
        <template v-if="infinite">
          <template v-if="hasMore">
            <pacman-loader color="rgb(197, 61, 20)" size="30px" />
          </template>
          <template v-else>
            <McTitle :text-align="computedTextAlign" tagName="span">
              Все данные загружены
            </McTitle>
          </template>
        </template>
      </McTableCell>
      <McTableCell :colspan="headers.length - 1" :size="size" />
    </McTableRow>
    <McTableRow v-else>
      <McTableCell :size="size" :colspan="headers.length">
        <template v-if="!items.length">
          <McTitle text-align="center" tagName="span">
            Нет данных
          </McTitle>
        </template>
      </McTableCell>
    </McTableRow>
  </tfoot>
</template>

<script>
import "vue-loaders/dist/vue-loaders.css"
import { PacmanLoader } from "vue-loaders"
import McTableCell from "./McTableCell"
import McTableRow from "./McTableRow"
import McTitle from "../../elements/McTitle"
export default {
  name: "McTableFoot",
  components: { McTitle, McTableRow, McTableCell, "pacman-loader": PacmanLoader },
  props: {
    headers: {
      type: [Array, Object],
      required: true,
    },
    items: {
      type: [Array, Object],
      required: true,
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
    infinite: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedTextAlign() {
      return this.headers[0].textAlign || this.textAlign
    },
  },
}
</script>

<style lang="scss">
.mc-table-foot {
  $block-name: &;

  border-left: 1px solid $color-gray-light;
  border-right: 1px solid $color-gray-light;
}
</style>
