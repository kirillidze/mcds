<template>
  <McGridRow
    align="middle"
    :gutter-x="6"
    :gutter-y="6"
    v-if="filter"
    class="mc-filter-preset-value"
  >
    <McGridCol class="mc-filter-preset-value__title">
      <McTitle>{{ filter.name }}:</McTitle>
    </McGridCol>
    <McGridCol class="mc-filter-preset-value__chips">
      <McGridRow :gutter-x="6" :gutter-y="6">
        <McGridCol v-if="filter.type === 'text'">
          <McFilterChip :type="filter.type" :name="value" :value="'' + value" :closable="false" />
        </McGridCol>
        <McGridCol v-else>
          <McGridRow :gutter-x="6" :gutter-y="6">
            <McGridCol v-for="(values, valueName) in value" :key="valueName">
              <McFilterChip
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
            </McGridCol>
          </McGridRow>
        </McGridCol>
      </McGridRow>
    </McGridCol>
  </McGridRow>
</template>

<script>
import McTitle from "../../elements/McTitle"
import McFilterChip from "./McFilterChip"
import McGridCol from "../McGrid/McGridCol"
import McGridRow from "../McGrid/McGridRow"
export default {
  name: "McFilterPresetValue",
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
