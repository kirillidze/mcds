<template>
  <McCollapse no-border>
    <template>
      {{ filter.name }}
    </template>
    <template slot="body">
      <McChip
        v-for="(chip, index) in chips"
        :key="index"
        variation="gray-darkest-invert"
        size="s"
        closable
        @click="handleChipClick(chip)"
        style="margin-left: 10px"
      >
        {{ chip.type === "more" ? "От " : "До " }}
        {{ chip.value }}
      </McChip>
      <div class="mc-filter-type-number">
        <McGridRow :gutter-x="10">
          <McGridCol :span="6">
            <McFieldText
              :value="value.more || ''"
              @input="value => handleInput('more', value)"
              placeholder="От"
            />
          </McGridCol>
          <McGridCol :span="6">
            <McFieldText
              :value="value.less || ''"
              @input="value => handleInput('less', value)"
              placeholder="До"
            />
          </McGridCol>
        </McGridRow>
      </div>
    </template>
  </McCollapse>
</template>

<script>
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McButton from "../../elements/McButton"
import McChip from "../../elements/McChip"
import McCollapse from "../../patterns/McCollapse"
import McFieldText from "../../elements/McField/McFieldText"

export default {
  name: "McFilterTypeNumber",
  components: { McFieldText, McButton, McGridCol, McGridRow, McChip, McCollapse },
  props: {
    value: {
      type: Object,
      required: true,
    },
    filter: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chips() {
      const result = []
      if (this.value.more) {
        result.push({
          type: "more",
          value: this.value.more,
        })
      }
      if (this.value.less) {
        result.push({
          type: "less",
          value: this.value.less,
        })
      }
      return result
    },
  },
  methods: {
    handleInput(type, value) {
      const currentValue = { ...this.value }
      if (value) {
        currentValue[type] = +value
      } else {
        delete currentValue[type]
      }
      this.emitInput(currentValue)
    },
    handleChipClick(chip) {
      this.handleInput(chip.type, null)
    },
    emitInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>
