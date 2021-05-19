<template>
  <div class="mc-filter">
    <mc-panel class="mc-filter__panel">
      <div class="mc-filter__header">
        <mc-title :level="4" size="l" class="mc-filter__title">
          <!-- @slot Слот заголовка -->
          <slot name="title">{{ lang.filter }}</slot>
        </mc-title>
      </div>
      <div class="mc-filter__content">
        <mc-tabs class="mc-filter__tabs" ref="tabs" :accentColor="accentColor">
          <mc-tab :name="lang.all">
            <template v-for="(filter, _key) in filledFilter">
              <mc-filter-type-text
                v-if="filter.type === 'text'"
                :key="`filled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || ''"
                :real-value="value[filter.value] || ''"
                :t-save-button="lang.save"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
              <mc-filter-type-relation
                v-else-if="filter.type === 'relation'"
                :key="`filled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || {}"
                :real-value="value[filter.value] || {}"
                :t-relation-is="lang.this"
                :t-relation-not-is="lang.is_not"
                :t-relation-exists="lang.not_empty"
                :t-relation-not-exists="lang.empty"
                :t-save-button="lang.save"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
              <mc-filter-type-range
                v-else-if="filter.type === 'number' || filter.type === 'date'"
                :key="`filled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || {}"
                :real-value="value[filter.value] || {}"
                :t-range-more="lang.from"
                :t-range-less="lang.to"
                :t-save-button="lang.save"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
              <mc-filter-type-selection
                v-else-if="filter.type === 'selection'"
                :key="`filled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || {}"
                :real-value="value[filter.value] || {}"
                :t-range-more="lang.more"
                :t-range-less="lang.less"
                :t-save-button="lang.save"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
              <mc-filter-type-multiple-range
                v-else-if="filter.type === 'multiple-range'"
                :key="`filled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || []"
                :real-value="value[filter.value] || []"
                :t-range-more="lang.more"
                :t-range-less="lang.less"
                :t-save-button="lang.save"
                :t-search-empty="lang.search_empty"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
            </template>
            <mc-separator v-if="computedFiltersLength" indent-top="xs" indent-bottom="xs" />
            <template v-for="(filter, _key) in unfilledFilter">
              <mc-filter-type-text
                v-if="filter.type === 'text'"
                :key="`unfilled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || ''"
                :real-value="value[filter.value] || ''"
                :t-save-button="lang.save"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
              <mc-filter-type-relation
                v-else-if="filter.type === 'relation'"
                :key="`unfilled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || {}"
                :real-value="value[filter.value] || {}"
                :t-relation-is="lang.this"
                :t-relation-not-is="lang.is_not"
                :t-relation-exists="lang.not_empty"
                :t-relation-not-exists="lang.empty"
                :t-save-button="lang.save"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
              <mc-filter-type-range
                v-else-if="filter.type === 'number' || filter.type === 'date'"
                :key="`unfilled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || {}"
                :real-value="value[filter.value] || {}"
                :t-range-more="lang.from"
                :t-range-less="lang.to"
                :t-save-button="lang.save"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
              <mc-filter-type-selection
                v-else-if="filter.type === 'selection'"
                :key="`unfilled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || {}"
                :real-value="value[filter.value] || {}"
                :t-range-more="lang.more"
                :t-range-less="lang.less"
                :t-save-button="lang.save"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
              <mc-filter-type-multiple-range
                v-else-if="filter.type === 'multiple-range'"
                :key="`unfilled_${_key}`"
                :filter="filter"
                :value="currentValues[filter.value] || []"
                :real-value="value[filter.value] || []"
                :t-range-more="lang.more"
                :t-range-less="lang.less"
                :t-save-button="lang.save"
                :t-search-empty="lang.search_empty"
                @input="value => handleInput(filter, value)"
                @submit="submit"
                @open="setFilterOpen"
                @separate-filters="separateFilters"
              />
            </template>
          </mc-tab>
          <mc-tab :name="lang.presets">
            <div class="mc-filter__preset-items">
              <div class="mc-filter__preset-item" v-for="(preset, index) in presets" :key="index">
                <div class="mc-filter__preset-value">
                  <mc-filter-preset-value
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
                  <mc-button size="s" @click="applyPreset(preset)">{{ lang.apply }}</mc-button>
                </div>
              </div>
            </div>
          </mc-tab>
        </mc-tabs>
      </div>
      <div class="mc-filter__footer">
        <mc-grid-row :gutter-x="6" :gutter-y="6">
          <mc-grid-col>
            <mc-tooltip size="s" placement="top" :content="lang.reset">
              <mc-button
                :disabled="!Object.keys(currentValues).length && !Object.keys(value).length"
                @click="reset"
                variation="red-invert"
                size="m-compact"
              >
                <mc-svg-icon slot="icon-append" name="backspace" />
              </mc-button>
            </mc-tooltip>
          </mc-grid-col>
          <mc-grid-col>
            <mc-tooltip size="s" placement="top" :content="lang.save_preset">
              <mc-button
                :disabled="!Object.keys(currentValues).length"
                @click="savePreset"
                variation="light-green-invert"
                size="m-compact"
              >
                <mc-svg-icon slot="icon-append" name="save" />
              </mc-button>
            </mc-tooltip>
          </mc-grid-col>
          <mc-grid-col stretch-self>
            <mc-button full-width :disabled="!canSubmit" @click="submit">
              <slot name="submit">{{ lang.apply }}</slot>
            </mc-button>
          </mc-grid-col>
        </mc-grid-row>
      </div>
    </mc-panel>
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
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McTooltip from "../../elements/McTooltip"
import McSvgIcon from "../../elements/McSvgIcon"
import McDropdown from "../McDropdown"
import McSeparator from "../../elements/McSeparator"
import McFilterTypeSelection from "./McFilterTypeSelection"
import McFilterTypeMultipleRange from "./McFilterTypeMultipleRange"

