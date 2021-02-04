<template>
  <mc-filter-slider ref="collapse" :open="open" @open="handleOpen" @clickToBack="resetValue">
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
      <mc-field-select class="mb-s" :options="filter.values" v-model="prettyValue" />
      <mc-grid-row :gutter-x="8" class="mb-xs">
        <mc-grid-col :span="6">
          <mc-field-select :options="computedOptions" v-model="compareValue" />
        </mc-grid-col>
        <mc-grid-col :span="6">
          <mc-field-text v-model="rangeValue" name="range" />
        </mc-grid-col>
      </mc-grid-row>
      <div class="mc-filter-type-selection__slider">
        <mc-range-slider :min="filter.min" :max="filter.max" v-model="computedRangeValue" />
      </div>
    </div>
    <template slot="footer">
      <mc-button full-width variation="light-green" @click="handleSave">
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
import McTitle from "../../elements/McTitle"
import McFieldSelect from "../../elements/McField/McFieldSelect"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McFieldText from "../../elements/McField/McFieldText"
import McRangeSlider from "../../elements/McRangeSlider"

export default {
  name: "McFilterTypeSelection",
  components: {
    McRangeSlider,
    McFieldText,
    McGridCol,
    McGridRow,
    McFieldSelect,
    McTitle,
    McSvgIcon,
    McButton,
    McFilterDot,
    McFilterRow,
    McFilterSlider,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    realValue: {
      type: Object,
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
  },
  data() {
    return {
      open: false,
      prettyValue: null,
      compareValue: null,
      rangeValue: null,
    }
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.setData()
      }
    },
  },
  computed: {
    hasFilteredValues() {
      return Object.keys(this.value).length
    },
    computedOptions() {
      return [
        {
          name: this.tRangeMore,
          value: ">=",
        },
        {
          name: this.tRangeLess,
          value: "<=",
        },
      ]
    },
    computedRangeValue: {
      get() {
        return Number(this.rangeValue)
      },
      set(value) {
        this.rangeValue = value
      },
    },
  },
  methods: {
    handleOpen(value) {
      this.open = value
      this.$emit("open", value)
    },
    handleSave() {
      const data = {
        type: this.prettyValue,
        operator: this.compareValue,
        value: Number(this.rangeValue),
      }
      this.emitInput(data)
      this.handleOpen(!this.open)
    },
    setData() {
      this.prettyValue = this.value.type || this.filter.values[0].value
      this.compareValue = this.value.operator || this.computedOptions[0].value
      this.rangeValue = this.value.value || this.filter.min
    },
    resetFilter(val, e) {
      this.emitInput(val, e)
      this.$emit("separate-filters")
    },
    resetValue() {
      !this.hasFilteredValues && this.emitInput({})
      this.handleOpen(false)
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
.mc-filter-type-selection {
  &__slider {
    padding-left: $space-xs;
    padding-right: $space-xs;
  }
}
</style>
