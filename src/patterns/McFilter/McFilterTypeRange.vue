<template>
  <div>
    <McFilterChip
      v-for="(values, name) in realValue"
      :key="name"
      :type="filter.type"
      :name="name"
      :value="values"
      :closable="true"
      @click="handleInput(name)"
      style="margin-right: 10px"
      :t-range-more="tRangeMore"
      :t-range-less="tRangeLess"
    />
    <McCollapse no-border>
      <template>
        {{ filter.name }}
      </template>
      <template slot="body">
        <div class="mc-filter-type-range">
          <McGridRow :gutter-x="10">
            <McGridCol :span="6">
              <McFieldText
                :value="value.more || ''"
                @input="value => handleInput('more', value)"
                :type="filter.type === 'date' ? 'date' : 'text'"
                :placeholder="tRangeMore"
                name="more"
              />
            </McGridCol>
            <McGridCol :span="6">
              <McFieldText
                :value="value.less || ''"
                @input="value => handleInput('less', value)"
                :type="filter.type === 'date' ? 'date' : 'text'"
                :placeholder="tRangeLess"
                name="less"
              />
            </McGridCol>
          </McGridRow>
        </div>
      </template>
    </McCollapse>
  </div>
</template>

<script>
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McButton from "../../elements/McButton"
import McCollapse from "../../patterns/McCollapse"
import McFieldText from "../../elements/McField/McFieldText"
import McFilterChip from "./McFilterChip"

export default {
  name: "McFilterTypeRange",
  components: { McFilterChip, McFieldText, McButton, McGridCol, McGridRow, McCollapse },
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
  },
  methods: {
    handleInput(type, value) {
      const currentValue = { ...this.value }
      if (value) {
        currentValue[type] = this.filter.type === "date" ? value : +value
      } else {
        delete currentValue[type]
      }
      this.emitInput(currentValue)
    },
    emitInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>
