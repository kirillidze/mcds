<template>
  <div class="mc-filter" v-click-outside="handleClickOutside">
    <McPanel class="mc-filter__panel">
      <div class="mc-filter__header">
        <McTitle :level="4" size="l" class="mc-filter__title">
          <slot name="title">{{ lang.filter }}</slot>
        </McTitle>
      </div>
      <div class="mc-filter__content">
        <McTabs class="mc-filter__tabs" ref="tabs">
          <McTab :name="lang.all">
            <McAccordion ref="accordion">
              <template v-for="(filter, _key) in filters">
                <McFilterTypeText
                  v-if="filter.type === 'text'"
                  :key="_key"
                  :filter="filter"
                  :value="currentValues[filter.value] || ''"
                  :real-value="value[filter.value] || ''"
                  @input="value => handleInput(filter, value)"
                  @submit="submit"
                  @open="getOpenElems"
                />
                <McFilterTypeRelation
                  v-else-if="filter.type === 'relation'"
                  :key="_key"
                  :filter="filter"
                  :value="currentValues[filter.value] || {}"
                  :real-value="value[filter.value] || {}"
                  @input="value => handleInput(filter, value)"
                  @submit="submit"
                  :t-relation-is="lang.this"
                  :t-relation-not-is="lang.is_not"
                  :t-relation-exists="lang.not_empty"
                  :t-relation-not-exists="lang.empty"
                  @open="getOpenElems"
                />
                <McFilterTypeRange
                  v-else-if="filter.type === 'number' || filter.type === 'date'"
                  :key="_key"
                  :filter="filter"
                  :value="currentValues[filter.value] || {}"
                  :real-value="value[filter.value] || {}"
                  @input="value => handleInput(filter, value)"
                  @submit="submit"
                  :t-range-more="lang.more"
                  :t-range-less="lang.less"
                  @open="getOpenElems"
                />
              </template>
            </McAccordion>
          </McTab>
          <McTab :name="lang.presets">
            <div class="mc-filter__preset-items">
              <div class="mc-filter__preset-item" v-for="(preset, index) in presets" :key="index">
                <div class="mc-filter__preset-value">
                  <McFilterPresetValue
                    v-for="(presetValue, presetName) in preset"
                    :key="presetName"
                    :name="presetName"
                    :value="presetValue"
                    :filters="filters"
                    :t-relation-is="lang.this"
                    :t-relation-not-is="lang.is_not"
                    :t-relation-exists="lang.not_empty"
                    :t-relation-not-exists="lang.empty"
                    :t-range-more="lang.more"
                    :t-range-less="lang.less"
                  />
                </div>
                <div class="mc-filter__preset-btn">
                  <McButton size="s" @click="emitInput(preset)">{{ lang.apply }}</McButton>
                </div>
              </div>
            </div>
          </McTab>
        </McTabs>
      </div>
      <div class="mc-filter__footer">
        <McGridRow :gutter-x="6" :gutter-y="6">
          <McGridCol>
            <McTooltip size="s" placement="top" :content="lang.reset">
              <McButton
                :disabled="!Object.keys(currentValues).length"
                @click="reset"
                variation="red-invert"
                size="m-compact"
              >
                <McSvgIcon slot="icon-append" name="delete" />
              </McButton>
            </McTooltip>
          </McGridCol>
          <McGridCol>
            <McTooltip size="s" placement="top" :content="lang.save_preset">
              <McButton
                :disabled="!Object.keys(currentValues).length"
                @click="savePreset"
                variation="light-green-invert"
                size="m-compact"
              >
                <McSvgIcon slot="icon-append" name="archive" />
              </McButton>
            </McTooltip>
          </McGridCol>
          <McGridCol stretch-self>
            <McButton full-width :disabled="!canSubmit" @click="submit">
              <slot name="submit">{{ lang.apply }}</slot>
              <template v-if="filterDeepCount">{{ filterDeepCount }}</template>
            </McButton>
          </McGridCol>
        </McGridRow>
      </div>
    </McPanel>
  </div>
</template>

<script>
import _isEqual from "lodash/isEqual"
import _cloneDeep from "lodash/cloneDeep"
import VueClickOutside from "vue-click-outside"
import McPanel from "../McPanel"
import McTitle from "../../elements/McTitle"
import McTabs from "../McTabs/McTabs"
import McTab from "../McTabs/McTab"
import McFilterTypeRelation from "./McFilterTypeRelation"
import McFilterTypeText from "./McFilterTypeText"
import McFilterTypeRange from "./McFilterTypeRange"
import McButton from "../../elements/McButton"
import McFilterPresetValue from "./McFilterPresetValue"
import McAccordion from "../McAccordion"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McTooltip from "../../elements/McTooltip"
import McSvgIcon from "../../elements/McSvgIcon"
import McDropdown from "../McDropdown"

