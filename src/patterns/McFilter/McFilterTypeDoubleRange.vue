<template>
  <mc-filter-slider
    ref="collapse"
    :open="open"
    @open="handleOpen"
    @clickToBack="resetValue"
    class="mc-filter-type-double-range"
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
        :options="filter.values"
        :t-search-empty="tSearchEmpty"
        :disabled="filteredArr.length === 2"
        @original-input="handleChange"
        class="mb-s"
      />
      <div v-for="(item, index) in filteredArr" :key="item.name">
        <mc-grid-row align="middle" justify="between" class="mb-s" :gutter-x="8">
          <mc-grid-col>
            <mc-title size="s">
              {{ item.name }}
            </mc-title>
          </mc-grid-col>
          <mc-grid-col>
            <mc-svg-icon
              size="xxs"
              name="cancel"
              fill="blue"
              class="mc-filter-type-double-range__close"
              @click.native="handleClose(item.value)"
            />
          </mc-grid-col>
        </mc-grid-row>
        <mc-grid-row :gutter-x="8" class="mb-s">
          <mc-grid-col :span="6">
            <mc-field-text
              :placeholder="tRangeMore"
              name="more"
              :value="item.more || null"
              @input="value => handleInput('more', index, value)"
            />
          </mc-grid-col>
          <mc-grid-col :span="6">
            <mc-field-text
              :placeholder="tRangeLess"
              name="less"
              :value="item.less || null"
              @input="value => handleInput('less', index, value)"
            />
          </mc-grid-col>
        </mc-grid-row>
        <mc-range-slider
          :min="filter.min"
          :max="filter.max"
          :value="[item.more || filter.min, item.less || filter.max]"
          @input="value => handleInput('range', index, value)"
        />
        <mc-separator indent-top="s" indent-bottom="s" v-if="index !== filteredArr.length - 1" />
      </div>
    </div>
    <template slot="footer">
      <mc-button
        full-width
        variation="light-green"
        @click="handleSave"
        :disabled="!filteredArr.length"
      >
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
import McPanel from "../McPanel"
import McFieldSelect from "../../elements/McField/McFieldSelect"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McTitle from "../../elements/McTitle"
import McRangeSlider from "../../elements/McRangeSlider"
import McSeparator from "../../elements/McSeparator"
export default {
  name: "McFilterTypeDoubleRange",
  components: {
    McSeparator,
    McRangeSlider,
    McTitle,
    McGridCol,
    McGridRow,
    McFieldSelect,
    McPanel,
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
    }
  },
  computed: {
    hasFilteredValues() {
      return Object.keys(this.value).length
    },
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.setTemporaryValue()
        this.filteredArr = []
        this.searchValue = ""
        const hasValue = this.value && this.value.length
        if (hasValue) {
          this.filteredArr = this.value
          this.searchValue = this.value[this.value.length - 1].value
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
      const hasValue = this.filteredArr.some(item => item.value === val.value)
      if (hasValue) {
        return
      }
      this.filteredArr.push(val)
      this.emitInput(this.filteredArr)
    },
    handleClose(value) {
      this.filteredArr = this.filteredArr.filter(item => item.value !== value)
      this.searchValue = ""
      this.emitInput(this.filteredArr)
    },
    handleInput(type, index, value) {
      const currentValue = { ...this.value[index] }
      if (type === "range") {
        currentValue["more"] = value[0]
        currentValue["less"] = value[1]
      } else {
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
.mc-filter-type-double-range {
  &__panel {
    max-width: 100%;
  }
  &__close {
    display: block;
    cursor: pointer;
  }
}
</style>
