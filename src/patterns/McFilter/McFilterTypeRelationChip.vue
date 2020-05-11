<template>
  <McChip v-if="option" variation="blue-invert" size="s" :closable="true" @click="handleChipClick">
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
      return this.options.find(v => {
        switch (v.value.constructor) {
          case String:
            return String(v.value) === String(this.value)
          case Number:
            return Number(v.value) === Number(this.value)
          case Object:
          case Array:
            return JSON.stringify(v.value) === JSON.stringify(this.value)
          default:
            return v.value === this.value
        }
      })
    },
  },
  methods: {
    handleChipClick() {
      this.$emit("click")
    },
  },
}
</script>
