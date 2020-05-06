<template>
  <McFilterSlider
    @open="handleOpen"
    class="mc-filter-type-text"
    ref="collapse"
    :back-title="filter.name"
    :lang="lang"
  >
    <McFilterRow slot="activator">
      {{ filter.name }}
      <McFilterDot
        slot="chip"
        v-if="value != null && value !== ''"
        @click="e => resetFilter(null, e)"
      />
    </McFilterRow>
    <div class="mc-filter-type-text__body" slot="body">
      <McFieldText :name="filter.name" :value="value" @input="handleInput" @keypress.enter="submit">
      </McFieldText>
    </div>
  </McFilterSlider>
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

export default {
  name: "McFilterTypeText",
  components: {
    McSvgIcon,
    McFilterRow,
    McButton,
    McChip,
    McFieldText,
    McCollapse,
    McFilterDot,
    McFilterSlider,
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
    lang: {
      type: Object,
    },
  },
  data() {
    return {
      temporaryValue: null,
      open: false,
    }
  },
  methods: {
    handleOpen(value) {
      this.$emit("open", value)
    },
    handleInput(value, e) {
      this.emitInput(value === null || value === "" ? null : value)

      if (e) {
        e.stopPropagation()
      }
    },
    emitInput(value) {
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
    },

    /**
     * Set open field in filter component for separate filters method
     * */
    setGlobalOpen() {
      this.open = !this.open
      this.handleOpen(this.open)
    },
  },
}
</script>

<style lang="scss"></style>
