<template>
  <RecycleScroller :items="items" :item-size="78" key-field="id">
    <McTableHead
      slot="before"
      :size="size"
      :items="headers"
      :sortable="sortable"
      :sorted-by="sortedBy"
      :sorted-descending="sortedDescending"
      :tooltip="tooltip"
      @click="handleHeaderClick"
    />

    <McTableFoot
      slot="after"
      v-if="!items.length || infinite"
      :size="size"
      :items="items"
      :headers="headers"
      :infinite="infinite"
      :hasMore="hasMore"
      :lang="lang"
      :container-element="containerElement"
      @load="handleLoad"
      :loading="loading"
    />
    <template v-slot="{ item }">
      <McTableRow
        :size="size"
        :item="item"
        :headers="headers"
        :checkable="checkable"
        :checked-items="checkedItems"
        :check-by="checkBy"
        @check="value => handleCheck(item, value)"
        :container-element="containerElement"
      >
        <slot
          v-for="header in headers"
          :name="`cell-${header.key}`"
          :slot="`cell-${header.key}`"
          :item="item"
        />
        <slot name="link" slot="link" :item="item" />
      </McTableRow>
    </template>
  </RecycleScroller>
</template>

<script>
import McTableHead from "./McTableHead"
import McTableFoot from "./McTableFoot"
import McTableBody from "./McTableBody"
import McButton from "../../elements/McButton"
import McPreview from "../McPreview"
import McAvatar from "../../elements/McAvatar/McAvatar"
import McTitle from "../../elements/McTitle"
import McAvatarStatus from "../../elements/McAvatar/McAvatarStatus"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McBage from "../../elements/McBage"
import McTooltip from "../../elements/McTooltip"
import McSvgIcon from "../../elements/McSvgIcon"
import McStack from "../../elements/McStackCounter/McStack"
import McChip from "../../elements/McChip"
import McFieldText from "../../elements/McField/McFieldText"
import McTableCellLink from "./McTableCellLink"
import McTableRow from "./McTableRow"

export default {
  name: "McTable",
  components: {
    McTableCellLink,
    McFieldText,
    McChip,
    McStack,
    McSvgIcon,
    McTooltip,
    McBage,
    McGridCol,
    McGridRow,
    McAvatarStatus,
    McTitle,
    McAvatar,
    McPreview,
    McButton,
    McTableHead,
    McTableBody,
    McTableFoot,
    McTableRow,
  },
  props: {
    headers: {
      type: [Array, Object],
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    sortable: {
      type: [Boolean, Array],
      default: false,
    },
    sortedBy: {
      type: String,
      required: false,
    },
    sortedDescending: {
      type: Boolean,
      default: false,
    },
    sortedDefaultDescending: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: [Boolean, Array],
      required: false,
    },
    lang: {
      //type:,
      required: false,
      default() {
        return {
          all_loaded: "Все данные загружены",
          no_data: "Нет данных",
        }
      },
    },
    infinite: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasMore: {
      type: Boolean,
      default: false,
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
    fixed: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "m",
    },
    containerElement: {
      default: null,
    },
  },
  computed: {
    classes() {
      return {
        ["mc-table--fixed"]: this.fixed,
        ["mc-table--loading"]: this.loading,
        ["mc-table--compleate"]: !this.hasMore,
      }
    },
  },
  methods: {
    handleHeaderClick(header) {
      let descending = this.sortedDefaultDescending
      if (this.sortedBy === header.key) {
        descending = !this.sortedDescending
      }
      this.$emit("sort", { key: header.key, descending })
    },
    handleCheck(item, value) {
      this.$emit("check", { item, value })
    },
    handleLoad() {
      this.$emit("load")
    },
  },
}
</script>

<style lang="scss">
.mc-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.mc-table {
  $block-name: &;

  border-collapse: collapse;
  width: 100%;
  border: none;
  max-width: 100%;

  &--fixed {
    table-layout: fixed;
  }
}
</style>

