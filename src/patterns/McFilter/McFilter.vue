<template>
  <div class="mc-filter">
    <McPanel style="padding: 0; width: 100%; max-width: none; max-height: 500px; overflow-y: auto">
      <McTitle class="mc-filter__title">
        <slot name="title">Фильтры</slot>
      </McTitle>
      <div class="mc-filter__content">
        <McTabs>
          <McTab name="Все">
            <div class="mc-filter__tab">
              <McAccordion>
                <template v-for="filter in filters">
                  <McFilterTypeText
                    v-if="filter.type === 'text'"
                    :filter="filter"
                    :value="currentValues[filter.value] || ''"
                    :real-value="value[filter.value] || ''"
                    @input="value => handleInput(filter, value)"
                    style="margin-bottom: 10px"
                  />
                  <McFilterTypeRelation
                    v-else-if="filter.type === 'relation'"
                    :filter="filter"
                    :value="currentValues[filter.value] || {}"
                    :real-value="value[filter.value] || {}"
                    @input="value => handleInput(filter, value)"
                    :t-relation-is="tRelationIs"
                    :t-relation-not-is="tRelationNotIs"
                    :t-relation-exists="tRelationExists"
                    :t-relation-not-exists="tRelationNotExists"
                    style="margin-bottom: 10px"
                  />
                  <McFilterTypeRange
                    v-else-if="filter.type === 'number' || filter.type === 'date'"
                    :filter="filter"
                    :value="currentValues[filter.value] || {}"
                    :real-value="value[filter.value] || {}"
                    @input="value => handleInput(filter, value)"
                    :t-range-more="tRangeMore"
                    :t-range-less="tRangeLess"
                    style="margin-bottom: 10px"
                  />
                </template>
              </McAccordion>
            </div>
          </McTab>
          <McTab name="Пресеты">
            <div class="mc-filter__tab" v-for="(preset, index) in presets" :key="index">
              <div>
                <McFilterPresetValue
                  v-for="(presetValue, presetName) in preset"
                  :key="presetName"
                  :name="presetName"
                  :value="presetValue"
                  :filters="filters"
                  style="margin-bottom: 10px"
                  :t-relation-is="tRelationIs"
                  :t-relation-not-is="tRelationNotIs"
                  :t-relation-exists="tRelationExists"
                  :t-relation-not-exists="tRelationNotExists"
                  :t-range-more="tRangeMore"
                  :t-range-less="tRangeLess"
                />
                <McButton size="s" @click="emitInput(preset)">Применить</McButton>
                <hr />
              </div>
            </div>
          </McTab>
        </McTabs>
      </div>
      <div class="mc-filter__footer">
        <McButton :disabled="!Object.keys(currentValues).length" @click="savePreset">
          <slot name="button-save-preset">Сохранить пресет</slot>
        </McButton>
        <McButton :disabled="!Object.keys(currentValues).length" @click="reset">
          <slot name="reset">Сбросить</slot>
        </McButton>
        <McButton :disabled="!canSubmit" @click="submit">
          <slot name="submit">Применить</slot>
        </McButton>
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

export default {
  name: "McFilter",
  components: {
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
  },
  data() {
    return {
      currentValues: {},
    }
  },
  computed: {
    canSubmit() {
      return !_isEqual(this.value, this.currentValues)
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
  min-width: 500px;

  &__title {
    margin: 15px;
  }

  &__tab {
    padding: 15px;
  }

  &__footer {
    padding: 15px;
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
            style="width: 500px"
            t-relation-is="тест Это"
            t-relation-not-is="тест Это не"
            t-relation-exists="тест Не пустое"
            t-relation-not-exists="тест Пустое"
            t-range-more="тест Больше"
            t-range-less="тест Меньше"
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
