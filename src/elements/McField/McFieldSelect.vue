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
        <template slot="singleLabel" slot-scope="props">
          <div v-if="avatar" class="mc-field-select__avatar-wrap">
            <div class="mc-field-select__avatar">
              <McAvatar size="xs" :src="avatar" />
            </div>
            <div class="mc-field-select__avatar-text">
              {{ props.option ? props.option.name : this.placeholder }}
            </div>
          </div>
          <template v-else>
            <div class="mc-field-select__avatar-wrap">
              <div class="mc-field-select__avatar-text mc-field-select__avatar-text--no-img">
                {{ props.option ? props.option.name : this.placeholder }}
              </div>
            </div>
          </template>
        </template>
        <span slot="noResult">Ничего не найдено</span>
      </multiselect>
    </div>
    <div class="mc-field-select__footer">
      <McTitle tag-name="div" :ellipsis="false" color="red" size="s" v-if="errorText">
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
import McAvatar from "../McAvatar/McAvatar"
export default {
  name: "McFieldSelect",
  components: { McAvatar, McTitle, Multiselect },
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
        [`mc-field-select--bg-${this.backgroundColor}`]: this.backgroundColor,
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
$gray-scale: "light-gray", "gray-darkest", "black";
$text-black: scale-color($color-black, $alpha: -10%);
$text-white: scale-color($color-white, $alpha: -10%);

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

  &__avatar-wrap {
    @include reset-text-indents();
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  &__avatar {
    position: absolute;
    left: -$space-xs;
    top: -$space-xxxs;
  }

  &__avatar-text {
    @include ellipsis();
    font-size: $size-m;
    line-height: $line-height-s;
    padding-left: $space-m;
    color: $text-black;

    &--no-img {
      padding-left: 0;
    }
  }

  .multiselect {
    &__placeholder {
      @include ellipsis();
      color: $text-black;
      font-size: $size-m;
      line-height: $line-height-s;
      margin-bottom: $space-xs;
      padding-top: $space-xs + 1;
    }

    &__single {
      padding-left: 0;
      margin-bottom: $space-xs;
      padding-top: $space-xs + 1;
      background-color: transparent;

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
        border-color: $text-black transparent transparent;
      }
    }

    &__tags {
      @include reset-text-indents();
      border: 1px solid $color-outline-gray;
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
      font-family: $font-heading;
      margin-top: $space-xxxs;
      background-color: fade-out($color-blue, 0.9);
      color: $color-black;
      display: inline-flex;
      align-items: center;
      padding: $space-xxxs $space-xs $space-xxxs $space-m / 2;
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
      background-color: $color-blue;
      border-radius: $radius-circle;
      flex: 0 0 auto;

      &:hover {
        background-color: $color-red;
      }

      &::after {
        @include size($space-xs);
        position: absolute;
        color: #e0eeff;
        left: $space-xxs + 1;
        top: -$space-xxxs;
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
        background-color: $color-hover-gray;
        color: $color-black;
      }
    }

    &--active {
      .multiselect {
        &__tags {
          border-color: $color-blue;
        }
        &__select {
          &::before {
            border-color: $color-blue transparent transparent;
          }
        }
      }
    }
  }

  @each $color, $value in $token-colors {
    &--bg-#{$color} {
      .multiselect {
        &__tags {
          background-color: fade-out($value, 0.6);
        }

        @if $color != "white" {
          &__tags {
            border-color: transparent;
          }
        }

        &--active {
          .multiselect {
            &__tags {
              @if $color != "white" {
                border-color: $value;
              }
            }

            &__select {
              &:before {
                border-color: $text-black transparent transparent;
              }
            }
          }
        }
      }

      &#{$block-name}--disabled {
        .multiselect--disabled {
          .multiselect {
            &__tags {
              background-color: fade-out($value, 0.6);
              @if $color != "white" {
                border-color: transparent !important;
              }
            }

            &__select {
              &::before {
                border-color: $color-gray transparent transparent;
              }
            }
          }
        }
      }

      @each $col-g in $gray-scale {
        @if $color == $col-g {
          #{$block-name}__avatar-text {
            color: $text-white;
          }

          .multiselect {
            &__tags {
              background-color: $value;
            }

            &__placeholder {
              color: $text-white;
            }

            &__select {
              &::before {
                border-color: $text-white transparent transparent;
              }
            }

            &--active {
              .multiselect {
                &__tags {
                  border-color: $color-black;
                }
              }
            }
          }

          &#{$block-name}--disabled {
            .multiselect--disabled {
              .multiselect {
                &__tags {
                  background-color: $value;
                }

                &__select {
                  &::before {
                    border-color: fade-out($color-outline-gray, 0.3) transparent transparent;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  &--error {
    .multiselect {
      &__tags {
        border-color: $color-red !important;
      }
    }
  }

  &--disabled {
    .multiselect--disabled {
      opacity: 1;
      background: transparent;
      .multiselect {
        &__tags {
          border-color: $color-outline-gray !important;
          background-color: $color-hover-gray;
        }

        &__placeholder {
          color: $color-gray-dark;
        }

        &__select {
          background-color: transparent;

          &::before {
            border-color: $color-outline-gray transparent transparent;
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
  let categoriesModel4 = 4
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
    <br>
    <McFieldSelect
            background-color="azure"
            title="Цветной"
            avatar="https://yt3.ggpht.com/a/AGF-l79FVckie4j9WT-4cEW6iu3gPd4GivQf_XNSWg=s800-mo-c-c0xffffffff-rj-k-no"
            v-model="categoriesModel4"
            :options="categories.map(c => ({ name: c.title, value: c.id }))"
            :searchable="false"
    />
  </div>
  ```
</docs>
