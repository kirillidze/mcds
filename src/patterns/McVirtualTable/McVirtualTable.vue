<template>
  <div :style="wrapperStyles">
    <component
      class="mc-virtual-table"
      ref="xTable"
      :is="tag"
      v-bind="$attrs"
      v-on="$listeners"
      row-id="id"
      highlight-hover-row
      highlight-current-row
      show-header-overflow="tooltip"
      show-overflow="tooltip"
      show-footer-overflow="tooltip"
      auto-resize
      :sync-resize="cardIsOpen"
      :scroll-y="scrollY"
      :show-footer="canShowFooter"
      :footer-method="footerMethod"
      :sort-config="{ remote: !nativeSort, showIcon: false, trigger: 'cell', orders: sortOrders }"
      @scroll="handleScroll"
    >
      <slot />
      <template v-slot:empty>
        <mc-title text-align="center">
          {{ placeholders.no_data }}
        </mc-title>
      </template>
    </component>
  </div>
</template>

<script>
import _debounce from "lodash/debounce"
import McTitle from "../../elements/McTitle"
import McSvgIcon from "../../elements/McSvgIcon"
import McButton from "../../elements/McButton"
import McVirtualTableCol from "./McVirtualTableCol"
import McPreview from "../McPreview"
import McAvatarStatus from "../../elements/McAvatar/McAvatarStatus"
import McGridCol from "../McGrid/McGridCol"
import McGridRow from "../McGrid/McGridRow"
import McTooltip from "../../elements/McTooltip"
import McBage from "../../elements/McBage"
import McStack from "../../elements/McStackCounter/McStack"
import McChip from "../../elements/McChip"
import McAvatar from "../../elements/McAvatar/McAvatar"
import McFieldText from "../../elements/McField/McFieldText"
import McFieldSelect from "../../elements/McField/McFieldSelect"

