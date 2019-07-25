<template>
  <div class="mc-field-select" :class="classes">
    <div :for="name" class="mc-field-select__header">
      <slot name="header">
        <McTitle :ellipsis="false" v-if="title" :level="4">{{ title }}</McTitle>
      </slot>
    </div>
    <div class="mc-field-select__main">
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
    <div class="mc-field-select__footer">
      <McTitle tag-name="div" :ellipsis="false" color="danger" size="s" v-if="errorText">
        {{ errorText }}
      </McTitle>
      <br v-if="errorText" />
      <slot name="footer">
        <McTitle tag-name="div" :ellipsis="false" size="s" v-if="helpText">{{ helpText }}</McTitle>
      </slot>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.min.css"
import McTitle from "../McTitle"
export default {
  name: "McFieldSelect",
  components: { McTitle, Multiselect },
  status: "deprecated",
  release: "1.0.0",
  props: {
    /**
     *  Заголовок поля:
     *
     */
    title: {
      type: String,
      default: null,
    },

    /**
     *  Вспомогательный текст под инпутом:
     *
     */
    helpText: {
      type: String,
      default: null,
    },

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
    classes() {
      return {
        "mc-field-select--error": this.errorText,
        "mc-field-select--disabled": this.disabled,
      }
    },
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

  @include custom-scroll();
  font-family: $font-heading;

  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-xs;

    &:empty {
      display: none;
    }
  }

  &__footer {
    margin-top: $space-xxxs;

    &:empty {
      display: none;
    }
  }

  .multiselect {
    &__placeholder {
      @include ellipsis();
      color: $color-gray-dark;
      font-size: $size-m;
      line-height: $line-height-s;
      margin-bottom: $space-xs;
      padding-top: $space-xs + 1;
    }

    &__single {
      @include ellipsis();
      padding-left: 0;
      margin-bottom: $space-xs;
      padding-top: $space-xs + 1;

      @include input-placeholder() {
        color: $color-gray-dark;
      }
    }

    &__input {
      padding-left: 0;
      margin-bottom: $space-xs;
      padding-top: $space-xs + 1;

      @include input-placeholder() {
        color: $color-gray-dark;
      }
    }

    &__select {
      height: $tappable-element-m - 2px;
      &::before {
        border-color: $color-gray-dark transparent transparent;
      }
    }

    &__tags {
      @include reset-text-indents();
      border: 1px solid $color-gray-lighter;
      border-radius: $radius-m !important;
      padding: $space-xxxs - 1 $tappable-element-m 0 $space-s;
    }

    &__tags-wrap {
      padding-bottom: $space-xxxs;
      position: relative;
      top: $space-xxxs - 1;
      display: flex;
      flex-wrap: wrap;
      margin-top: -$space-xxxs + 1;
      min-height: $tappable-element-m - 4px;
      margin-left: -$space-xs;
    }

    &__tag {
      font-family: $font-family;
      margin-top: $space-xxxs;
      background-color: fade-out($color-primary, 0.9);
      color: $color-text;
      display: inline-flex;
      align-items: center;
      padding: $space-xxxs $space-xs;
      padding-left: $space-m / 2;
      border-radius: $radius-xxxxl;
      font-size: $size-m - 1;
      height: $tappable-element-s;
      margin-bottom: $space-xxxs;
      margin-right: $space-xxs - 1;

      span {
        @include ellipsis();
        flex: 1 1 auto;
      }
    }

    &__tag-icon {
      @include size($tappable_element_xxs + 2);
      position: relative;
      background-color: $color-primary;
      border-radius: $radius-circle;
      flex: 0 0 auto;

      &:hover {
        background-color: $color-danger;
      }

      &::after {
        position: absolute;
        color: #e0eeff;
        left: 5px;
        top: -2px;
        width: 8px;
        height: 8px;
      }
    }

    &__content {
      padding: $space-xs;
      max-width: 100%;
    }

    &__content-wrapper {
      top: calc(100% + #{$space-xs});
      border: none;
      border-radius: $radius-l;
      box-shadow: $shadow-l;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &__element {
    }

    &__option {
      min-height: $tappable-element-l;
      display: flex;
      align-items: center;
      border-radius: $radius-m;
      padding: $space-xs;

      span {
        @include ellipsis();
      }

      &--highlight {
        background-color: $color-gray-lightest;
        color: $color-text;
      }
    }

    &--active {
      .multiselect {
        &__tags {
          border-color: $color-primary;
        }
        &__select {
          &::before {
            border-color: $color-primary transparent transparent;
          }
        }
      }
    }
  }

  &--error {
    .multiselect {
      &__tags {
        border-color: $color-main !important;
      }
    }
  }

  &--disabled {
    .multiselect--disabled {
      opacity: 1;
      background: transparent;
      .multiselect {
        &__tags {
          border-color: hsl(0, 0%, 93%) !important;
          background-color: hsl(0, 0%, 93%);
        }

        &__select {
          background-color: transparent;

          &::before {
            border-color: hsl(0, 0%, 60%) transparent transparent;
          }
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let categories = require('../../mocks/categories').default
  let categoriesModel = []
  let categoriesModel2 = []
  let categoriesModel3 = []
  <div style="max-width: 400px">
    <McFieldSelect
            title="Multiple"
            :allow-empty="true"
            :multiple="true"
            :hide-selected="true"
            v-model="categoriesModel"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            placeholder="Multiple"
            :errors="['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.']"
    />

    <br>
    <McFieldSelect
            help-text="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
            title="Single"
            :allow-empty="true"
            :multiple="false"
            v-model="categoriesModel2"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            placeholder="One"/>

    <br>
    <McFieldSelect
            disabled
            title="Disabled"
            :allow-empty="true"
            :multiple="false"
            v-model="categoriesModel3"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            placeholder="One"/>
  </div>
  ```
</docs>
