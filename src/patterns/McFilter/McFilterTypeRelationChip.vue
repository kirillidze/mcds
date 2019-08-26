<template>
  <McChip
    v-if="option"
    variation="gray-dark-invert"
    size="s"
    :closable="true"
    @click="handleChipClick"
  >
    {{ type === "is" ? tRelationIs : tRelationNotIs }} {{ option.name }}
  </McChip>
</template>
<script>
import McChip from "../../elements/McChip"
export default {
  name: "McFilterTypeRelationChip",
  components: { McChip },
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    options: {
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
  },
  computed: {
    option() {
      return this.options.find(v => v.value === this.value)
    },
  },
  methods: {
    handleChipClick() {
      this.$emit("click")
    },
  },
}
</script>
