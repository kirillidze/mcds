<template>
  <mc-grid-row
    v-if="filter"
    class="mc-filter-preset-value"
    align="middle"
    :gutter-x="6"
    :gutter-y="6"
  >
    <mc-grid-col class="mc-filter-preset-value__title">
      <mc-title>{{ filter.name }}:</mc-title>
    </mc-grid-col>
    <mc-grid-col class="mc-filter-preset-value__chips">
      <mc-grid-row :gutter-x="6" :gutter-y="6">
        <mc-grid-col v-if="filter.type === 'text'">
          <mc-filter-chip :type="filter.type" :name="value" :value="`${value}`" :closable="false" />
        </mc-grid-col>
        <mc-grid-col v-else>
          <mc-grid-row :gutter-x="6" :gutter-y="6">
            <mc-grid-col v-for="(values, valueName) in value" :key="valueName">
              <mc-filter-chip
                :type="filter.type"
                :name="valueName"
                :value="values"
                :closable="false"
                :t-relation-is="tRelationIs"
                :t-relation-not-is="tRelationNotIs"
                :t-relation-exists="tRelationExists"
                :t-relation-not-exists="tRelationNotExists"
                :t-range-more="tRangeMore"
                :t-range-less="tRangeLess"
              />
            </mc-grid-col>
          </mc-grid-row>
        </mc-grid-col>
      </mc-grid-row>
    </mc-grid-col>
  </mc-grid-row>
</template>

<script>
import McTitle from "../../elements/McTitle"
import McFilterChip from "./McFilterChip"
import McGridCol from "../McGrid/McGridCol"
import McGridRow from "../McGrid/McGridRow"
export default {
  name: "McFilterPresetValue",
  status: "ready",
  release: "1.0.0",
  components: { McGridRow, McGridCol, McFilterChip, McTitle },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Object],
      required: true,
    },
    filters: {
      type: Array,
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
    tRangeMore: {
      type: String,
      required: true,
    },
    tRangeLess: {
      type: String,
      required: true,
    },
  },
  computed: {
    filter() {
      return this.filters.find(f => f.value === this.name)
    },
  },
}
</script>

<style lang="scss">
.mc-filter-preset-value {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: $space-xxs;
}
</style>

<docs>
  ```jsx
  import * as filterMocks from '../../mocks/filterMocks'
  let {value, filters, presets, lang} = filterMocks
  const handleClick = e => alert(e.type)

  <div v-for="(preset, index) in presets" :key="index">
    <mc-filter-preset-value
        v-for="(presetValue, presetName) in preset"
        :key="presetName"
        :name="presetName"
        :value="presetValue"
        :filters="filters"
        :t-relation-is="lang.this"
        :t-relation-not-is="lang.is_not"
        :t-relation-exists="lang.not_empty"
        :t-relation-not-exists="lang.empty"
        :t-range-more="lang.more"
        :t-range-less="lang.less"
    />
  </div>
  ```
</docs>