<docs>
    ```jsx
    import _minBy from 'lodash/minBy'
    import _sortBy from 'lodash/sortBy'
    import { number } from "../../utils/filters"
    let headers = [
    {
    key: 'title',
    title: 'Канал',
    hasBorder: true,
    width: '251px',
    textAlign: 'left',
    },
    {
    key: 'user',
    title: 'Пользователь',
    textAlign: 'left'
    },
    {
    key: 'roles',
    title: 'Роль',
    textAlign: 'left',
    width: '190px',
    },
    {
    key: 'channels',
    title: 'Канал',
    textAlign: 'left',
    width: '120px',
    },
    {
    key: 'views_count',
    title: 'Просмотры',
    textAlign: 'left'
    },
    // {
    // key: 'average_views_per_video',
    // title: 'Ср. пр. на видео',
    // textAlign: 'left'
    // },
    // {
    // key: 'subscribers_count',
    // title: 'Подписчики',
    // textAlign: 'left'
    // },
    {
    key: 'categories',
    title: 'Жанр',
    textAlign: 'left'
    },
    {
    key: 'language',
    title: 'Язык',
    },
    {
    key: 'country',
    title: 'Страна ауд.',
    },
    {
    key: 'status',
    title: 'Статус',
    textAlign: 'left'
    },
    {
    key: 'price',
    title: 'Цена интегр.',
    },
    {
    key: 'owner',
    title: 'Владелец',
    textAlign: 'left',
    width: '200px',
    },
    {
    key: 'action',
    title: 'Действие',
    width: '243px',
    }
    ]
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
    price: item.agency_channels.filter( item => item.type === 2 ).length ? number(_minBy(item.agency_channels.filter(
    item => item.type === 2 ), 'total').total, 0) + ' $' : null,
    }
    });

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

    <div>
        <McTable
                :loading="true"
                :headers="headers"
                :items="bodyMapped"
                :infinite="true"
                :hasMore="true"
                :sortable="['views_count', 'language', 'price']"
                :sorted-by="sortBy"
                :sorted-descending="sortDescending"
                :sorted-default-descending="true"
                @sort="sort"
                :checkable="true"
                :checked-items="checkedItems"
                @check="check"
        >
            <template slot="link" slot-scope="row">
                <McTableCellLink href="/#/Patterns/McCard"/>
            </template>
            <template slot="cell-user" slot-scope="row">
                <McButton href="#" target="_blank" variation="blue-link">
                    Роман Подумеев
                </McButton>
            </template>
            <template slot="cell-title" slot-scope="row">
                <McPreview>
                    <McAvatarStatus slot="left" border-color="blue" dot-color="orange" lazy :src="row.item.avatar"
                                    size="s"/>
                    <McGridRow style="height: 100%" slot="cell-right" :wrap="false" align="middle" :gutter-x="5">
                        <McGridCol>
                            <McTooltip size="s" placement="top" content="Редактировать">
                                <McButton variation="blue-link" size="s-compact">
                                    <McSvgIcon slot="icon-append" name="create" size="xxs"/>
                                </McButton>
                            </McTooltip>
                        </McGridCol>
                        <McGridCol>
                            <McTooltip size="s" placement="top" content="Копировать">
                                <McButton variation="blue-link" size="s-compact">
                                    <McSvgIcon slot="icon-append" name="delete" size="xxs"/>
                                </McButton>
                            </McTooltip>
                        </McGridCol>
                    </McGridRow>
                    <McTitle size="m" slot="top">{{ row.item.title }}</McTitle>
                </McPreview>
                <McBage vertical-line variation="light-green"/>
            </template>
            <template slot="cell-roles" slot-scope="row">
                <McStack :limit="1">
                    <McChip variation="gray-dark-invert">Администратор</McChip>
                    <McChip variation="gray-dark-invert">Администратор</McChip>
                    <McChip variation="gray-dark-invert">Администратор</McChip>
                </McStack>
            </template>
            <template slot="cell-channels" slot-scope="row">
                <McStack :limit="3">
                    <McAvatar rounded lazy size="s"/>
                    <McAvatar rounded lazy size="s"/>
                    <McAvatar rounded lazy size="s"/>
                    <McAvatar rounded lazy size="s"/>
                </McStack>
            </template>
            <template slot="cell-status" slot-scope="row">
                <McBage variation="red">Отклонен</McBage>
            </template>
            <template slot="cell-owner" slot-scope="row">
                <div style="display: flex; align-items: center; height: 100%;">
                    <McFieldText name="test" placeholder="Владелец"/>
                </div>
            </template>
            <template slot="cell-action" slot-scope="row">
                <McGridRow justify="right" :wrap="false" align="middle" :gutter-x="5">
                    <McGridCol>
                        <McButton size="s">Выплатить</McButton>
                    </McGridCol>
                    <McGridCol>
                        <McButton variation="red" size="s">Отменить</McButton>
                    </McGridCol>
                </McGridRow>
            </template>
        </McTable>
    </div>
    ```
</docs>
