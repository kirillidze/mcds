<template>
  <div class="mc-date-separated" :class="classes">
    <div class="mc-date-separated__header">
      <!-- @slot Слот пользовательского заголовка -->
      <slot name="header">
        <mc-title :ellipsis="false" v-if="title" :level="4">{{ title }}</mc-title>
      </slot>
    </div>
    <div class="mc-date-separated__grid">
      <div class="mc-date-separated__cell">
        <mc-field-select
          v-model="_valueDay"
          :placeholder="placeholder.day"
          :options="days"
          :disabled="disabled"
          :open-direction="openDirection"
        />
      </div>
      <div class="mc-date-separated__cell">
        <mc-field-select
          v-model="_valueMonth"
          :placeholder="placeholder.month"
          :options="months"
          :disabled="disabled"
          :open-direction="openDirection"
        />
      </div>
      <div class="mc-date-separated__cell">
        <mc-field-select
          v-model="_valueYear"
          :placeholder="placeholder.year"
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

import McFieldSelect from "../elements/McField/McFieldSelect"
import McTitle from "../elements/McTitle"
/**
 *  Предпочтительно использовать
 *  mc-field-text с типами date или calendar
 *
 */
export default {
  name: "McDateSeparated",
  status: "deprecated",
  release: "1.0.0",
  components: { McFieldSelect, McTitle },
  data() {
    return {
      month: null,
      year: null,
    }
  },
  props: {
    /**
     *  Заголовок
     *
     */
    title: {
      type: String,
      default: null,
    },
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
      type: Object,
      default: null,
    },
    lang: {
      type: String,
      default: "ru",
    },
  },
  computed: {
    errorText() {
      if (this.errors === null || !this.errors.length) return null
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
        if (!this.value) return
        return this._value.format("D")
      },
      set(val) {
        if (val === "-") {
          return this.emitInput(null)
        }
        this.handleChange(this._value.clone().date(val))
      },
    },
    _valueMonth: {
      get() {
        if (!this.value) return
        this.month = this._value.month() + 1
        return this._value.format("MM")
      },
      set(val) {
        if (val === "-") {
          return this.emitInput(null)
        }
        this.month = val
        this.handleChange(this._value.clone().month(val - 1))
      },
    },
    _valueYear: {
      get() {
        if (!this.value) return
        this.year = this._value.year()
        return this._value.format("YYYY")
      },
      set(val) {
        if (val === "-") {
          return this.emitInput(null)
        }
        this.year = val
        this.handleChange(this._value.clone().year(val))
      },
    },
    days() {
      let result = [
        {
          name: "-",
          value: "-",
        },
      ]
      let currentYear = this.year
      let currentMonthNumber = this.month ? this.months[this.month].value : this.months[1].value
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
      let result = [
        {
          name: "-",
          value: "-",
        },
      ]
      const months = this.$moment
        .months()
        .map((item, i) => ({ name: _capitalize(item), value: i + 1 }))
      return [...result, ...months]
    },
    years() {
      let result = [
        {
          name: "-",
          value: "-",
        },
      ]
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
  created() {
    this.$moment.locale(this.lang)
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
      this.emitInput(value)
    },
    emitInput(value) {
      /**
       * Событие инпута
       * @property {string}
       */
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss">
.mc-date-separated {
  $block-name: &;

  .mc-field-select {
    .multiselect__select {
      width: 30px;
    }
    .multiselect__tags {
      padding-right: 30px;
    }
  }

  &__header {
    @include reset-text-indents();
    font-family: $font-heading;
    display: block;
    margin-bottom: $space-xs;

    &:empty {
      display: none;
    }
  }

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
    let test = `2011-07-11T00:00:00+03:00`
    let placeholder = {
        day: 'день',
        month: 'месяц',
        year: 'год',
    }
    <div>
        <mc-date-separated v-model="test" :placeholder="placeholder" />
    </div>
    ```
</docs>
