<template>
  <McCollapse no-border>
    {{ filter.name }}
    <McChip
      slot="title"
      v-if="value != null && value !== ''"
      variation="gray-darkest-invert"
      size="s"
      :closable="true"
      @click="handleInput(null)"
    >
      1
    </McChip>
    <template slot="body">
      <div class="mc-filter-type-text">
        <McFieldText :name="filter.name" :value="value" @input="handleInput"></McFieldText>
      </div>
    </template>
  </McCollapse>
</template>

<script>
import McCollapse from "../../patterns/McCollapse"
import McFieldText from "../../elements/McField/McFieldText"
import McChip from "../../elements/McChip"

export default {
  name: "McFilterTypeText",
  components: { McChip, McFieldText, McCollapse },
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
    handleInput(value) {
      this.emitInput(value === null || value === "" ? null : value)
    },
    emitInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>