export default {
  name: "McFilter",
  components: {
    McSvgIcon,
    McTooltip,
    McGridCol,
    McGridRow,
    McAccordion,
    McFilterPresetValue,
    McButton,
    McFilterTypeText,
    McFilterTypeRange,
    McFilterTypeRelation,
    McTab,
    McTabs,
    McTitle,
    McPanel,
    McDropdown,
  },
  directives: {
    "click-outside": VueClickOutside,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    filters: {
      type: Array,
      required: true,
    },
    lang: {
      //type:,
      required: false,
    },
    presets: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentValues: {},
      panel: null,
      header: null,
      body: null,
    }
  },
  mounted() {
    this.panel = this.$refs.tabs.$el.querySelector(".tabs-component-panels")
    window.addEventListener("scroll", this.onScroll)
    window.addEventListener("resize", this.onScroll)
    this.panel.addEventListener("scroll", this.onScroll)
  },
  computed: {
    canSubmit() {
      return !_isEqual(this.value, this.currentValues) && this.filterDeepCount
    },

    filterDeepCount() {
      const data = Object.values(_cloneDeep(this.currentValues))
      let accum = 0

      data.forEach(item => {
        if (typeof item == "string") {
          accum++
        } else if (typeof item == "object") {
          accum += Object.keys(item).length
        } else {
          Object.keys(item).forEach(i => {
            accum += item[i].length
          })
        }
      })

      return accum
    },
    accordionIsClosed() {
      return this.$refs.accordion ? this.$refs.accordion.isClosed : true
    },
  },
  watch: {
    value: {
      handler(val) {
        this.currentValues = { ...val }
      },
      immediate: true,
    },
  },
  methods: {
    handleInput(filter, value) {
      this.currentValues = {
        ...this.currentValues,
        [filter.value]: _cloneDeep(value),
      }

      this.currentValues = { ...this.clearEmpty(this.currentValues) }
    },
    reset() {
      this.emitInput({})
    },
    submit() {
      this.emitInput(this.currentValues)
    },
    savePreset() {
      this.$emit("preset-save", this.clearEmpty(this.currentValues))
    },
    clearEmpty(value) {
      const values = _cloneDeep(value)
      Object.keys(values).forEach(key => {
        if (values[key] == null || !Object.keys(values[key]).length) {
          delete values[key]
        }
      })
      return values
    },
    emitInput(value) {
      this.$emit("input", this.clearEmpty(value))
    },
    getOpenElems(elem) {
      this.header = elem.$refs.collapse.$el.querySelector(".mc-collapse__header")
      this.body = elem.$refs.collapse.$children.find(
        el => el.$options._componentTag === "slide-up-down"
      ).$el

      this.changePos()
    },

    changePos() {
      this.panelBox = this.panel.getBoundingClientRect()
      let headerBox = this.header.getBoundingClientRect()

      this.body.style.left = headerBox.left + "px"
      this.body.style.width = headerBox.width + "px"

      if (headerBox.bottom >= this.panelBox.top && headerBox.bottom <= this.panelBox.bottom) {
        this.body.style.top = headerBox.bottom + "px"
      } else if (headerBox.bottom < this.panelBox.top) {
        this.body.style.top = this.panelBox.top + "px"
      } else if (headerBox.bottom > this.panelBox.bottom) {
        this.body.style.top = this.panelBox.bottom + "px"
      }
    },
    onScroll() {
      if (!this.accordionIsClosed) {
        this.changePos()
      }
    },
    handleClickOutside() {
      if (!this.accordionIsClosed) {
        this.$refs.accordion.handleToggle(true)
      }
    },
  },
}
</script>

<style lang="scss">
.mc-filter {
  width: $panel-s + 34;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  @include custom-scroll();

  @media #{$media-query-s} {
    width: $panel-l;
    min-height: $panel-xl;
  }

  &__panel {
    max-width: none;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  &__header {
    padding: $space-xs;
    height: 38px;
    flex-shrink: 0;
  }

  &__content {
    position: relative;
    flex-grow: 1;

    .mc-collapse {
      position: relative;
      &__body {
        position: fixed;
        padding: 0 $space-xs;
        z-index: 100;
        background-color: $color-white;
        box-shadow: $shadow-m;
        border-radius: $radius-m;
      }
      &__body-inner {
        padding-top: $space-xs;
        padding-bottom: $space-xs;
      }
      & .mc-collapse__header {
        width: 100%;
        & .mc-tappable.mc-filter-row {
          width: 100%;
        }
      }
    }
  }

  &__tabs {
    @include position(absolute, 0);
    display: flex;
    flex-direction: column;
    .tabs-component-tabs {
      margin-bottom: 0;
      flex-shrink: 0;
    }
    .tabs-component-panels {
      flex-grow: 1;
      overflow-y: auto;
      padding-top: $space-xs;
      padding-bottom: $space-xs;
    }
    .tabs-component-panel {
      overflow: hidden;
    }
  }

  &__footer {
    border-top: 1px solid $color-outline-gray;
    padding-top: $space-xs;
    flex-shrink: 0;
  }

  &__preset-items {
    padding: $space-xs;
  }

  &__preset-item {
    &:not(:last-child) {
      padding-bottom: $space-m;
    }
  }

  &__preset-btn {
    margin-top: $space-xs;
  }
}

