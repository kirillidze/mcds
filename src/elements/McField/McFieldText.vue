<template>
  <div class="mc-field-text" :class="classes">
    <label :for="name" class="mc-field-text__header">
      <slot name="header">
        <McTitle :ellipsis="false" v-if="title" :level="4">{{ title }}</McTitle>
      </slot>
    </label>
    <div class="mc-field-text__main">
      <div class="mc-field-text__prepend">
        <slot name="prepend" />
      </div>
      <div class="mc-field-text__input-wrapper">
        <flat-pickr
          v-if="isDate"
          class="mc-field-text__input"
          :style="inputStyles"
          :placeholder="placeholder"
          :value="value"
          :name="name"
          ref="input"
          :disabled="disabled"
          :id="name"
          v-on="listeners"
          @input="value => handleInput(value)"
        ></flat-pickr>
        <textarea
          v-else-if="isTextarea"
          class="mc-field-text__input"
          :style="inputStyles"
          :placeholder="placeholder"
          :value="value"
          :disabled="disabled"
          :name="name"
          :id="name"
          v-on="listeners"
          @input="$event => handleInput($event.target.value)"
          :autocomplete="autocomplete"
        ></textarea>
        <textarea-autosize
          v-else-if="isTextareaAutosize"
          class="mc-field-text__input"
          :style="inputStyles"
          :placeholder="placeholder"
          :disabled="disabled"
          :name="name"
          :id="name"
          v-on="listeners"
          rows="1"
          :min-height="minHeight"
          :max-height="maxHeight"
          @input="handleInput"
          :value="value"
          :autocomplete="autocomplete"
        ></textarea-autosize>
        <input
          v-else
          class="mc-field-text__input"
          :style="inputStyles"
          :disabled="disabled"
          :type="type"
          :placeholder="placeholder"
          :value="value"
          ref="input"
          :name="name"
          :id="name"
          v-on="listeners"
          @input="$event => handleInput($event.target.value)"
          :autocomplete="autocomplete"
        />
      </div>
      <div class="mc-field-text__append">
        <slot name="append" />
      </div>
    </div>
    <div class="mc-field-text__footer" v-if="errorText || helpText || $slots.footer">
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
import _omit from "lodash/omit"

import tokens from "../../assets/tokens/tokens"
import flatPickr from "vue-flatpickr-component"
import TextareaAutosize from "vue-textarea-autosize/src/components/TextareaAutosize"

import McTitle from "../McTitle"
import McSvgIcon from "../McSvgIcon"
import McButton from "../McButton"
import McTooltip from "../McTooltip"

export default {
  name: "McFieldText",
  components: { McTooltip, McButton, McSvgIcon, McTitle, flatPickr, TextareaAutosize },
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     *  Тип:
     * `text, password, email и т.д.`
     */
    type: {
      type: String,
      default: "text",
    },

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

    /**
     *  Отключенное состояние
     *
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     *  Значение
     *
     */
    value: {
      default: null,
    },

    /**
     *  Ошибки
     *
     */
    errors: {
      type: Array,
      default: null,
    },

    /**
     *  Placeholder
     *
     */
    placeholder: {
      type: String,
      default: null,
    },

    /**
     *  Name
     *
     */
    name: {
      type: String,
      required: true,
    },

    /**
     *  Min height
     *
     */
    minHeight: {
      type: Number,
      default: null,
    },

    /**
     *  Max height
     *
     */
    maxHeight: {
      type: Number,
      default: null,
    },

    /**
     *  Background gradient
     *
     */
    gradient: {
      type: Boolean,
      default: false,
    },
    /**
     *  автокомплит введённого ранее текста: on, off
     *
     */
    autocomplete: {
      type: String,
      default: "on",
    },
  },

  data() {
    return {
      prependWidth: 0,
      appendWidth: 0,
    }
  },

  mounted() {
    this.calculatePadding()
  },

  computed: {
    classes() {
      return {
        "mc-field-text--error": this.errorText,
        "mc-field-text--textarea": this.isTextarea,
        "mc-field-text--textarea-autosize": this.isTextareaAutosize,
        "mc-field-text--date": this.isDate,
        "mc-field-text--disabled": this.disabled,
        "mc-field-text--gradient": this.gradient,
      }
    },

    isTextarea() {
      return this.type === "textarea"
    },

    isTextareaAutosize() {
      return this.type === "textarea-autosize"
    },

    isDate() {
      return this.type === "date"
    },

    errorText() {
      if (this.errors == null || this.errors.length === 0) return null
      return this.errors.join(", ")
    },

    inputStyles() {
      return {
        paddingLeft: this.prependWidth && `${this.prependWidth + parseInt(tokens.space_m)}px`,
        paddingRight: this.appendWidth && `${this.appendWidth + parseInt(tokens.space_m)}px`,
      }
    },

    listeners() {
      return _omit(this.$listeners, "input")
    },
  },

  methods: {
    handleInput(value) {
      this.$emit("input", value)
    },

    calculatePadding() {
      this.prependWidth = this.calculateSlotPadding("prepend")
      this.appendWidth = this.calculateSlotPadding("append")
    },

    calculateSlotPadding(name) {
      return (
        this.$slots[name] &&
        this.$slots[name].reduce((acc, cur) => {
          const $el = cur.elm ? cur.elm : cur
          return acc + $el.getBoundingClientRect().width
        }, 0)
      )
    },
  },
}
</script>

