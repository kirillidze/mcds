<template>
  <mc-chip variation="blue-invert" size="s" :closable="closable" @click="handleChipClick">
    {{ text }}
  </mc-chip>
</template>
<script>
import McChip from "../../elements/McChip"

export default {
  name: "McFilterChip",
  status: "ready",
  release: "1.0.0",
  components: { McChip },
  props: {
    /**
     *  Тип: text, relation, number, date
     *
     */
    type: {
      type: String,
      required: true,
    },
    /**
     *  relation: is, not_is, exist;
     *  number or date: more, less.
     */
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
      switch (this.type) {
        case "text":
          return this.value
        case "relation":
          return this.getRelationValue(this.name)
        case "number":
        case "date":
          return this.getRageValue(this.name)
        default:
          return "Unknown"
      }
    },
  },
  methods: {
    getRelationValue(name) {
      switch (name) {
        case "is":
          return `${this.tRelationIs}: ${this.value.length}`
        case "not_is":
          return `${this.tRelationNotIs}: ${this.value.length}`
        case "exists":
          return this.value.indexOf(1) === -1 ? this.tRelationNotExists : this.tRelationExists
      }
    },
    getRageValue(name) {
      switch (name) {
        case "more":
          return `${this.tRangeMore} ${this.value}`
        case "less":
          return `${this.tRangeLess} ${this.value}`
      }
    },
    handleChipClick() {
      /**
       * Событие по кнопке чипа
       */
      this.$emit("click")
    },
  },
}
</script>

<docs>
  ```jsx
    <div>
      <mc-filter-chip type="text" value="123" />
      <mc-filter-chip type="relation" name="is" :value="[1, 2, 3]" />
      <mc-filter-chip type="number" name="more" value="123" closable />
    </div>
  ```
</docs>
