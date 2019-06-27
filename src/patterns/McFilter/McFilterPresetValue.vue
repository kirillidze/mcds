<template>
  <div v-if="filter">
    <McTitle>
      {{ filter.name }}:
      <McFilterChip
        v-if="filter.type === 'text'"
        :type="filter.type"
        :name="value"
        :value="'' + value"
        :closable="false"
        style="margin-right: 10px"
      />
      <McFilterChip
        v-else
        v-for="(values, valueName) in value"
        :key="valueName"
        :type="filter.type"
        :name="valueName"
        :value="values"
        :closable="false"
        style="margin-right: 10px"
        :t-relation-is="tRelationIs"
        :t-relation-not-is="tRelationNotIs"
        :t-relation-exists="tRelationExists"
        :t-relation-not-exists="tRelationNotExists"
        :t-range-more="tRangeMore"
        :t-range-less="tRangeLess"
      />
    </McTitle>
  </div>
</template>

<script>
import McTitle from "../../elements/McTitle"
import McFilterChip from "./McFilterChip"
export default {
  name: "McFilterPresetValue",
  components: { McFilterChip, McTitle },
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