.mc-collapse {
  &:last-child {
    .mc-collapse {
      &__body-inner {
        border-bottom-color: transparent;
        margin-bottom: 0;
      }
    }
  }
}
</style>

<docs>
    ```jsx
    let value = {
    views_count: {
    more: 10,
    },
    users: {
    is: [1],
    },
    q: 'asd',
    }
    const filters = [
    {
    name: 'Поиск',
    value: 'q',
    type: 'text'
    },
    {
    name: 'Страна',
    value: 'countries',
    type: 'relation',
    values: [{ name: 'Беларусь', value: 1 }, { name: 'Россия', value: 2 }, { name: 'Украина', value: 3 }]
    },
    {
    name: 'Пользователь',
    value: 'users',
    type: 'relation',
    values: [],
    ajax: val => {
    return fetch('https://reqres.in/api/users').then(result => {
    return result.json()
    }).then(result => {
    return result.data.map(r => ({
    name: r.first_name + ' ' + r.last_name,
    value: r.id
    }))
    })
    },
    ajaxShow: val => {
    return fetch('https://reqres.in/api/users/' + val).then(result => {
    return result.json()
    }).then(result => {
    const r = result.data
    return {
    name: r.first_name + ' ' + r.last_name,
    value: r.id
    }
    })
    },
    },
    {
    name: 'Просмотры',
    value: 'views_count',
    type: 'number',
    min: 0,
    max: 10000,
    step: 10,
    },
    {
    name: 'Дата создания',
    value: 'created_at',
    type: 'date',
    },
    {
    name: 'Страна',
    value: 'countries',
    type: 'relation',
    values: [{ name: 'Беларусь', value: 1 }, { name: 'Россия', value: 2 }, { name: 'Украина', value: 3 },{ name: 'Украина', value: 4 }, { name: 'Украина', value: 5 }, { name: 'Украина', value: 6 }]
    },
    {
    name: 'Страна',
    value: 'countries',
    type: 'relation',
    values: [{ name: 'Беларусь', value: 1 }, { name: 'Россия', value: 2 }, { name: 'Украина', value: 3 },{ name: 'Украина', value: 4 }, { name: 'Украина', value: 5 }, { name: 'Украина', value: 6 }]
    },
    {
    name: 'Страна',
    value: 'countries',
    type: 'relation',
    values: [{ name: 'Беларусь', value: 1 }, { name: 'Россия', value: 2 }, { name: 'Украина', value: 3 },{ name: 'Украина', value: 4 }, { name: 'Украина', value: 5 }, { name: 'Украина', value: 6 }]
    },
    {
    name: 'Страна',
    value: 'countries',
    type: 'relation',
    values: [{ name: 'Беларусь', value: 1 }, { name: 'Россия', value: 2 }, { name: 'Украина', value: 3 },{ name: 'Украина', value: 4 }, { name: 'Украина', value: 5 }, { name: 'Украина', value: 6 }]
    },
    ]
    let presets = [
    {q: 'asd', views_count: {more: 10}},
    ]
    const savePreset = values => presets.push(values)
    let dropIsOpen = false

    let lang = {
        placeholder: "Поиск",
        from: "от",
        to: "до",
        this: "Это",
        is_not: "Это не",
        not_empty: "Не пустое",
        empty: "Пустое",
        more: "Больше",
        less: "Меньше",
        later: "Позже",
        above: "Раньше",
        apply: "Применить",
        reset: "Сбросить",
        save_preset: "Сохранить пресет",
        filter: "Фильтр",
        all: "Все",
        presets: "Пресеты"
    }


    <div>

    <McDropdown v-model="dropIsOpen">
        <McButton slot="activator" >
            Владилен
            <McSvgIcon slot="icon-append" name="arrow_drop_down" size="xs"/>
        </McButton>
        <McFilter
                v-model="value"
                :filters="filters"
                :presets="presets"
                @preset-save="savePreset"
                :lang="lang"
        />
    </McDropdown>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <McFilter
            v-model="value"
            :filters="filters"
            :presets="presets"
            @preset-save="savePreset"
            :lang="lang"
    />
    </div>
    ```
</docs>
