<template>
  <McCollapse @open="handleOpen" class="mc-filter-type-text" ref="collapse">
    <McFilterRow slot="activator">
      {{ filter.name }}
      <McChip
        slot="chip"
        v-if="value != null && value !== ''"
        variation="gray-dark-invert"
        size="s"
        :closable="true"
        @click="e => handleInput(null, e)"
      >
        1
      </McChip>
    </McFilterRow>
    <div class="mc-filter-type-text__body" slot="body">
      <McFieldText :name="filter.name" :value="value" @input="handleInput" @keypress.enter="submit">
      </McFieldText>
    </div>
  </McCollapse>
</template>

<script>
import McCollapse from "../../patterns/McCollapse"
import McFieldText from "../../elements/McField/McFieldText"
import McChip from "../../elements/McChip"
import McButton from "../../elements/McButton"
import McFilterRow from "./McFilterRow"
import McSvgIcon from "../../elements/McSvgIcon"

export default {
  name: "McFilterTypeText",
  components: { McSvgIcon, McFilterRow, McButton, McChip, McFieldText, McCollapse },
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
  },
  methods: {
    handleOpen() {
      this.$emit("open", this)
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
  },
}
</script>

<style lang="scss"></style>
