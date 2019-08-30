<template>
  <McCollapse @open="handleOpen" ref="collapse">
    <McFilterRow slot="activator">
      {{ filter.name }}
      <McChip
        slot="chip"
        v-if="chipCount"
        variation="gray-dark-invert"
        size="s"
        :closable="true"
        @click="e => emitInput(null, e)"
      >
        {{ chipCount }}
      </McChip>
    </McFilterRow>
    <div class="mc-filter-type-range__body" slot="body">
      <div class="mc-filter-type-range__row">
        <McGridRow :gutter-x="6" :gutter-y="6">
          <McGridCol :span="6">
            <McFieldText
              :value="value.more || ''"
              :type="filter.type === 'date' ? 'date' : 'text'"
              :placeholder="tRangeMore"
              name="more"
              @input="value => handleInput('more', value)"
              @keypress.enter="submit"
            >
              <McButton
                slot="append"
                variation="blue-link"
                size="s-compact"
                @click.prevent="value => handleInput('more', '')"
                v-if="value.more"
              >
                <McSvgIcon slot="icon-append" name="cancel" />
              </McButton>
            </McFieldText>
          </McGridCol>
          <McGridCol :span="6">
            <McFieldText
              :value="value.less || ''"
              :type="filter.type === 'date' ? 'date' : 'text'"
              :placeholder="tRangeLess"
              name="less"
              @input="value => handleInput('less', value)"
              @keypress.enter="submit"
            >
              <McButton
                slot="append"
                variation="blue-link"
                size="s-compact"
                @click.prevent="value => handleInput('less', '')"
                v-if="value.less"
              >
                <McSvgIcon slot="icon-append" name="cancel" />
              </McButton>
            </McFieldText>
          </McGridCol>
        </McGridRow>
      </div>
      <div class="mc-filter-type-range__row mc-filter-type-range__row--slider">
        <McRangeSlider
          v-if="canRange"
          :min="filter.min"
          :max="filter.max"
          :step="filter.step || 1"
          v-model="rangeValue"
        />
      </div>
    </div>
  </McCollapse>
</template>

<script>
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McCollapse from "../../patterns/McCollapse"
import McFieldText from "../../elements/McField/McFieldText"
import McRangeSlider from "../../elements/McRangeSlider"
import McChip from "../../elements/McChip"
import McButton from "../../elements/McButton"
import McFilterRow from "./McFilterRow"
import McSvgIcon from "../../elements/McSvgIcon"

export default {
  name: "McFilterTypeRange",
  components: {
    McSvgIcon,
    McFilterRow,
    McButton,
    McChip,
    McRangeSlider,
    McFieldText,
    McGridCol,
    McGridRow,
    McCollapse,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    realValue: {
      type: Object,
      required: true,
    },
    filter: {
      type: Object,
      required: true,
    },
    tRangeMore: {
      type: String,
      required: true,
    },
    tRangeLess: {
      type: String,
      required: true,
    },
  },
  computed: {
    chipCount() {
      let count = 0
      if (this.value.more != null) count++
      if (this.value.less != null) count++
      return count
    },
    canRange() {
      return this.filter.min != null && this.filter.max != null && this.filter.type === "number"
    },
    rangeValue: {
      get() {
        if (!this.canRange) return []
        return [
          this.value.more == null ? this.filter.min : this.value.more,
          this.value.less == null ? this.filter.max : this.value.less,
        ]
      },
      set(value) {
        if (!this.canRange) return
        const newVal = { ...this.value }
        newVal["more"] = value[0] === this.filter.min ? null : value[0]
        newVal["less"] = value[1] === this.filter.max ? null : value[1]
        this.emitInput(newVal)
      },
    },
  },
  methods: {
    handleOpen() {
      this.$emit("open", this)
    },
    handleInput(type, value) {
      const currentValue = value == null ? {} : { ...this.value }
      currentValue[type] = this.filter.type === "date" ? value : value == null ? null : +value
      this.emitInput(currentValue)
    },
    clearValue(val) {
      if (val == null) return {}
      const newVal = { ...val }
      Object.keys(newVal).forEach(type => {
        const value = newVal[type]
        if (value != null && value !== "") {
          newVal[type] = this.filter.type === "date" ? value : +value
        } else {
          delete newVal[type]
        }
      })
      return newVal
    },
    emitInput(value, e) {
      this.$emit("input", this.clearValue(value))

      if (e) {
        e.stopPropagation()
      }
    },
    submit() {
      this.$emit("submit")
    },
  },
}
</script>

<style lang="scss">
.mc-filter-type-range {
  &__row {
    &:not(:last-child) {
      margin-bottom: $space-xs;
    }

    &--slider {
      padding-left: $space-xs;
      padding-right: $space-xs;
    }
  }
}
</style>
