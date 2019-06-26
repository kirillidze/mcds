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
              <template v-for="filter in filters">
                <McFilterTypeText
                  v-if="filter.type === 'text'"
                  :filter="filter"
                  :value="currentValues[filter.value] || ''"
                  @input="value => handleInput(filter, value)"
                />
                <McFilterTypeRelation
                  v-else-if="filter.type === 'relation'"
                  :filter="filter"
                  :value="currentValues[filter.value] || {}"
                  @input="value => handleInput(filter, value)"
                />
                <McFilterTypeRange
                  v-else-if="filter.type === 'number' || filter.type === 'date'"
                  :filter="filter"
                  :value="currentValues[filter.value] || {}"
                  @input="value => handleInput(filter, value)"
                />
              </template>
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
                />
                <McButton size="s" @click="applyPreset(preset)">Применить</McButton>
                <hr />
              </div>
            </div>
          </McTab>
        </McTabs>
      </div>
      <div class="mc-filter__footer">
        <McButton :disabled="!Object.keys(currentValues).length" @click="savePreset"
          >Сохранить пресет
        </McButton>
        <McButton :disabled="!Object.keys(currentValues).length" @click="reset">Сбросить</McButton>
        <McButton :disabled="!canSubmit" @click="submit">Применить</McButton>
      </div>
    </McPanel>
  </div>
</template>

<script>
import _isEqual from "lodash/isEqual"
import McPanel from "../McPanel"
import McTitle from "../../elements/McTitle"
import McTabs from "../McTabs/McTabs"
import McTab from "../McTabs/McTab"
import McCollapse from "../McCollapse"
import McFilterTypeRelation from "./McFilterTypeRelation"
import McChip from "../../elements/McChip"
import McFilterTypeText from "./McFilterTypeText"
import McFilterTypeRange from "./McFilterTypeRange"
import McButton from "../../elements/McButton"
import McFilterPresetValue from "./McFilterPresetValue"

export default {
  name: "McFilter",
  components: {
    McFilterPresetValue,
    McButton,
    McChip,
    McFilterTypeText,
    McFilterTypeRange,
    McFilterTypeRelation,
    McCollapse,
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
      const values = {
        ...this.currentValues,
        [filter.value]: value,
      }
      Object.keys(values).forEach(key => {
        if (values[key] == null || !Object.keys(values[key]).length) {
          delete values[key]
        }
      })
      this.currentValues = values
    },
    reset() {
      this.$emit("input", {})
    },
    submit() {
      this.$emit("input", this.currentValues)
    },
    savePreset() {
      this.$emit("preset-save", this.currentValues)
    },
    applyPreset(preset) {
      this.$emit("input", preset)
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
    <McFilter v-model="value" :filters="filters" :presets="presets" @preset-save="savePreset" style="width: 500px"/>
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
