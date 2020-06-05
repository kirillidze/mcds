<template>
  <mc-filter-slider
    class="mc-filter-type-text"
    ref="collapse"
    :open="open"
    @open="handleOpen"
    @clickToBack="resetValue"
  >
    <mc-filter-row slot="activator">
      {{ filter.name }}
      <mc-filter-dot
        slot="chip"
        v-if="value != null && value !== ''"
        @click="e => resetFilter(null, e)"
      />
    </mc-filter-row>
    <template slot="head">
      <mc-button variation="black-link">
        <mc-svg-icon slot="icon-prepend" name="arrow_upward" size="xs" />
        <mc-title :level="4" size="l">{{ filter.name }}</mc-title>
      </mc-button>
    </template>
    <div class="mc-filter-type-text__body" slot="body">
      <mc-field-text
        :name="filter.name"
        :value="value"
        @input="handleInput"
        @keypress.enter="handleOpen(!open)"
      />
    </div>
    <template slot="footer">
      <mc-button full-width variation="light-green" @click="handleOpen(!open)" :disabled="canSave">
        {{ tSaveButton }}
      </mc-button>
    </template>
  </mc-filter-slider>
</template>

<script>
import McCollapse from "../../patterns/McCollapse"
import McFieldText from "../../elements/McField/McFieldText"
import McChip from "../../elements/McChip"
import McButton from "../../elements/McButton"
import McFilterRow from "./McFilterRow"
import McSvgIcon from "../../elements/McSvgIcon"
import McFilterDot from "./McFilterDot"
import McFilterSlider from "./McFilterSlider"
import McTitle from "../../elements/McTitle"

export default {
  name: "McFilterTypeText",
  status: "ready",
  release: "1.0.0",
  components: {
    McSvgIcon,
    McFilterRow,
    McButton,
    McChip,
    McFieldText,
    McCollapse,
    McFilterDot,
    McFilterSlider,
    McTitle,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    realValue: {
      type: String,
      required: true,
    },
    filter: {
      type: Object,
      required: true,
    },
    tSaveButton: {
      type: String,
    },
  },
  data() {
    return {
      temporaryValue: null,
      open: false,
    }
  },
  computed: {
    canSave() {
      let stringify = JSON.stringify
      return stringify(this.temporaryValue) === stringify(this.value)
    },
  },
  methods: {
    handleOpen(value) {
      this.open = value
      /**
       * Событие открытия
       * @property {Boolean}
       */
      this.$emit("open", value)
    },
    handleInput(value, e) {
      this.emitInput(value === null || value === "" ? null : value)

      if (e) {
        e.stopPropagation()
      }
    },
    emitInput(value) {
      /**
       * Событие инпута
       * @property {String, Null}
       */
      this.$emit("input", value)
    },
    submit() {
      this.$emit("submit")
    },

    setTemporaryValue() {
      this.temporaryValue = this.value
    },

    resetFilter(value, e) {
      this.handleInput(value, e)
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

<style lang="scss"></style>

<docs>
  ```jsx
  import * as filterMocks from '../../mocks/filterMocks'
  let {value, filters, presets, lang} = filterMocks
  const handleClick = e => alert(e.type)
  <div style="position: relative; height: 300px; width: 300px; margin: 50px;">
    <template v-for="(filter, _key) in filters">
      <mc-filter-type-text
        v-if="filter.type === 'text'"
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
