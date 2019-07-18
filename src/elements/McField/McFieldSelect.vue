<template>
  <div class="mc-field-select">
    <multiselect
      :value="_value"
      :options="options"
      label="name"
      track-by="value"
      :searchable="searchable"
      :show-labels="showLabels"
      :multiple="multiple"
      :hide-selected="hideSelected"
      :allow-empty="allowEmpty"
      :open-direction="openDirection"
      :taggable="taggable"
      :tag-placeholder="''"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleChange"
      @tag="handleTag"
      @search-change="handleSearchChange"
      :internal-search="internalSearch"
    >
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.min.css"
export default {
  name: "McFieldSelect",
  components: { Multiselect },
  status: "deprecated",
  release: "1.0.0",
  props: {
    options: {
      type: Array,
      required: true,
    },

    searchable: {
      type: Boolean,
      default: true,
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    hideSelected: {
      type: Boolean,
      default: false,
    },

    allowEmpty: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String,
      default: null,
    },

    backgroundColor: {
      type: String,
      default: null,
    },

    placeholder: {
      type: String,
      default: "",
    },

    openDirection: {
      type: String,
      default: "bottom",
    },

    taggable: {
      type: Boolean,
      default: false,
    },

    showLabels: {
      type: Boolean,
      default: false,
    },

    internalSearch: {
      type: Boolean,
      default: true,
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
  },
  computed: {
    _value() {
      if (this.multiple) {
        if (this.value == null) return []
        let result = []
        for (let value of this.value) {
          let option = this.options.find(o => o.value == value)
          if (option != null) result.push(option)
        }
        return result
      }
      return this.options.find(o => o.value == this.value)
    },

    errorText() {
      if (this.errors == null || this.errors.length == 0) return null
      return this.errors.join(", ")
    },
  },
  methods: {
    handleChange(value) {
      this.$emit("original-input", value)
      if (value != null) {
        if (this.multiple) {
          value = value.map(v => v.value)
        } else {
          value = value.value
        }
      }
      this.emitInput(value)
    },

    handleTag(value) {
      this.$emit("tag", value)
    },

    handleSearchChange(value) {
      this.$emit("search-change", value)
    },

    emitInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss">
$colors: $token-colors;

.mc-field-select {
  $block-name: &;

  font-family: $font-heading;

  .multiselect {
    &__placeholder {
      color: $color-gray-dark;
      font-size: $size-m;
      line-height: $line-height-s;
    }

    &__single {
      @include ellipsis();
    }

    &__select {
      &::before {
        border-color: $color-gray-dark transparent transparent;
      }
    }

    &__tags {
      border: 1px solid $color-gray-lighter;
      border-radius: $radius-m !important;
      padding: 8px 40px 0 $space-s;
    }

    &__content-wrapper {
      top: calc(100% + #{$space-xs});
      border: none;
      border-radius: $radius-l;
      box-shadow: $shadow-l;
    }

    &--active {
    }
  }
}
</style>

<docs>
  ```jsx
  let categories = require('../../mocks/categories').default
  let categoriesModel = []
  <div style="max-width: 400px">
    <McFieldSelect
            :allow-empty="true"
            :multiple="true"
            :hide-selected="true"
            v-model="categoriesModel"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            placeholder="Плейсхолдер"/>
  </div>
  ```
</docs>