export default {
  name: "McVirtualTable",
  components: {
    McFieldSelect,
    McFieldText,
    McAvatar,
    McChip,
    McStack,
    McBage,
    McTooltip,
    McGridRow,
    McGridCol,
    McAvatarStatus,
    McPreview,
    McVirtualTableCol,
    McButton,
    McTitle,
    McSvgIcon,
  },
  provide() {
    const provideData = {}
    const properties = [
      "canShowLoader",
      "cardIsOpen",
      "placeholders",
      "nativeSort",
      "sortedBy",
      "sortedDescending",
    ]
    properties.forEach(property => {
      Object.defineProperty(provideData, property, {
        enumerable: true,
        get: () => this[property],
      })
    })
    return { provideData }
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    /**
     *  Есть ли ещё данные для подгрузки
     */
    hasMore: {
      type: Boolean,
      default: false,
    },
    /**
     *  Будет ли иметь таблица
     *  собственный скролл
     */
    scrollable: {
      type: Boolean,
      default: false,
    },
    /**
     *  Сортировка таблицей, без api
     */
    nativeSort: {
      type: Boolean,
      default: false,
    },
    /**
     *  Тип таблицы:
     *  `table, grid`
     */
    componentTag: {
      type: String,
      default: "table",
    },
    /**
     *  Переводы локализаций
     */
    placeholders: {
      type: Object,
      default() {
        return {
          no_data: "No data",
          all_loaded: "All loaded",
        }
      },
    },
    sortedBy: {
      type: String,
      required: false,
    },
    sortedDescending: {
      type: Boolean,
      default: false,
    },
    /**
     *  Если нужен иной порядок сортировки
     */
    sortOrders: {
      type: Array,
      default() {
        return ["asc", "desc", null]
      },
    },
    /**
     *  Параметры виртуального скролла:
     *  `gt: 0 - всегда включён; -1 - всегда выключен;
     *  число (строк), сверх которого включается виртуальный скролл`
     */
    scrollY: {
      type: Object,
      default() {
        return {
          gt: 0,
        }
      },
    },
  },
  data() {
    return {
      observer: null,
      cardIsOpen: false,
      firstColsWidth: 253,
    }
  },
  async mounted() {
    await this.loadData()
    !this.scrollable && this.createObserver()
    await this.setFirstColsWidth()
  },
  beforeDestroy() {
    this.observer && this.observer.disconnect()
  },
  watch: {
    canShowFooter(newValue) {
      newValue && this.updateData()
    },
    items: {
      handler: async function(newVal) {
        newVal && (await this.loadData())
      },
      deep: true,
    },
    cardIsOpen(newVal) {
      this.toggleColumns(newVal)
    },
  },
  computed: {
    api() {
      return this.$refs.xTable
    },
    canShowLoader() {
      return !this.scrollable && this.hasMore
    },
    canShowFooter() {
      if (this.scrollable) {
        return !this.hasMore && !this.$attrs.loading && !!this.items.length
      }
      return !!this.items.length
    },
    tag() {
      return `vxe-${this.componentTag}`
    },
    wrapperStyles() {
      return {
        width: this.cardIsOpen ? `${this.firstColsWidth}px` : "auto",
        height: this.$attrs.height || "auto",
        "max-height": this.$attrs["max-height"] || "none",
      }
    },
  },
  methods: {
    async loadData() {
      await this.$refs.xTable.loadData(this.items)
      !this.scrollable && this.setObserveElement()
    },
    reloadData() {
      this.$refs.xTable.reloadData(this.items)
    },
    updateData() {
      this.$refs.xTable.updateData()
    },
    footerMethod({ columns, data }) {
      return [
        columns.map(column => {
          if (column.type === "seq") return data.length
          if (column.type === "checkbox") return " "
          return null
        }),
      ]
    },
    handleScroll: _debounce(function({ scrollTop, $event, type, isY }) {
      const isBottom = scrollTop === $event.target.scrollHeight - $event.target.clientHeight
      if (isBottom && !this.$attrs.loading && this.hasMore && type === "body" && isY) {
        this.load()
      }
    }, 200),
    load() {
      this.$emit("load")
    },
    createObserver() {
      this.observer = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.load()
          }
        },
        { threshold: 0.1 }
      )
      this.setObserveElement()
    },
    setObserveElement() {
      const loader = this.$refs.xTable.$el.getElementsByClassName("mc-virtual-table-col__loader")
      loader.length && this.observer.observe(loader[0])
    },
    async setFirstColsWidth() {
      const columns = await this.$refs.xTable.getColumns()
      const leftFixedColumnsWidth = columns.reduce((sum, curr) => {
        if (curr.fixed === "left") {
          return sum + Number(curr.width || curr.minWidth)
        }
        return sum
      }, 0)
      if (leftFixedColumnsWidth) {
        this.firstColsWidth = leftFixedColumnsWidth + 5 // 5 - ширина скролла
      }
    },
    async toggleColumns(val) {
      if (val) {
        const columns = await this.$refs.xTable.getColumns()
        const hideColumns = columns.filter(col => col.fixed !== "left")
        hideColumns.forEach(col => (col.visible = false))
        await this.$refs.xTable.refreshColumn()
      } else {
        await this.$refs.xTable.resetColumn()
      }
      await this.$refs.xTable.recalculate()
    },
  },
}
</script>

<style lang="scss">
@import "~vxe-table/styles/variable.scss";

//override variables:
$vxe-table-border-color: $color-outline-gray;
$vxe-table-header-background-color: $color-white;

@import "~vxe-table/styles/modules.scss";

.vxe-table--tooltip-wrapper {
  .vxe-table--tooltip-content {
    white-space: normal;
  }
}

