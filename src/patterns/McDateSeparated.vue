<template>
  <div class="mc-date-separated" :class="classes">
    <div class="mc-date-separated__grid">
      <div class="mc-date-separated__cell">
        <McFieldSelect
          v-model="_valueDay"
          :options="days"
          :disabled="disabled"
          :open-direction="openDirection"
        />
      </div>
      <div class="mc-date-separated__cell">
        <McFieldSelect
          v-model="_valueMonth"
          :options="months"
          :disabled="disabled"
          :open-direction="openDirection"
        />
      </div>
      <div class="mc-date-separated__cell">
        <McFieldSelect
          v-model="_valueYear"
          :options="years"
          :disabled="disabled"
          :open-direction="openDirection"
        />
      </div>
    </div>
    <span v-if="errorText" class="mc-date-separated__help-text">{{ errorText }}</span>
  </div>
</template>

<script>
import _capitalize from "lodash/capitalize"

import McFieldSelect from "../elements/McField/McFieldSelectOld"

export default {
  name: "McDateSeparated",
  status: "deprecated",
  release: "1.0.0",
  components: { McFieldSelect },
  props: {
    fromFormat: {
      type: String,
      default: "YYYY-MM-DD",
    },
    toFormat: {
      type: String,
      default: "YYYY-MM-DD",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    openDirection: {
      type: String,
      default: "bottom",
    },
    value: {
      default: null,
    },
    errors: {
      type: Array,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  computed: {
    errorText() {
      if (this.errors == null || this.errors.length == 0) return null
      return this.errors.join(", ")
    },
    classes() {
      return {
        "mc-field-text--error": this.errorText,
      }
    },
    _value() {
      let value = this.value
      if (typeof value === "string") {
        return this.$moment(value, this.fromFormat)
      } else if (value instanceof this.$moment) {
        return value.clone()
      } else if (value instanceof Date) {
        return this.$moment(value)
      }
      return this.$moment()
    },
    _valueDay: {
      get() {
        return this._value.format("D")
      },
      set(val) {
        this.handleChange(this._value.clone().date(val))
      },
    },
    _valueMonth: {
      get() {
        return this._value.format("MM")
      },
      set(val) {
        this.handleChange(this._value.clone().month(val - 1))
      },
    },
    _valueYear: {
      get() {
        return this._value.format("YYYY")
      },
      set(val) {
        this.handleChange(this._value.clone().year(val))
      },
    },
    days() {
      let result = []
      let currentYear = this.year
      let currentMonthNumber = this.month ? this.month : this.months[0].value
      let days = this.$moment(`${currentYear}-${currentMonthNumber}`, "Y-M").daysInMonth()

      for (let i = 0; i < days; i++) {
        result.push({
          name: i + 1,
          value: i + 1,
        })
      }

      return result
    },
    months() {
      return this.$moment.months().map((item, i) => ({ name: _capitalize(item), value: i + 1 }))
    },
    years() {
      let result = []
      let currentYear = this.$moment().year() + 50

      for (let i = currentYear; i + 100 > currentYear; i--) {
        result.push({
          name: i,
          value: i,
        })
      }

      return result
    },
  },
  methods: {
    handleChange(value) {
      if (this.toFormat === "moment") {
        value = value.clone()
      } else if (this.toFormat === "date") {
        value = value.toDate()
      } else {
        value = value.format(this.toFormat)
      }
      this.$emit("input", value)
    },
    emitInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss">
.mc-date-separated {
  $block-name: &;

  &__grid {
    margin-left: -4px;
    margin-right: -4px;
    display: flex;
    flex-wrap: nowrap;
  }

  &__cell {
    padding-left: 4px;
    padding-right: 4px;
    width: 33.333333%;
  }

  &__help-text {
    @include field-error();

    &:empty {
      display: none;
    }
  }
}
</style>

<docs>
    ```jsx
    let test = {}
    <div>
        <McDateSeparated v-model="test" :placeholder="'test'" open-direction="above"/>
    </div>
    ```
</docs>
