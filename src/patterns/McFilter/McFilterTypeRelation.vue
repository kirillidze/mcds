<template>
  <div>
    <McFilterChip
      v-for="(values, name) in realValue"
      :key="name"
      :type="filter.type"
      :name="name"
      :value="values"
      :closable="true"
      @click="setValue(name, [])"
      style="margin-right: 10px"
    />
    <McCollapse no-border>
      <template>
        {{ filter.name }}
      </template>
      <template slot="body">
        <div class="mc-filter-type-relation">
          <McGridRow :gutter-x="10" style="margin-bottom: 10px">
            <McGridCol v-for="selectType in selectTypes" :key="selectType" :span="3">
              <McButton
                v-bind="buttonBind"
                :is-active="selectType === type"
                @click.prevent="handleClick(selectType)"
              >
                {{ selectType === "is" ? "Это" : "Это не" }}
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
                {{ v === 0 ? "Пустое" : "Не пустое" }}
              </McButton>
            </McGridCol>
          </McGridRow>
          <McFieldSelect
            v-if="selectTypes.indexOf(type) !== -1"
            :options="computedOptions"
            :multiple="true"
            :value="currentValue"
            @input="handleInput"
            :allow-empty="true"
            :internal-search="!isAjax"
            @search-change="handleSearchChange"
          />
        </div>
      </template>
    </McCollapse>
  </div>
</template>

<script>
import _uniqBy from "lodash/uniqBy"

import McFieldSelect from "../../elements/McField/McFieldSelect"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McButton from "../../elements/McButton"
import McCollapse from "../../patterns/McCollapse"
import McFilterChip from "./McFilterChip"

export default {
  name: "McFilterTypeRelation",
  components: { McFilterChip, McButton, McGridCol, McGridRow, McFieldSelect, McCollapse },
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
    chips() {
      const result = []
      ;["is", "not_is", "exists"].forEach(type => {
        const typeValues = this.value[type] || []
        if (type === "exists") {
          typeValues.forEach(typeValue => {
            result.push({
              type,
              value: typeValue === 1 ? "Не пустое" : "Пустое",
            })
          })
        } else if (typeValues.length) {
          result.push({
            type,
            value: typeValues.length,
          })
        }
      })
      return result
    },
  },
  mounted() {
    this.loadAjaxOptions()
  },
  methods: {
    handleInput(value) {
      this.setValue(this.type, value)
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
  },
}
</script>
