<template>
  <mc-filter-slider
    ref="collapse"
    class="mc-filter-type-relation"
    :open="open"
    @open="handleOpen"
    @clickToBack="resetValue"
  >
    <mc-filter-row slot="activator">
      {{ filter.name }}
      <!--<McSvgIcon v-if="isAjax" name="search" />-->
      <mc-filter-dot slot="chip" v-if="chipCount" @click="e => resetFilter(e)" />
    </mc-filter-row>
    <template slot="head">
      <mc-button variation="black-link">
        <mc-svg-icon slot="icon-prepend" name="arrow_upward" size="xs" />
        <mc-title :level="4" size="l">{{ filter.name }}</mc-title>
      </mc-button>
    </template>
    <div class="mc-filter-type-relation__body" slot="body">
      <div class="mc-filter-type-relation__row">
        <mc-grid-row :gutter-x="6" :gutter-y="6">
          <mc-grid-col v-for="selectType in selectTypes" :key="selectType">
            <mc-button
              v-bind="buttonBind"
              :variation="selectType === type ? 'blue' : 'white'"
              @click.prevent="handleClick(selectType)"
            >
              {{ selectType === "is" ? tRelationIs : tRelationNotIs }}
            </mc-button>
          </mc-grid-col>
          <mc-grid-col v-for="v in [1, 0]" :key="v">
            <mc-button
              v-bind="buttonBind"
              :variation="(value.exists || []).indexOf(v) === -1 ? 'white' : 'blue'"
              @click.prevent="handleClick('exists', v)"
            >
              {{ v === 0 ? tRelationExists : tRelationNotExists }}
            </mc-button>
          </mc-grid-col>
        </mc-grid-row>
      </div>
      <div class="mc-filter-type-relation__row">
        <mc-field-select
          v-if="selectTypes.indexOf(type) !== -1 || type === 'exists'"
          :options="computedOptions"
          @input="handleInput"
          :allow-empty="true"
          :internal-search="!isAjax"
          @search-change="handleSearchChange"
          :disabled="value.hasOwnProperty('exists')"
        />
      </div>
      <div class="mc-filter-type-relation__row">
        <mc-grid-row :gutter-x="6" :gutter-y="6" v-if="!value.exists">
          <mc-grid-col
            v-for="(chips, type) in value || {}"
            v-if="selectTypes.indexOf(type) !== -1"
            :key="type"
          >
            <mc-grid-row :gutter-x="8" :gutter-y="8">
              <mc-grid-col v-for="chip in chips" :key="type + '-' + filter.value + chip">
                <mc-filter-type-relation-chip
                  :type="type"
                  :value="chip"
                  :options="options"
                  :t-relation-is="tRelationIs"
                  :t-relation-not-is="tRelationNotIs"
                  @click="handleRelationChipClick(type, chip)"
                />
              </mc-grid-col>
            </mc-grid-row>
          </mc-grid-col>
        </mc-grid-row>
      </div>
    </div>
    <template slot="footer">
      <mc-button
        full-width
        variation="light-green"
        @click="handleOpen(!open)"
        :disabled="canSave"
        >{{ tSaveButton }}</mc-button
      >
    </template>
  </mc-filter-slider>
</template>

<script>
import _uniq from "lodash/uniq"
import _uniqBy from "lodash/uniqBy"

import McFieldSelect from "../../elements/McField/McFieldSelect"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McButton from "../../elements/McButton"
import McCollapse from "../../patterns/McCollapse"
import McChip from "../../elements/McChip"
import McFilterTypeRelationChip from "./McFilterTypeRelationChip"
import McSvgIcon from "../../elements/McSvgIcon"
import McFilterRow from "./McFilterRow"
import McFilterDot from "./McFilterDot"
import McFilterSlider from "./McFilterSlider"
import McTitle from "../../elements/McTitle"

