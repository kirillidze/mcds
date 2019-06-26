<template>
  <div>
    <McFilterChip
      v-if="value != null && value !== ''"
      :type="filter.type"
      :name="'' + value"
      :value="value"
      :closable="true"
      @click="handleInput(null)"
      style="margin-right: 10px"
    />
    <McCollapse no-border>
      <template>
        {{ filter.name }}
      </template>
      <template slot="body">
        <div class="mc-filter-type-text">
          <McFieldText :name="filter.name" :value="value" @input="handleInput"></McFieldText>
        </div>
      </template>
    </McCollapse>
  </div>
</template>

<script>
import McCollapse from "../../patterns/McCollapse"
import McFieldText from "../../elements/McField/McFieldText"
import McFilterChip from "./McFilterChip"

export default {
  name: "McFilterTypeText",
  components: { McFilterChip, McFieldText, McCollapse },
  props: {
    value: {
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