export default {
  name: "McFilter",
  status: "ready",
  release: "1.0.0",
  components: {
    McFilterTypeMultipleRange,
    McFilterTypeSelection,
    McSvgIcon,
    McTooltip,
    McGridCol,
    McGridRow,
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
    McSeparator,
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
      required: false,
    },
    accentColor: {
      type: String,
      default: "blue",
    },
    presets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentValues: {},
      panel: null,
      header: null,
      body: null,
      filterDetailOpen: false,
      filledFilter: [],
      unfilledFilter: [],
    }
  },
  created() {
    this.separateFilters()
  },
  mounted() {
    this.panel = this.$refs.tabs.$el.querySelector(".tabs-component-panels")
  },
  computed: {
    canSubmit() {
      return !_isEqual(this.value, this.currentValues)
    },
    computedFiltersLength() {
      return this.filledFilter.length && this.unfilledFilter.length
    },
  },
  watch: {
    value: {
      handler(val) {
        this.currentValues = { ...val }
        this.separateFilters()
      },
      immediate: true,
    },
    filterDetailOpen(value) {
      value || this.separateFilters()
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
      /**
       * Событие сохранения пресета
       * @property {Object}
       */
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
      /**
       * Событие инпута
       * @property {Array}
       */
      this.$emit("input", this.clearEmpty(value))
    },
    setFilterOpen(value) {
      this.filterDetailOpen = value
    },
    separateFilters() {
      this.filledFilter = []
      this.unfilledFilter = []

      let currentValues = Object.keys(this.currentValues)
      this.filters.filter(filter => {
        currentValues.includes(filter.value)
          ? this.filledFilter.push(filter)
          : this.unfilledFilter.push(filter)
      })
    },
    applyPreset(preset) {
      this.emitInput(preset)

      this.$nextTick(() => {
        this.separateFilters()
      })
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
    overflow: hidden;
  }
  &__header {
    padding: $space-xs;
    height: 38px;
    flex-shrink: 0;
  }

  &__content {
    position: relative;
    flex-grow: 1;
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
    import * as filterMocks from '../../mocks/filterMocks'
    let {value, filters, presets, lang} = filterMocks

    const savePreset = values => presets.push(values)
    let dropIsOpen = false

    <div>
        <mc-dropdown v-model="dropIsOpen" :rotate-icon="false" class="mb-l">
            <mc-button slot="activator" :variation="Object.keys(value).length ? 'blue-invert' : 'black-flat'">
                Фильтр
                <mc-svg-icon slot="icon-append" name="filter_list"/>
            </mc-button>
            <mc-filter
                v-model="value"
                :filters="filters"
                :presets="presets"
                @preset-save="savePreset"
                :lang="lang"
            />
        </mc-dropdown>

        <mc-filter
            v-model="value"
            :filters="filters"
            :presets="presets"
            @preset-save="savePreset"
            :lang="lang"
        />
    </div>
    ```
</docs>
