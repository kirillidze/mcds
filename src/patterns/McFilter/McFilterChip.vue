<template>
  <McChip variation="gray-darkest-invert" size="s" :closable="closable" @click="handleChipClick">
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
  },
  computed: {
    text() {
      if (this.type === "relation") {
        if (this.name === "is") {
          return `Это: ${this.value.length}`
        } else if (this.name === "not_is") {
          return `Это не: ${this.value.length}`
        } else if (this.name === "exists") {
          return this.value.indexOf(1) === -1 ? "Пустое" : "Не пустое"
        }
      } else if (this.type === "number" || this.type === "date") {
        if (this.name === "more") {
          return `Больше ${this.value}`
        } else if (this.name === "less") {
          return `Меньше ${this.value}`
        }
      }
      return "Неизвестно"
    },
  },
  methods: {
    handleChipClick() {
      this.$emit("click")
    },
  },
}
</script>
