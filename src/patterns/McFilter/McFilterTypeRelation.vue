<template>
  <McCollapse @open="handleOpen" ref="collapse">
    <McFilterRow slot="activator">
      {{ filter.name }}
      <!--<McSvgIcon v-if="isAjax" name="search" />-->
      <McChip
        slot="chip"
        v-if="chipCount"
        variation="gray-dark-invert"
        size="s"
        :closable="true"
        @click="e => emitInput({}, e)"
      >
        {{ chipCount }}
      </McChip>
    </McFilterRow>
    <div class="mc-filter-type-relation__body" slot="body">
      <div class="mc-filter-type-relation__row">
        <McGridRow :gutter-x="6" :gutter-y="6">
          <McGridCol v-for="selectType in selectTypes" :key="selectType">
            <McButton
              v-bind="buttonBind"
              :variation="selectType === type ? 'light-green-invert' : 'blue'"
              @click.prevent="handleClick(selectType)"
            >
              {{ selectType === "is" ? tRelationIs : tRelationNotIs }}
            </McButton>
          </McGridCol>
          <McGridCol v-for="v in [1, 0]" :key="v">
            <McButton
              v-bind="buttonBind"
              :variation="(value.exists || []).indexOf(v) === -1 ? 'blue' : 'light-green-invert'"
              @click.prevent="handleClick('exists', v)"
            >
              {{ v === 0 ? tRelationExists : tRelationNotExists }}
            </McButton>
          </McGridCol>
        </McGridRow>
      </div>
      <div class="mc-filter-type-relation__row">
        <McFieldSelect
          v-if="selectTypes.indexOf(type) !== -1"
          :options="computedOptions"
          @input="handleInput"
          :allow-empty="true"
          :internal-search="!isAjax"
          @search-change="handleSearchChange"
        />
      </div>
      <div class="mc-filter-type-relation__row">
        <McGridRow :gutter-x="6" :gutter-y="6">
          <McGridCol
            v-for="(chips, type) in value || {}"
            v-if="selectTypes.indexOf(type) !== -1"
            :key="type"
          >
            <McFilterTypeRelationChip
              v-for="chip in chips"
              :key="type + '-' + filter.value + chip"
              :type="type"
              :value="chip"
              :options="options"
              :t-relation-is="tRelationIs"
              :t-relation-not-is="tRelationNotIs"
              @click="handleRelationChipClick(type, chip)"
            />
          </McGridCol>
        </McGridRow>
      </div>
    </div>
  </McCollapse>
</template>

<script>
import _uniq from "lodash/uniq"
import _uniqBy from "lodash/uniqBy"

import McFieldSelect from "../../elements/McField/McFieldSelect"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McButton from "../../elements/McButton"
import McCollapse from "../../patterns/McCollapse"
import McChip from "../../elements/McChip"
import McFilterTypeRelationChip from "./McFilterTypeRelationChip"
import McSvgIcon from "../../elements/McSvgIcon"
import McFilterRow from "./McFilterRow"

export default {
  name: "McFilterTypeRelation",
  components: {
    McFilterRow,
    McSvgIcon,
    McFilterTypeRelationChip,
    McChip,
    McButton,
    McGridCol,
    McGridRow,
    McFieldSelect,
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
    tRelationIs: {
      type: String,
      required: true,
    },
    tRelationNotIs: {
      type: String,
      required: true,
    },
    tRelationExists: {
      type: String,
      required: true,
    },
    tRelationNotExists: {
      type: String,
      required: true,
    },
  },
  data() {
    const selectTypes = ["is", "not_is"]
    return {
      selectTypes,
      type: selectTypes[0],
      ajaxShowOptions: [],
      ajaxOptions: [],
    }
  },
  computed: {
    buttonBind() {
      return {
        size: "s",
        radius: "l",
        fullWidth: true,
      }
    },
    isAjax() {
      return typeof this.filter.ajax === "function" && typeof this.filter.ajaxShow === "function"
    },
    options() {
      const result = this.isAjax ? this.ajaxOptions : this.filter.values || []
      return _uniqBy([...this.ajaxShowOptions, ...result], "value")
    },
    chosenOptions() {
      let result = []
      this.selectTypes.forEach(type => {
        result = [...result, ...(this.value[type] || [])]
      })
      return result
    },
    computedOptions() {
      const except = []
      return this.options.filter(v => this.chosenOptions.indexOf(v.value) === -1)
    },
    currentValue() {
      return this.value[this.type] || []
    },
    chipCount() {
      return Object.keys(this.value).reduce((acc, cur) => acc + this.value[cur].length, 0)
    },
  },
  methods: {
    handleOpen() {
      this.$emit("open", this)
      this.loadAjaxOptions()
    },
    handleInput(value) {
      this.setValue(this.type, [...this.currentValue, value])
    },
    handleClick(type, value) {
      const currentValue = { ...this.value }
      let currentTypeValue = currentValue[type] || []
      if (this.selectTypes.indexOf(type) !== -1) {
        this.type = type
      } else {
        const index = currentTypeValue.indexOf(value)
        if (index !== -1) {
          currentTypeValue = []
        } else {
          currentTypeValue = [value]
        }
        this.setValue(type, currentTypeValue)
      }
    },
    setValue(type, value) {
      const currentValue = { ...this.value }
      if (value.length) {
        currentValue[type] = _uniq(value)
      } else {
        delete currentValue[type]
      }
      this.emitInput(currentValue)
    },
    emitInput(value, e) {
      this.$emit("input", value)

      if (e) {
        e.stopPropagation()
      }
    },
    handleSearchChange(value) {
      if (!this.isAjax) return
      this.filter.ajax(value).then(result => {
        this.ajaxOptions = result
      })
    },
    async loadAjaxOptions() {
      if (!this.isAjax) return
      this.ajaxShowOptions = await Promise.all(
        this.currentValue.map(value => this.filter.ajaxShow(value))
      )
    },
    handleRelationChipClick(type, value) {
      const currentValue = [...this.value[type]]
      const index = currentValue.indexOf(value)
      if (index !== -1) {
        currentValue.splice(index, 1)
      }
      this.setValue(type, currentValue)
    },
  },
}
</script>

<style lang="scss">
.mc-filter-type-relation {
  &__row {
    &:not(:last-child) {
      margin-bottom: $space-xs;
    }
  }
}
</style>
