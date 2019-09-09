<template>
  <McChip variation="blue-invert" size="s" :closable="closable" @click="handleChipClick">
    {{ text }}
  </McChip>
</template>
<script>
import McChip from "../../elements/McChip"

export default {
  name: "McFilterChip",
  components: { McChip },
  props: {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [Array, Object, Number, String],
      required: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
    tRelationIs: {
      type: String,
      default: "Это",
    },
    tRelationNotIs: {
      type: String,
      default: "Это не",
    },
    tRelationExists: {
      type: String,
      default: "Не пустое",
    },
    tRelationNotExists: {
      type: String,
      default: "Пустое",
    },
    tRangeMore: {
      type: String,
      default: "Больше",
    },
    tRangeLess: {
      type: String,
      default: "Меньше",
    },
  },
  computed: {
    text() {
      if (this.type === "text") {
        return this.value
      } else if (this.type === "relation") {
        if (this.name === "is") {
          return `${this.tRelationIs}: ${this.value.length}`
        } else if (this.name === "not_is") {
          return `${this.tRelationNotIs}: ${this.value.length}`
        } else if (this.name === "exists") {
          return this.value.indexOf(1) === -1 ? this.tRelationNotExists : this.tRelationExists
        }
      } else if (this.type === "number" || this.type === "date") {
        if (this.name === "more") {
          return `${this.tRangeMore} ${this.value}`
        } else if (this.name === "less") {
          return `${this.tRangeLess} ${this.value}`
        }
      }
      return "Unknown"
    },
  },
  methods: {
    handleChipClick() {
      this.$emit("click")
    },
  },
}
</script>
