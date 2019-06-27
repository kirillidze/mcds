<template>
  <McCollapse no-border>
    {{ filter.name }}
    <McChip
      slot="title"
      v-if="chipCount"
      variation="gray-darkest-invert"
      size="s"
      :closable="true"
      @click="emitInput({})"
    >
      {{ chipCount }}
    </McChip>
    <template slot="body">
      <div class="mc-filter-type-relation">
        <McGridRow :gutter-x="10" style="margin-bottom: 10px">
          <McGridCol v-for="selectType in selectTypes" :key="selectType" :span="3">
            <McButton
              v-bind="buttonBind"
              :is-active="selectType === type"
              @click.prevent="handleClick(selectType)"
            >
              {{ selectType === "is" ? tRelationIs : tRelationNotIs }}
            </McButton>
          </McGridCol>
          <McGridCol v-for="v in [1, 0]" :key="v" :span="3" full-width>
            <McButton
              v-bind="buttonBind"
              :variation="
                (value.exists || []).indexOf(v) === -1 ? 'primary' : 'soft-green-dark-invert'
              "
              @click.prevent="handleClick('exists', v)"
            >
              {{ v === 0 ? tRelationNotIs : tRelationNotExists }}
            </McButton>
          </McGridCol>
        </McGridRow>
        <McFieldSelect
          v-if="selectTypes.indexOf(type) !== -1"
          :options="computedOptions"
          @input="handleInput"
          :allow-empty="true"
          :internal-search="!isAjax"
          @search-change="handleSearchChange"
        />
        <div>
          <template v-for="(chips, type) in value || {}" v-if="selectTypes.indexOf(type) !== -1">
            <McFilterTypeRelationChip
              v-for="chip in chips"
              :key="chip"
              :type="type"
              :value="chip"
              :options="computedOptions"
              :t-relation-is="tRelationIs"
              :t-relation-not-is="tRelationNotIs"
              style="margin-top: 10px; margin-right: 10px"
              @click="handleRelationChipClick(type, chip)"
            />
          </template>
        </div>
      </div>
    </template>
  </McCollapse>
</template>

<script>
import _uniqBy from "lodash/uniqBy"

import McFieldSelect from "../../elements/McField/McFieldSelect"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McButton from "../../elements/McButton"
import McCollapse from "../../patterns/McCollapse"
import McChip from "../../elements/McChip"
import McFilterTypeRelationChip from "./McFilterRelationChip"

export default {
  name: "McFilterTypeRelation",
  components: {
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
      return typeof this.filter.ajax === "function"
    },
    computedOptions() {
      const result = this.isAjax ? this.ajaxOptions : this.filter.values || []
      return _uniqBy([...this.ajaxShowOptions, ...result], "value")
    },
    currentValue() {
      return this.value[this.type] || []
    },
    chipCount() {
      return Object.keys(this.value).reduce((acc, cur) => acc + this.value[cur].length, 0)
    },
  },
  mounted() {
    this.loadAjaxOptions()
  },
  methods: {
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
        currentValue[type] = value
      } else {
        delete currentValue[type]
      }
      this.emitInput(currentValue)
    },
    emitInput(value) {
      this.$emit("input", value)
    },
    handleSearchChange(value) {
      if (!this.isAjax) return
      this.filter.ajax(value).then(result => {
        this.ajaxOptions = result
      })
    },
    loadAjaxOptions() {
      if (!this.isAjax) return
      if (!this.currentValue.length) return
      this.currentValue.forEach(value => {
        this.filter.ajaxShow(value).then(result => {
          this.ajaxShowOptions.push(result)
        })
      })
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
