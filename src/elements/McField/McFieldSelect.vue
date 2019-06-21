<template>
  <div class="mc-field-select" :class="classes">
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
            <!--<ElAvatar size="ex-small" :src="avatar" />-->
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
    <span v-if="errorText" class="mc-field-select__help-text">{{ errorText }}</span>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect"
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
    classes() {
      let result = {
        "mc-field-select--error": this.errorText,
      }
      if (this.backgroundColor) result[`mc-field-select--color-${this.backgroundColor}`] = true
      return result
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
@import "../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
$colors: (
  "color-red-light": $color-red-light,
  "color-dodger-blue-light": $color-dodger-blue-light,
  "color-dodger-blue-lighten": $color-dodger-blue-lighten,
  "color-dodger-blue-lighter": $color-dodger-blue-lighter,
  "color-mantis-dark": $color-mantis-dark,
  "color-gorse": $color-gorse,
  "color-gray-dark": $color-gray-dark,
  "color-gray-lighter": $color-gray-lighter,
  "color-black": $color-black,
  "color-dark-orchid": $color-dark-orchid,
  "color-bright-turquoise-darker": $color-bright-turquoise-darker,
  "color-aqua-darken": $color-aqua-darken,
  "color-cinnabar-dark": $color-cinnabar-dark,
  "color-bermuda-gray": $color-bermuda-gray,
);

$link-bg-color: hsl(0, 0%, 93%);
$link-bg-color--active: fade-out($color-black, 0.88);

.mc-field-select {
  &__avatar-wrap {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 0;
    line-height: 0;
  }

  &__avatar {
    position: absolute;
    left: -8px;
    top: -2px;
  }

  &__avatar-text {
    @include ellipsis();
    font-size: 16px;
    line-height: line-height(19, 16);
    padding-left: 25px;

    &--no-img {
      padding-left: 0;
    }
  }

  &__help-text {
    @include field-error();

    &:empty {
      display: none;
    }
  }

  .multiselect {
    cursor: pointer;
    min-height: 34px;

    $block-name: &;

    @include custom-scroll();

    &__input {
      color: hsl(0, 0%, 13%);
      font-family: $font-heading-secondary;
      line-height: line-height(19, 16);
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 6px;

      &::placeholder {
        color: hsl(0, 0%, 13%);
      }
    }

    &__tags {
      border-color: #b7b7b7;
      min-height: 34px;
      padding-top: 6px;
      border-radius: 4px;
    }

    &__tag {
      border-radius: 12px;
      background-color: hsl(0, 0%, 84%);
      color: hsl(0, 0%, 27%);
      font-weight: 500;
      height: 23px;
      padding: 4px 28px 4px 11px;
      font-size: 14px;
      line-height: 1.21;
      margin-bottom: -1px;
      margin-top: -2px;
      margin-right: 3px;
    }

    &__tag-icon {
      background-color: hsl(0, 0%, 53%);
      border-radius: 50%;
      width: 14px;
      height: 14px;
      right: 5px;
      top: 5px;
      font-size: 0;
      line-height: 0;

      &::after {
        display: block;
        color: hsl(0, 0%, 84%);
        position: absolute;
        font-size: 14px;
        line-height: 10px;
        top: 50%;
        left: 50%;
        margin-left: -5px;
        width: 10px;
        height: 10px;
        margin-top: -5px;
      }

      &:hover {
        background: $color-navy-blue-light;

        &:after {
          color: hsl(0, 0%, 84%);
        }
      }
    }

    &__select {
      height: 34px;
      width: 34px;

      &::before {
        border-color: #333333 transparent transparent;
        border-width: 5px 5px 0;
      }
    }

    &__single {
      @include ellipsis();
      color: hsl(0, 0%, 13%);
      font-family: $font-heading-secondary;
      font-size: 16px;
      line-height: line-height(19, 16);
      font-weight: 500;
      margin-bottom: 6px;
    }

    &__option {
      transition: background-color $duration-quickly;
      color: hsl(0, 0%, 13%);
      font-family: $font-heading-secondary;
      font-size: 15px;
      line-height: line-height(18, 15);
      font-weight: 500;
      padding: 8px 12px;
      min-height: 32px;
      white-space: normal;

      &--highlight {
        background-color: $link-bg-color;
        color: $color-black;

        &::after {
          background-color: $color-navy-blue-light;
          //padding: 11px 16px 10px;
          //font-size: 14px;
          //line-height: 1.21;
        }

        &:active {
          background-color: $link-bg-color--active;
        }
      }
      &--selected {
        background-color: #e5f1fb;
        color: $color-black;
        font-weight: 400;

        &:hover,
        &:focus {
          background-color: darken(#e5f1fb, 3%);
        }

        &:active {
          background-color: darken(#e5f1fb, 7%);
        }

        &#{$block-name} {
          &__option {
            &--highlight {
              background-color: #e5f1fb;
              color: $color-black;
              font-weight: 400;

              &:hover,
              &:focus {
                background-color: darken(#e5f1fb, 3%);
              }

              &:active {
                background-color: darken(#e5f1fb, 7%);
              }
            }
          }
        }
      }
    }

    &--active {
      .multiselect {
        &__tags {
          border-color: $color-navy-blue-light;
          border-bottom-color: $color-gray-light;
        }
        &__content-wrapper {
          border-color: $color-navy-blue-light;
        }
        &__single,
        &__input {
          color: $color-black;

          &::placeholder {
            font-size: 0;
            line-height: 0;
            opacity: 0;
          }
        }
      }
      &.multiselect {
        &--above {
          .multiselect {
            &__tags {
              border-bottom-color: $color-navy-blue-light;
              border-top-color: $color-gray-light;
            }
          }
        }
      }
    }

    &--disabled {
      opacity: 1;

      .multiselect {
        &__select {
          display: none;
        }
      }
    }
  }

  @each $color, $value in $colors {
    &--color-#{$color} {
      .multiselect {
        &__tags {
          background-color: fade-out($value, 0.6);
          border-color: transparent;
        }

        //&__option {
        //
        //    &--highlight {
        //        background-color: fade-out($value, 0.8);
        //        color: $color-black;
        //
        //        &::after {
        //            background-color: fade-out($value, 0.8);
        //        }
        //
        //        &:active {
        //            background-color: darken(fade-out($value, 0.6), 7%);
        //        }
        //    }
        //
        //    &--selected {
        //        background-color: fade-out($value, 0.7);
        //        color: $color-black;
        //        font-weight: 400;
        //
        //        &:hover,
        //        &:focus {
        //            background-color: darken(fade-out($value, 0.7), 3%);
        //        }
        //
        //        &:active {
        //            background-color: darken(fade-out($value, 0.7), 7%);
        //        }
        //
        //        &.multiselect {
        //
        //            &__option {
        //
        //                &--highlight {
        //                    background-color: fade-out($value, 0.8);
        //                    color: $color-black;
        //                    font-weight: 400;
        //
        //                    &:hover,
        //                    &:focus {
        //                        background-color: darken(fade-out($value, 0.6), 3%);
        //                    }
        //
        //                    &:active {
        //                        background-color: darken(fade-out($value, 0.6), 7%);
        //                    }
        //                }
        //            }
        //        }
        //
        //    }
        //}

        &--active {
          .multiselect {
            &__tags {
              border-color: $value;
              border-bottom-color: $value;
            }

            &__content-wrapper {
              border-color: $value;
            }
          }
          &.multiselect {
            &--above {
              .multiselect {
                &__tags {
                  border-bottom-color: $value;
                  border-top-color: $value;
                }
              }
            }
          }
        }
      }
    }
  }
}

.mc-field-select:not([class^="mc-field-select mc-field-select--color"]) {
  .multiselect--disabled {
    border-radius: 4px;

    .multiselect {
      &__select {
        background: transparent;
      }

      &__tags {
        border: none;
        background-color: #ededed;
        padding: 8px 8px 0 8px;
      }

      &__single {
        background-color: #ededed;
      }
    }
  }
}

[class^="mc-field-select mc-field-select--color"] {
  .multiselect {
    &--active {
      .multiselect {
        &__tags {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      }
    }

    &__tags {
      border-radius: 16px;
      transition: border-radius $duration-quickly;
    }

    &__select {
      &:before {
        border-width: 5px 5px 0;
      }
    }

    &__single,
    &__input {
      background-color: transparent;
    }

    &__single {
      //@include ellipsis();
      //overflow-y: visible;
      overflow: visible;
    }

    &__option {
      white-space: normal;
    }

    &__content-wrapper {
      //border-bottom-left-radius: 22px;
      //border-bottom-right-radius: 22px;
    }

    &--disabled {
      background: transparent;
    }
  }
}
</style>

<!--<docs>-->
<!--```jsx-->
<!--let value = null-->
<!--<div>-->
<!--<McFieldSelect-->
<!--:disabled="false"-->
<!--background-color="color-red-light"-->
<!--:avatar="null"-->
<!--:value="value"-->
<!--:options="{name: 'test', value: 1}"-->
<!--:searchable="false"-->
<!--open-direction="bottom"-->
<!--/>-->
<!--</div>-->
<!--```-->
<!--</docs>-->
