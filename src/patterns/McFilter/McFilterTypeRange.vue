<template>
  <mc-filter-slider ref="collapse" :open="open" @open="handleOpen" @clickToBack="resetValue">
    <mc-filter-row slot="activator">
      {{ filter.name }}
      <mc-filter-dot slot="chip" v-if="chipCount" @click="e => resetFilter(null, e)" />
    </mc-filter-row>
    <template slot="head">
      <mc-button variation="black-link">
        <mc-svg-icon slot="icon-prepend" name="arrow_upward" size="xs" />
        <mc-title :level="4" size="l">{{ filter.name }}</mc-title>
      </mc-button>
    </template>
    <div class="mc-filter-type-range__body" slot="body">
      <div class="mc-filter-type-range__row">
        <mc-grid-row :gutter-x="6" :gutter-y="6">
          <mc-grid-col :span="6">
            <mc-date-picker
              v-if="filter.type === 'date'"
              name="more"
              type="date"
              clearable
              editable
              :placeholder="tRangeMore"
              :popup-style="datepickerLeftStyle"
              :append-to-body="false"
              v-model="value.more"
              @input="value => handleInput('more', value)"
              @keypress.enter="handleOpen(!open)"
            />
            <mc-field-text
              v-else
              :value="value.more || ''"
              type="text"
              :placeholder="tRangeMore"
              name="more"
              @input="value => handleInput('more', value)"
              @keypress.enter="handleOpen(!open)"
              autocomplete="off"
            >
              <mc-button
                slot="append"
                variation="blue-link"
                size="s-compact"
                @click.prevent="value => handleInput('more', null)"
                v-if="value.more"
              >
                <mc-svg-icon slot="icon-append" name="cancel" />
              </mc-button>
            </mc-field-text>
          </mc-grid-col>
          <mc-grid-col :span="6">
            <mc-date-picker
              v-if="filter.type === 'date'"
              name="less"
              type="date"
              clearable
              editable
              :placeholder="tRangeLess"
              :popup-style="datepickerRightStyle"
              :append-to-body="false"
              v-model="value.less"
              @input="value => handleInput('less', value)"
              @keypress.enter="handleOpen(!open)"
            />
            <mc-field-text
              v-else
              :value="value.less || ''"
              type="text"
              :placeholder="tRangeLess"
              name="less"
              @input="value => handleInput('less', value)"
              @keypress.enter="handleOpen(!open)"
              autocomplete="off"
            >
              <mc-button
                slot="append"
                variation="blue-link"
                size="s-compact"
                @click.prevent="value => handleInput('less', null)"
                v-if="value.less"
              >
                <mc-svg-icon slot="icon-append" name="cancel" />
              </mc-button>
            </mc-field-text>
          </mc-grid-col>
        </mc-grid-row>
      </div>
      <div class="mc-filter-type-range__row mc-filter-type-range__row--slider">
        <mc-range-slider
          v-if="canRange"
          :min="filter.min"
          :max="filter.max"
          :step="filter.step || 1"
          v-model="rangeValue"
        />
      </div>
    </div>
    <template slot="footer">
      <mc-button full-width variation="light-green" :disabled="canSave" @click="handleOpen(!open)">
        {{ tSaveButton }}
      </mc-button>
    </template>
  </mc-filter-slider>
</template>

<script>
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McCollapse from "../../patterns/McCollapse"
import McFieldText from "../../elements/McField/McFieldText"
import McDatePicker from "../../elements/McDatePicker"
import McRangeSlider from "../../elements/McRangeSlider"
import McChip from "../../elements/McChip"
import McButton from "../../elements/McButton"
import McFilterRow from "./McFilterRow"
import McSvgIcon from "../../elements/McSvgIcon"
import McFilterDot from "./McFilterDot"
import McTitle from "../../elements/McTitle"
import McFilterSlider from "./McFilterSlider"

export default {
  name: "McFilterTypeRange",
  status: "ready",
  release: "1.0.0",
  components: {
    McSvgIcon,
    McDatePicker,
    McFilterRow,
    McButton,
    McChip,
    McRangeSlider,
    McFieldText,
    McGridCol,
    McGridRow,
    McCollapse,
    McFilterDot,
    McFilterSlider,
    McTitle,
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
      temporaryValue: {},
      open: false,
    }
  },
  computed: {
    chipCount() {
      let count = 0
      if ("more" in this.value && this.value.more !== null) count++
      if ("less" in this.value && this.value.less !== null) count++
      return count
    },
    canRange() {
      return this.filter.min != null && this.filter.max != null && this.filter.type === "number"
    },
    rangeValue: {
      get() {
        if (!this.canRange) return []
        return [
          this.value.more == null ? this.filter.min : this.value.more,
          this.value.less == null ? this.filter.max : this.value.less,
        ]
      },
      set(value) {
        if (!this.canRange) return
        const newVal = { ...this.value }
        newVal["more"] = value[0] === this.filter.min ? null : value[0]
        newVal["less"] = value[1] === this.filter.max ? null : value[1]
        this.emitInput(newVal)
      },
    },
    canSave() {
      let stringify = JSON.stringify
      return stringify(this.temporaryValue) === stringify(this.value)
    },
    datepickerRightStyle() {
      return { right: 0, left: "unset" }
    },
    datepickerLeftStyle() {
      return { left: 0 }
    },
  },
  methods: {
    handleOpen(value) {
      this.open = value
      this.$emit("open", value)
    },
    handleInput(type, value) {
      const currentValue = { ...this.value }
      currentValue[type] = this.filter.type === "date" ? value : value === null ? null : +value
      this.emitInput(currentValue)
    },
    clearValue(val) {
      if (val == null) return {}
      const newVal = { ...val }
      Object.keys(newVal).forEach(type => {
        const value = newVal[type]
        if (value !== null && value !== "") {
          newVal[type] = this.filter.type === "date" ? value : +value
        } else {
          delete newVal[type]
        }
      })
      return newVal
    },
    emitInput(value, e) {
      this.$emit("input", this.clearValue(value))

      if (e) {
        e.stopPropagation()
      }
    },
    submit() {
      this.$emit("submit")
    },

    setTemporaryValue() {
      this.temporaryValue = { ...this.value }
    },
    resetFilter(value, e) {
      this.emitInput(value, e)
      this.$emit("separate-filters")
    },
    /**
     * Set temporary value to current value if user not push to save button
     * return Void
     * */
    resetValue() {
      this.emitInput(this.temporaryValue)
      this.handleOpen(false)
    },
  },
  watch: {
    /**
     * Set temporary value when user open filter type details
     * params Boolean value
     * return Void
     * */
    open(value) {
      !value || this.setTemporaryValue()
    },
  },
}
</script>

<style lang="scss">
.mc-filter-type-range {
  &__row {
    &:not(:last-child) {
      margin-bottom: $space-xs;
    }

    &--slider {
      padding-left: $space-xs;
      padding-right: $space-xs;
    }
  }
}
</style>

<docs>
  ```jsx
  import * as filterMocks from '../../mocks/filterMocks'
  let {value, filters, presets, lang} = filterMocks
  const handleClick = e => alert(e.type)
  <div style="position: relative; height: 300px; width: 300px; margin: 50px;">
    <template v-for="(filter, _key) in filters">
      <mc-filter-type-range
        v-if="filter.type === 'number' || filter.type === 'date'"
        :key="`filled_${_key}`"
        :filter="filter"
        :value="filter.value || {}"
        :real-value="filter.value || {}"
        :t-range-more="lang.more"
        :t-range-less="lang.less"
        :t-save-button="lang.save"
      />
    </template>
  </div>
  ```
</docs>