<style lang="scss">
.mc-field-text {
  $block-name: &;

  display: block;
  margin-bottom: 16px;

  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-xs;

    &:empty {
      display: none;
    }
  }

  &__main {
    position: relative;
  }

  &__prepend,
  &__append {
    @include reset-text-indents();
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: $space-xs;
    padding-right: $space-xs;
    min-width: $tappable-element-m;
    height: 100%;
    margin-left: -$space-xxxs;
    margin-right: -$space-xxxs;
    padding-top: $space-xxs + 2;
    padding-bottom: $space-xxs + 2;

    &:empty {
      display: none;
    }

    > * {
      margin-left: $space-xxxs;
      margin-right: $space-xxxs;
    }
  }

  &__prepend {
    left: 0;
  }

  &__append {
    right: 0;
  }

  &__input-wrapper {
  }

  &__input {
    font-family: $font-heading;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    min-height: $tappable-element-m;
    margin: 0;
    border: 1px solid $color-outline-gray;
    border-radius: $radius-m;
    padding: ($space-s / 2) + 1 $space-s;
    line-height: $line-height-s;
    font-size: $size-m;
    background-color: $color-white;
    -moz-appearance: textfield;
    appearance: textfield;
    transition: background-color $duration-quickly ease, border-color $duration-quickly ease;
    color: $color-gray-dark;

    &:focus {
      outline: 0;
      border-color: $color-blue;
    }

    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration,
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    @include input-placeholder() {
      color: $color-gray-dark;
    }
  }

  &__footer {
    margin-top: $space-xxxs;

    &:empty {
      display: none;
    }
  }

  &--error {
    #{$block-name} {
      &__input {
        border-color: $color-red;
      }
    }
  }

  &--textarea {
    #{$block-name} {
      &__append,
      &__prepend {
        align-items: flex-start;
      }
      &__input {
        $textarea-height: 94px;

        height: auto;
        min-height: calc(#{$textarea-height} + 2px);
        resize: vertical;
      }
    }
  }

  &--textarea-autosize {
    #{$block-name} {
      &__input {
        height: auto;
      }
    }
  }

  &--disabled {
    #{$block-name} {
      &__input {
        color: $color-gray-dark;
        cursor: not-allowed;
        background-color: $color-hover-gray;
        border-color: $color-hover-gray;
      }
    }
  }

  &--gradient {
    #{$block-name} {
      &__input {
        border: none;
        color: #fff;
        background-image: $gradient-input;
      }
    }
  }
}
</style>

<docs>
    ```jsx
    let text = null
    <div style="max-width: 700px">
        <McFieldText
                placeholder="Введите сообщение"
                name="login"
                help-text="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
        >
            <McTitle :ellipsis="false" :level="4" slot="header">
                <McTooltip placement="right" slot="icon-append" size="s"
                           content="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube.">
                    <McSvgIcon name="help"/>
                </McTooltip>
                Электронная почта
            </McTitle>
            <McSvgIcon slot="prepend" name="face"/>
            <McSvgIcon slot="prepend" name="access_time"/>
            <McSvgIcon slot="append" name="attach_money"/>

            <McTooltip slot="append" size="s" content="Вывести все средства">
                <McButton uppercase variation="gray-dark-invert" size="s">
                    Все
                </McButton>
            </McTooltip>
            <McButton slot="append" uppercase variation="gray-dark-invert" size="s">
                Фонды
            </McButton>
        </McFieldText>

        <br>

        <McFieldText
                placeholder="Disabled"
                disabled
                name="pass"
                title="Заголовок"
                help-text="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
        />

        <br>

        <McFieldText
                :errors="['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.']"
                name="message"
                type="textarea"
                placeholder="Введите сообщение"
                title="Textarea"
        >
            <McButton
                    variation="blue-link"
                    slot="append"
                    size="s-compact"
            >
                <McSvgIcon slot="icon-append" name="send"/>
            </McButton>
        </McFieldText>

        <br>

        <McFieldText title="Флэтпицкер" name="date" type="date" placeholder="Дата"></McFieldText>
    </div>
    ```
</docs>
