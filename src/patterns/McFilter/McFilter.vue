<template>
  <div class="mc-filter">
    <McPanel class="mc-filter__panel">
      <div class="mc-filter__header">
        <McTitle :level="4" size="l" class="mc-filter__title">
          <slot name="title">Фильтры</slot>
        </McTitle>
      </div>
      <div class="mc-filter__content">
        <McTabs class="mc-filter__tabs">
          <McTab :name="tabAll">
            <McAccordion>
              <template v-for="(filter, _key) in filters">
                <McFilterTypeText
                  v-if="filter.type === 'text'"
                  :key="_key"
                  :filter="filter"
                  :value="currentValues[filter.value] || ''"
                  :real-value="value[filter.value] || ''"
                  @input="value => handleInput(filter, value)"
                  @submit="submit"
                />
                <McFilterTypeRelation
                  v-else-if="filter.type === 'relation'"
                  :key="_key"
                  :filter="filter"
                  :value="currentValues[filter.value] || {}"
                  :real-value="value[filter.value] || {}"
                  @input="value => handleInput(filter, value)"
                  @submit="submit"
                  :t-relation-is="tRelationIs"
                  :t-relation-not-is="tRelationNotIs"
                  :t-relation-exists="tRelationExists"
                  :t-relation-not-exists="tRelationNotExists"
                />
                <McFilterTypeRange
                  v-else-if="filter.type === 'number' || filter.type === 'date'"
                  :key="_key"
                  :filter="filter"
                  :value="currentValues[filter.value] || {}"
                  :real-value="value[filter.value] || {}"
                  @input="value => handleInput(filter, value)"
                  @submit="submit"
                  :t-range-more="tRangeMore"
                  :t-range-less="tRangeLess"
                />
              </template>
            </McAccordion>
          </McTab>
          <McTab :name="tabPresets">
            <div class="mc-filter__preset-items">
              <div class="mc-filter__preset-item" v-for="(preset, index) in presets" :key="index">
                <div class="mc-filter__preset-value">
                  <McFilterPresetValue
                    v-for="(presetValue, presetName) in preset"
                    :key="presetName"
                    :name="presetName"
                    :value="presetValue"
                    :filters="filters"
                    :t-relation-is="tRelationIs"
                    :t-relation-not-is="tRelationNotIs"
                    :t-relation-exists="tRelationExists"
                    :t-relation-not-exists="tRelationNotExists"
                    :t-range-more="tRangeMore"
                    :t-range-less="tRangeLess"
                  />
                </div>
                <div class="mc-filter__preset-btn">
                  <McButton size="s" @click="emitInput(preset)">Применить</McButton>
                </div>
              </div>
            </div>
          </McTab>
        </McTabs>
      </div>
      <div class="mc-filter__footer">
        <McGridRow :gutter-x="6" :gutter-y="6">
          <McGridCol>
            <McTooltip size="s" placement="top" content="Сбросить">
              <McButton
                :disabled="!Object.keys(currentValues).length"
                @click="reset"
                variation="danger-invert"
                size="m-compact"
              >
                <McSvgIcon slot="icon-append" name="delete" />
              </McButton>
            </McTooltip>
          </McGridCol>
          <McGridCol>
            <McTooltip size="s" placement="top" content="Сохранить пресет">
              <McButton
                :disabled="!Object.keys(currentValues).length"
                @click="savePreset"
                variation="success-invert"
                size="m-compact"
              >
                <McSvgIcon slot="icon-append" name="archive" />
              </McButton>
            </McTooltip>
          </McGridCol>
          <McGridCol stretch-self>
            <McButton full-width :disabled="!canSubmit" @click="submit">
              <slot name="submit">Применить</slot>
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
    presets: {
      type: Array,
      default() {
        return []
      },
    },
    tRelationIs: {
      type: String,
      default: "Это",
    },
    tRelationNotIs: {
      type: String,
      default: "Это не",
    },
    tRelationExists: {
      type: String,
      default: "Не пустое",
    },
    tRelationNotExists: {
      type: String,
      default: "Пустое",
    },
    tRangeMore: {
      type: String,
      default: "Больше",
    },
    tRangeLess: {
      type: String,
      default: "Меньше",
    },
    tabAll: {
      type: String,
      default: "Все",
    },
    tabPresets: {
      type: String,
      default: "Пресеты",
    },
  },
  data() {
    return {
      currentValues: {},
    }
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
      &__body {
        margin-left: $space-xs;
        margin-right: $space-xs;
      }
      &__body-inner {
        border-bottom: 1px solid $color-border;
        padding-top: $space-xs;
        padding-bottom: $space-s;
        margin-bottom: $space-xs;
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
    @include position(relative, 0);
    display: flex;
    flex-direction: column;
    z-index: 100;
    .tabs-component-tabs {
      margin-bottom: 0;
      flex-shrink: 0;
    }
    .tabs-component-panels {
      flex-grow: 1;
      padding-top: $space-xs;
      padding-bottom: $space-xs;
    }
  }

  &__footer {
    border-top: 1px solid $color-border;
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
    ]
    let presets = [
    {q: 'asd', views_count: {more: 10}},
    ]
    const savePreset = values => presets.push(values)
    <McFilter
            v-model="value"
            :filters="filters"
            :presets="presets"
            @preset-save="savePreset"
            t-relation-is="Это"
            t-relation-not-is="Это не"
            t-relation-exists="Не пустое"
            t-relation-not-exists="Пустое"
            t-range-more="Больше"
            t-range-less="Меньше"
    />
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    ```
</docs>