.mc-virtual-table {
  .vxe-header--row {
    min-height: $size-xxl + 1;
  }
  .vxe-header--column {
    min-height: $size-xxl + 1;
    .vxe-cell {
      min-height: $size-xxl + 1;
      &--title {
        display: flex;
        align-items: center;
      }
    }
    &.is--sortable {
      cursor: pointer;
    }
  }

  .vxe-cell {
    &--checkbox {
      display: flex;
      align-items: center;
      max-width: 100%;
      padding-left: 1.8em;
      .vxe-checkbox--icon {
        margin-right: $space-xxs;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    transition: background $duration-standart;
  }
  ::-webkit-scrollbar-track {
    background: $color-white;
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(240, 4%, 91%);
    border-radius: $radius-s;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #c1c1c1;
  }
}
</style>

<docs>
    ```jsx
    import _minBy from 'lodash/minBy'
    import _sortBy from 'lodash/sortBy'
    import { number } from "../../utils/filters"

    let body = require('../../mocks/tableInfusersBody').default;
    let bodyMapped = body.map((item, index) => {
        return {
            ...item,
            avatar: item.image_small,
            views_count: number(item.views_count, 0),
            average_views_per_video: number(item.average_views_per_video, 0),
            subscribers_count: number(item.subscribers_count, 0),
            categories: item.categories.map(c => c.title).join(', '),
            language: item.language.name,
            country: item.country.name,
            price: item.agency_channels.filter( item => item.type === 2 ).length ? number(_minBy(item.agency_channels.filter( item => item.type === 2 ), 'total').total, 0) + ' $' : null,
        }
    }).slice(0, 50);

    let sortBy = 'language';
    let sortDescending = true;

    let sort = ({key, descending}) => {
    alert(`Key: ${key}, Desc: ${descending}`)
    sortBy = key
    sortDescending = descending
    }

    let checkedItems = [];
    let check = value => {
    alert(`Values: ${value}`)
    checkedItems = [...value];
    }

    const tablePlaceholders = {
        no_data: 'Данных вообще нет!',
        all_loaded: 'Всё уже загружено',
    }

    function handleCellClassName({rowIndex}) {
        return "mc-virtual-table-col--border-bottom"
    }
    let loading = false
    function handleLoad() {
        loading = true
        setTimeout(() => {
            //alert(' data loaded')
            loading = false
        }, 2000)
    }

    const sortNameMethod = (a, b) => a - b

    function handleSorted({order}) {
        console.log(order)
    }
    function cellClickEvent(opt) {
        console.log(opt)
    }
    function selectChangeEvent({row, checked}) {
        alert(`${row.title} ${checked}`)
    }

    <div>
        <mc-title :ellipsis="false">
            More info:
            <mc-button variation="blue-link" href="https://xuliangzhan.com/vxe-table">
                https://xuliangzhan.com/vxe-table
            </mc-button>,
            <mc-button variation="blue-link" href="https://xuliangzhan.github.io/vxe-table">
                https://xuliangzhan.github.io/vxe-table
            </mc-button>
        </mc-title>

        <br />
        <br />

        <mc-virtual-table
            ref="table"
            height="500"
            scrollable
            stripe
            border="outer"
            component-tag="grid"
            :items="bodyMapped"
            :has-more="false"
            :loading="loading"
            :placeholders="tablePlaceholders"
            :cell-class-name="handleCellClassName"
            :checkbox-config="{labelField: 'user'}"
            native-sort
            @checkbox-change="selectChangeEvent"
            @load="handleLoad"
            @sort-change="handleSorted"
            @cell-click="cellClickEvent"
        >
            <mc-virtual-table-col type="seq" min-width="60" fixed="left" align="right" has-border />
            <mc-virtual-table-col type="checkbox" field="title" title="Канал" width="248" fixed="left">
                <template v-slot="{ row }">
                    <mc-preview>
                        <mc-avatar-status slot="left" border-color="blue" dot-color="orange" lazy :src="row.avatar" size="s"/>
                        <mc-grid-row style="height: 100%" slot="cell-right" :wrap="false" align="middle" :gutter-x="5">
                            <mc-grid-col>
                                <mc-tooltip size="s" placement="top" content="Редактировать">
                                    <mc-button variation="blue-link" size="s-compact">
                                        <mc-svg-icon slot="icon-append" name="create" size="xxs"/>
                                    </mc-button>
                                </mc-tooltip>
                            </mc-grid-col>
                            <mc-grid-col>
                                <mc-tooltip size="s" placement="top" content="Копировать">
                                    <mc-button variation="blue-link" size="s-compact">
                                        <mc-svg-icon slot="icon-append" name="delete" size="xxs"/>
                                    </mc-button>
                                </mc-tooltip>
                            </mc-grid-col>
                        </mc-grid-row>
                        <mc-title size="m" slot="top"> {{ row.title }} </mc-title>
                    </mc-preview>
                </template>
                <template v-slot:right="{ row }">
                    <mc-button style="margin-right: 4px;" variation="blue-link" size="s-compact">
                        <mc-svg-icon slot="icon-append" name="create" size="xxs"/>
                    </mc-button>
                    <mc-button variation="blue-link" size="s-compact">
                        <mc-svg-icon slot="icon-append" name="delete" size="xxs"/>
                    </mc-button>
                </template>
            </mc-virtual-table-col>

            <mc-virtual-table-col type="seq" fixed="left" min-width="5" has-border>
                <template v-slot="{ row }">
                    <mc-bage vertical-line variation="light-green" style="position: absolute; top: 0; left: 0; bottom: 0" />
                </template>
            </mc-virtual-table-col>

            <mc-virtual-table-col field="user" title="Пользователь" min-width="200">
                <template v-slot="{ row }">
                    <mc-title v-if="row.id%2">Почтальон Печкин</mc-title>
                    <mc-title v-else style="width: auto; max-width: 101%;">Клён кудрявый лист резной</mc-title>
                </template>
            </mc-virtual-table-col>

            <mc-virtual-table-col
                field="views_count"
                title="Просмотры"
                min-width="130"
                align="right"
                sortable
                :sortMethod="sortNameMethod"
            />

            <mc-virtual-table-col field="roles" title="Роль" width="190">
                <template v-slot="{ row }">
                    <mc-stack :limit="1">
                        <mc-chip variation="gray-dark-invert">Администратор</mc-chip>
                        <mc-chip variation="gray-dark-invert">Петух</mc-chip>
                        <mc-chip variation="gray-dark-invert">Лопух</mc-chip>
                    </mc-stack>
                </template>
            </mc-virtual-table-col>

            <mc-virtual-table-col field="channels" title="Канал" width="120">
                <template v-slot="{ row }">
                    <mc-stack :limit="3">
                        <mc-avatar rounded lazy size="s" />
                        <mc-avatar rounded lazy size="s" />
                        <mc-avatar rounded lazy size="s" />
                        <mc-avatar rounded lazy size="s" />
                    </mc-stack>
                </template>
            </mc-virtual-table-col>

            <mc-virtual-table-col field="status" title="Статус" min-width="150">
                <template v-slot="{ row }">
                    <mc-bage variation="red">Отклонен</mc-bage>
                </template>
            </mc-virtual-table-col>

            <mc-virtual-table-col field="owner" title="Владелец" width="200">
                <template v-slot="{ row }">
                    <div style="display: flex; align-items: center; height: 100%;">
                        <mc-field-text :name="`name-${row.id}`" placeholder="Владелец" />
                    </div>
                </template>
            </mc-virtual-table-col>

            <mc-virtual-table-col field="action" title="Действие" width="243" fixed="right">
                <template v-slot="{ row }">
                    <mc-grid-row justify="right" :wrap="false" align="middle" :gutter-x="5">
                        <mc-grid-col>
                            <mc-button size="s">Выплатить</mc-button>
                        </mc-grid-col>
                        <mc-grid-col>
                            <mc-button variation="red" size="s">Отменить</mc-button>
                        </mc-grid-col>
                    </mc-grid-row>
                </template>
            </mc-virtual-table-col>
        </mc-virtual-table>
    </div>
    ```
</docs>
