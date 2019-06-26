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
      />
    </McTitle>
  </div>
</template>

<script>
import McButton from "../../elements/McButton"
import McTitle from "../../elements/McTitle"
import McChip from "../../elements/McChip"
import McFilterChip from "./McFilterChip"
export default {
  name: "McFilterPresetValue",
  components: { McFilterChip, McChip, McTitle, McButton },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    filters: {
      type: Array,
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
