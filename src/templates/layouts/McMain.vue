<template>
  <div class="mc-main">
    <div class="mc-main__inner">
      <div class="mc-main__content">
        <!-- @slot Слот хедера -->
        <slot name="header" />
        <main class="mc-main__main">
          <!-- @slot Слот контента -->
          <slot />
        </main>
      </div>
      <div class="mc-main__footer-wrapper">
        <!-- @slot Слот футера -->
        <slot name="footer" />
      </div>
    </div>
    <!-- @slot Слот includes -->
    <slot name="includes" />
  </div>
</template>

<script>
import McVirtualTableCol from "../../patterns/McVirtualTable/McVirtualTableCol"
import McVirtualTable from "../../patterns/McVirtualTable/McVirtualTable"
import McHeader from "../../patterns/McHeader/McHeader"
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
import McTopLine from "../../patterns/McTopLine"
import McContainer from "../../patterns/McContainer"
import McBodyFixed from "../McBodyFixed"
import McFooter from "../../patterns/McFooter"
import McFieldSelect from "../../elements/McField/McFieldSelect"
/**
 * Используется для вёрстки основных страниц
 * на проектах
 */
export default {
  name: "McMain",
  components: {
    McVirtualTableCol,
    McVirtualTable,
    McFooter,
    McBodyFixed,
    McContainer,
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
    McHeader,
    McFieldSelect,
  },
  status: "ready",
  release: "0.0.1",
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

  &__main {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
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
    menu: {
      copy: "Скопировать данные ячейки",
      open_in_new_tab: "Открыть в новой вкладке",
      open_in_new_window: "Открыть в новом окне",
    },
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
      <mc-main>
        <mc-header
          slot="header"
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
          @click-add-entity="(val) => eventTest(`itemValue: ${val.value}`)"
          @click-accept="(id) => eventTest(`id: ${id}`)"
          @click-reject="(id) => eventTest(`id: ${id}`)"
        />
        <mc-body-fixed>
          <template slot="top">
            <mc-top-line>
              <template>
                <mc-button>Фильтр</mc-button>
              </template>
              <template slot="right">
                <mc-button variation="blue-link">Добавить контракт</mc-button>
                <mc-title tag="p" color="gray-dark">19 контрактов</mc-title>
              </template>
            </mc-top-line>
          </template>
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
              <mc-virtual-table-col :show-overflow="false" type="checkbox" fixed="left" width="25" />
              <mc-virtual-table-col field="title" title="Канал" width="248" fixed="left">
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
                    <mc-title slot="top"> {{ row.title }} </mc-title>
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
        </mc-body-fixed>
        <mc-title slot="footer" class="mt-s mb-s">Footer content Footer content Footer content</mc-title>
        <mc-title slot="includes">Includes content</mc-title>
      </mc-main>
  </div>
  ```
</docs>
