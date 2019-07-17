<template>
  <div class="mc-main" :class="classes">
    <div class="mc-main__inner">
      <div class="mc-main__content">
        <slot name="header">
          <div ref="stick" class="mc-main__stick">
            <slot name="stick"></slot>
          </div>
        </slot>
        <main class="mc-main__main">
          <slot></slot>
          <McContainer>
            <McTableInfinityWrap
              :style="{ height: `calc(var(--vh, 1vh) * 100 - ${stickyHeight}px)` }"
            >
              <slot name="table"></slot>
            </McTableInfinityWrap>
          </McContainer>
        </main>
      </div>
    </div>
    <slot name="includes" />
  </div>
</template>

<script>
import McHeader from "../../patterns/McHeader/McHeader"
import McTable from "../../patterns/McTable/McTable"
import McButton from "../../elements/McButton"
import McPreview from "../../patterns/McPreview"
import McGridCol from "../../patterns/McGrid/McGridCol"
import McGridRow from "../../patterns/McGrid/McGridRow"
import McFieldCheckbox from "../../elements/McField/McFieldCheckbox"
import McAvatarStatus from "../../elements/McAvatar/McAvatarStatus"
import McTooltip from "../../elements/McTooltip"
import McSvgIcon from "../../elements/McSvgIcon"
import McStack from "../../elements/McStackCounter/McStack"
import McTitle from "../../elements/McTitle"
import McBage from "../../elements/McBage"
import McChip from "../../elements/McChip"
import McAvatar from "../../elements/McAvatar/McAvatar"
import McFieldText from "../../elements/McField/McFieldText"
import McTopLine from "../McTopLine"
import McTableInfinityWrap from "../../patterns/McTable/McTableInfinityWrap"
import McContainer from "../../patterns/McContainer"
export default {
  name: "McMain",
  components: {
    McContainer,
    McTableInfinityWrap,
    McTopLine,
    McFieldText,
    McAvatar,
    McChip,
    McBage,
    McTitle,
    McStack,
    McSvgIcon,
    McTooltip,
    McAvatarStatus,
    McFieldCheckbox,
    McGridRow,
    McGridCol,
    McPreview,
    McButton,
    McTable,
    McHeader,
  },
  status: "ready",
  release: "0.0.1",
  data() {
    return {
      stickyHeight: 0,
    }
  },
  props: {
    calculated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        //[`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
  mounted() {
    if (this.calculated) {
      this.setValues()
      window.addEventListener("resize", this.setValues)
    }
  },

  beforeDestroy() {
    if (this.calculated) {
      window.removeEventListener("resize", this.setValues)
    }
  },

  methods: {
    setValues() {
      this.stickyHeight = this.setStickyHeight()
    },

    setStickyHeight() {
      return this.$refs.stick.clientHeight
    },
  },
}
</script>

<style lang="scss">
.mc-main {
  $block-name: &;

  display: flex;
  flex-direction: column;
  min-height: 100%;

  position: relative;

  &__inner {
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    display: flex;
    flex-direction: column;
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__stick {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: $z-index-header;
  }

  &__main {
  }

  &__footer-wrapper {
    flex-shrink: 0;
  }
}
</style>

<docs>
  ```jsx
  import _minBy from 'lodash/minBy'
  import { number } from "../../utils/filters"

  let menuAdditional = require('@/mocks/menuAdditional').default;
  let menuMain = require('@/mocks/menuMain').default;
  let menuApps = require('@/mocks/menuApps').default;
  let menuProfile = require('@/mocks/menuProfile').default;
  let menuLangs = require('@/mocks/menuLangs').default;
  let authUser = require('@/mocks/authUser').default;
  let searchResult = require('@/mocks/searchResult').default;
  let notifications = require('@/mocks/notifications').default;
  let search = null
  let eventTest = (val) => alert(val)
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
    title: item.title,
    avatar: item.image_small,
    views_count: number(item.views_count, 0),
    average_views_per_video: number(item.average_views_per_video, 0),
    subscribers_count: number(item.subscribers_count, 0),
    categories: item.categories.map(c => c.title).join(', '),
    language: item.language.name,
    country: item.country.name,
    price: item.agency_channels.filter( item => item.type === 2 ).length ? number(_minBy(item.agency_channels.filter( item => item.type === 2 ), 'total').total, 0) + ' $' : null,
  }
  }).slice(0, 30);
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
      <McMain calculated>
        <template slot="stick">
          <McHeader
                  v-model="search"
                  logo-title="Mediacube"
                  logo-src="/icons/mediacube.svg"
                  logo-href="javascript:void(0);"
                  :notifications="notifications"
                  notifications-text-accept="Принять"
                  notifications-text-reject="Отклонить"
                  :menu-additional="menuAdditional"
                  :menu-main="menuMain"
                  :menu-apps="menuApps"
                  :menu-profile="menuProfile"
                  :menu-langs="menuLangs"
                  :user="authUser"
                  :search-items="searchResult"
                  search-placeholder="Начните вводить"
                  chatra-id="dzDw7eBbL2ramxx25"
                  searchable
                  hasMobileMenu
                  @search-submit="eventTest('Search submit')"
                  @click-add-entity="(val) => eventTest('itemValue: ' + val.value)"
                  @click-accept="(id) => eventTest('id: ' + id)"
                  @click-reject="(id) => eventTest('id: ' + id)"
          />
          <McTopLine>
            <template>
              <McButton>Фильтр</McButton>
            </template>
            <template slot="right">
              <McButton variation="primary-link">Добавить контракт</McButton>
              <McTitle tag="p" color="gray-dark">19 контрактов</McTitle>
            </template>
          </McTopLine>
        </template>
        <McContainer>
          какаю-нибудь поебень
        </McContainer>
        <McTable
                slot="table"
                :loading="true"
                :headers="headers"
                :items="bodyMapped"
                :infinite="true"
                :hasMore="true"
                :sortable="['views_count', 'language', 'price']"
                :sorted-by="'language'"
                :sorted-descending="true"
                :sorted-default-descending="true"
                @sort="sort"
                :checkable="true"
                :checked-items="checkedItems"
                @check="check"
        >

          <template slot="user" slot-scope="row">
            <McButton href="#" target="_blank" variation="primary-link">
              Роман Подумеев
            </McButton>
          </template>

          <template slot="title" slot-scope="row">
            <McPreview>
              <McAvatarStatus slot="left" border-color="dodger-blue-light" dot-color="gorse" lazy :src="row.item.avatar" size="s"/>
              <McGridRow style="height: 100%" slot="right" :wrap="false" align="middle" :gutter-x="5">
                <McGridCol>
                  <McTooltip size="s" placement="top" content="Редактировать">
                    <McButton variation="primary-link" size="s-compact">
                      <McSvgIcon slot="icon-append" name="create" size="xxs"/>
                    </McButton>
                  </McTooltip>
                </McGridCol>
                <McGridCol>
                  <McTooltip size="s" placement="top" content="Копировать">
                    <McButton variation="primary-link" size="s-compact">
                      <McSvgIcon slot="icon-append" name="delete" size="xxs"/>
                    </McButton>
                  </McTooltip>
                </McGridCol>
              </McGridRow>
              <McTitle size="m" slot="top">{{ row.item.title }}</McTitle>
            </McPreview>
            <McBage vertical-line variation="success"/>
          </template>

          <template slot="roles" slot-scope="row">
            <McStack :limit="1">
              <McChip variation="gray-darkest-invert">Администратор</McChip>
              <McChip variation="gray-darkest-invert">Администратор</McChip>
              <McChip variation="gray-darkest-invert">Администратор</McChip>
            </McStack>
          </template>

          <template slot="channels" slot-scope="row">
            <McStack :limit="3">
              <McAvatar rounded lazy size="s"/>
              <McAvatar rounded lazy size="s"/>
              <McAvatar rounded lazy size="s"/>
              <McAvatar rounded lazy size="s"/>
            </McStack>
          </template>

          <template slot="owner" slot-scope="row">
            <div style="display: flex; align-items: center; height: 100%;">
              <McFieldText name="test" placeholder="Владелец"/>
            </div>
          </template>

          <template slot="action" slot-scope="row">
            <McGridRow justify="right" :wrap="false" align="middle" :gutter-x="5">
              <McGridCol>
                <McButton size="s">Выплатить</McButton>
              </McGridCol>
              <McGridCol>
                <McButton variation="danger" size="s">Отменить</McButton>
              </McGridCol>
            </McGridRow>
          </template>
        </McTable>
      </McMain>
  </div>
  ```
</docs>
