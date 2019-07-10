<template>
  <table class="mc-table">
    <McTableHead :items="headers"></McTableHead>
    <McTableBody :items="items" :headers="headers">
      <template v-for="header in headers" :slot="header.key" slot-scope="row">
        <slot :name="header.key" :item="row.item" />
      </template>
    </McTableBody>
  </table>
</template>

<script>
import McTableHead from "./McTableHead"
import McTableBody from "./McTableBody"
import McButton from "../../elements/McButton"
import McPreview from "../McPreview"
import McAvatar from "../../elements/McAvatar/McAvatar"
import McTitle from "../../elements/McTitle"
import McAvatarStatus from "../../elements/McAvatar/McAvatarStatus"
export default {
  name: "McTable",
  components: { McAvatarStatus, McTitle, McAvatar, McPreview, McButton, McTableHead, McTableBody },
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
    },
    checkBy: {
      type: String,
      default: "id",
    },
    placeholderNoData: {
      type: String,
      default: null,
    },
    placeholderAllLoaded: {
      type: String,
      default: null,
    },
  },
  computed: {
    classes() {
      return {
        // [`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table {
  $block-name: &;

  border-collapse: collapse;
}
</style>

<docs>
  ```jsx
  import _minBy from 'lodash/minBy'
  let headers = [
    {
      key: 'title',
      title: 'Канал',
    },
    {
      key: 'views_count',
      title: 'Просмотры',
    },
    {
      key: 'average_views_per_video',
      title: 'Ср. пр. на видео',
    },
    {
      key: 'subscribers_count',
      title: 'Подписчики',
    },
    {
      key: 'categories',
      title: 'Жанр',
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
      key: 'price',
      title: 'Цена интегр.',
    }
  ]
  let body = require('../../mocks/tableInfusersBody').default;
  let total = 1
  let bodyMapped = body.map(item => (
    {
      title: item.title,
      avatar: item.image_small,
      views_count: item.views_count,
      average_views_per_video: item.average_views_per_video,
      subscribers_count: item.subscribers_count,
      categories: item.categories.map(c => c.title).join(', '),
      language: item.language.name,
      country: item.country.name,
      price: item.agency_channels.filter( item => item.type === 2 ).length ? _minBy(item.agency_channels.filter( item => item.type === 2 ), 'total').total : null
    }
  ))
  <div>
    <McTable :headers="headers" :items="bodyMapped">
      <template slot="title" slot-scope="row">
        <McPreview>
          <McAvatarStatus slot="left" border-color="dodger-blue-light" dot-color="gorse" lazy :src="row.item.avatar" size="s"/>
          <McTitle size="m" slot="top">{{ row.item.title }}</McTitle>
        </McPreview>
      </template>
    </McTable>
  </div>
  ```
</docs>
