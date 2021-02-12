<template>
  <mc-filter-slider
    ref="collapse"
    :open="open"
    @open="handleOpen"
    @clickToBack="resetValue"
    class="mc-filter-type-multiple-range"
  >
    <mc-filter-row slot="activator">
      {{ filter.name }}
      <mc-filter-dot slot="chip" v-if="hasFilteredValues" @click="e => resetFilter({}, e)" />
    </mc-filter-row>
    <template slot="head">
      <mc-button variation="black-link">
        <mc-svg-icon slot="icon-prepend" name="arrow_upward" size="xs" />
        <mc-title :level="4" size="l">{{ filter.name }}</mc-title>
      </mc-button>
    </template>
    <div slot="body">
      <mc-field-select
        v-model="searchValue"
        :options="selectedArr"
        :t-search-empty="tSearchEmpty"
        :disabled="filteredArr.length === 2"
        @original-input="handleChange"
        class="mb-s"
      />
      <div v-for="(item, index) in filteredArr" :key="item.name">
        <mc-grid-row align="middle" justify="between" class="mb-s" :gutter-x="8">
          <mc-grid-col>
            <mc-title size="s">
              {{ getName(item.value) }}
            </mc-title>
          </mc-grid-col>
          <mc-grid-col>
            <mc-svg-icon
              size="xxs"
              name="cancel"
              fill="blue"
              class="mc-filter-type-multiple-range__close"
              @click.native="handleClose(item)"
            />
          </mc-grid-col>
        </mc-grid-row>
        <mc-grid-row :gutter-x="8" class="mb-s">
          <mc-grid-col :span="6">
            <mc-field-text
              :placeholder="tRangeMore"
              name="more"
              type="number"
              :value="item.from || null"
              @input="value => handleInput('from', index, value)"
            />
          </mc-grid-col>
          <mc-grid-col :span="6">
            <mc-field-text
              :placeholder="tRangeLess"
              name="less"
              type="number"
              :value="item.to || null"
              @input="value => handleInput('to', index, value)"
            />
          </mc-grid-col>
        </mc-grid-row>
        <div class="mc-filter-type-multiple-range__slider">
          <mc-range-slider
            :min="filter.min"
            :max="filter.max"
            :value="[item.from || filter.min, item.to || filter.max]"
            @input="value => handleInput('range', index, value)"
          />
        </div>
        <mc-separator indent-top="s" indent-bottom="s" v-if="index !== filteredArr.length - 1" />
      </div>
    </div>
    <template slot="footer">
      <mc-button full-width variation="light-green" @click="handleSave" :disabled="canSave">
        {{ tSaveButton }}
      </mc-button>
    </template>
  </mc-filter-slider>
</template>

<script>
import McFilterSlider from "./McFilterSlider"
import McFilterRow from "./McFilterRow"
import McFilterDot from "./McFilterDot"
import McButton from "../../elements/McButton"
import McSvgIcon from "../../elements/McSvgIcon"
import McFieldText from "../../elements/McField/McFieldText"
import McFieldSelect from "../../elements/McField/McFieldSelect"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McTitle from "../../elements/McTitle"
import McRangeSlider from "../../elements/McRangeSlider"
import McSeparator from "../../elements/McSeparator"
export default {
  name: "McFilterTypeMultipleRange",
  components: {
    McSeparator,
    McRangeSlider,
    McTitle,
    McGridCol,
    McGridRow,
    McFieldSelect,
    McFieldText,
    McSvgIcon,
    McButton,
    McFilterDot,
    McFilterRow,
    McFilterSlider,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    realValue: {
      type: Array,
      required: true,
    },
    filter: {
      type: Object,
      required: true,
    },
    tRangeMore: {
      type: String,
      required: true,
    },
    tRangeLess: {
      type: String,
      required: true,
    },
    tSaveButton: {
      type: String,
    },
    tSearchEmpty: {
      type: String,
    },
  },
  data() {
    return {
      open: false,
      searchValue: "",
      rangeValues: {},
      filteredArr: [],
      temporaryValue: [],
      selectedArr: [],
    }
  },
  computed: {
    hasFilteredValues() {
      return Object.keys(this.value).length
    },
    canSave() {
      let stringify = JSON.stringify
      const disabled =
        this.filteredArr.filter(item => item.from || item.to).length !== this.filteredArr.length
      return stringify(this.temporaryValue) === stringify(this.value) || disabled
    },
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.setTemporaryValue()
        this.filteredArr = []
        this.searchValue = ""
        this.selectedArr = this.filteredSelectedArr()
        const hasValue = this.value && this.value.length
        if (hasValue) {
          this.filteredArr = [...this.value]
        }
      }
    },
  },
  methods: {
    handleOpen(value) {
      this.open = value
      this.$emit("open", value)
    },
    resetValue() {
      this.emitInput(this.temporaryValue)
      this.handleOpen(false)
    },
    handleSave() {
      this.handleOpen(!this.open)
    },
    handleChange(val) {
      this.selectedArr = this.selectedArr.filter(item => item.value !== val.value)
      this.filteredArr.push({ value: val.value })
      this.emitInput(this.filteredArr)
    },
    handleClose(elem) {
      const [currentClosableItem] = this.filter.values.filter(item => item.value === elem.value)
      this.selectedArr.push(currentClosableItem)
      this.filteredArr = this.filteredArr.filter(item => item.value !== elem.value)
      this.searchValue = ""
      this.emitInput(this.filteredArr)
    },
    handleInput(type, index, value) {
      const currentValue = { ...this.value[index] }
      switch (true) {
        case type === "range":
          currentValue["from"] = value[0]
          currentValue["to"] = value[1]
          break
        case (type === "from" || type === "to") && Number(value) > this.filter.max:
          currentValue[type] = this.value[index][type]
          break
        case !Number(value):
          delete currentValue[type]
          break
        default:
          currentValue[type] = +value
      }
      this.filteredArr[index] = currentValue
      this.emitInput(this.filteredArr)
    },
    setTemporaryValue() {
      this.temporaryValue = [...this.value]
    },
    resetFilter(val, e) {
      this.emitInput(val, e)
      this.$emit("separate-filters")
    },
    getName(val) {
      const [currentFilterItem] = this.filter.values.filter(item => item.value === val)
      return currentFilterItem.name
    },
    filteredSelectedArr() {
      if (this.value && this.value.length) {
        const filteredArrValues = this.value.map(item => {
          return item.value
        })
        return this.filter.values.filter((item, i) => {
          return filteredArrValues.indexOf(this.filter.values[i].value) === -1
        })
      }
      return this.filter.values
    },
    emitInput(value, e) {
      this.$emit("input", value)
      if (e) {
        e.stopPropagation()
      }
    },
  },
}
</script>

<style lang="scss">
.mc-filter-type-multiple-range {
  &__close {
    display: block;
    cursor: pointer;
  }
  &__slider {
    padding-left: $space-xs;
    padding-right: $space-xs;
  }
}
</style>