export default {
  name: "McFilterTypeRelation",
  components: {
    McFilterRow,
    McSvgIcon,
    McFilterTypeRelationChip,
    McChip,
    McButton,
    McGridCol,
    McGridRow,
    McFieldSelect,
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
    tRelationIs: {
      type: String,
      required: true,
    },
    tRelationNotIs: {
      type: String,
      required: true,
    },
    tRelationExists: {
      type: String,
      required: true,
    },
    tRelationNotExists: {
      type: String,
      required: true,
    },
    tSaveButton: {
      type: String,
    },
  },
  data() {
    const selectTypes = ["is", "not_is"]
    return {
      selectTypes,
      type: selectTypes[0],
      ajaxShowOptions: [],
      ajaxOptions: [],
      temporaryValue: {},
      open: false,
    }
  },
  computed: {
    buttonBind() {
      return {
        size: "s",
        radius: "l",
        fullWidth: true,
      }
    },
    isAjax() {
      return typeof this.filter.ajax === "function" && typeof this.filter.ajaxShow === "function"
    },
    options() {
      const result = this.isAjax ? this.ajaxOptions : this.filter.values || []
      return _uniqBy([...this.ajaxShowOptions, ...result], "value")
    },
    chosenOptions() {
      let result = []
      this.selectTypes.forEach(type => {
        result = [...result, ...(this.value[type] || [])]
      })
      return result
    },
    computedOptions() {
      const except = []
      return this.options.filter(v => this.chosenOptions.indexOf(v.value) === -1)
    },
    currentValue() {
      return this.value[this.type] || []
    },
    chipCount() {
      return Object.keys(this.value).reduce((acc, cur) => acc + this.value[cur].length, 0)
    },
    canSave() {
      let stringify = JSON.stringify
      return stringify(this.temporaryValue) === stringify(this.value)
    },
  },
  methods: {
    handleOpen(value) {
      this.open = value
      this.$emit("open", value)
      this.loadAjaxOptions()
    },
    handleInput(value) {
      this.setValue(this.type, [...this.currentValue, value])
    },
    handleClick(type, value) {
      const currentValue = { ...this.value }
      let currentTypeValue = currentValue[type] || []
      if (this.selectTypes.indexOf(type) !== -1) {
        this.type = type
        delete this.value.exists
        this.setValue(type, currentTypeValue)
      } else {
        const index = currentTypeValue.indexOf(value)
        if (index === -1) {
          currentTypeValue = [value]
          this.type = "exists"
        }
        this.setValue(type, currentTypeValue)
      }
    },
    handleDotClick(e) {
      this.type = "is"
      this.emitInput({}, e)
    },
    setValue(type, value) {
      const currentValue = { ...this.value }
      if (value.length) {
        currentValue[type] = _uniq(value)
      } else {
        delete currentValue[type]
      }
      this.emitInput(currentValue)
    },
    emitInput(value, e) {
      this.$emit("input", value)

      if (e) {
        e.stopPropagation()
      }
    },
    handleSearchChange(value) {
      if (!this.isAjax) return
      this.filter.ajax(value).then(result => {
        this.ajaxOptions = result
      })
    },
    async loadAjaxOptions() {
      if (!this.isAjax) return
      this.ajaxShowOptions = await Promise.all(
        this.currentValue.map(value => this.filter.ajaxShow(value))
      )
    },
    handleRelationChipClick(type, value) {
      const currentValue = [...this.value[type]]
      const index = currentValue.indexOf(value)
      if (index !== -1) {
        currentValue.splice(index, 1)
      }
      this.setValue(type, currentValue)
    },

    setTemporaryValue() {
      this.temporaryValue = { ...this.value }
    },
    resetFilter(e) {
      this.handleDotClick(e)
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
.mc-filter-type-relation {
  $block-name: &;
  &__row {
    &:not(:last-child) {
      margin-bottom: $space-xs;
    }
  }
}
</style>
