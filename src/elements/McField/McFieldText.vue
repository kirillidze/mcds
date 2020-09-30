<template>
  <div class="mc-field-text" :class="classes">
    <label :for="name" class="mc-field-text__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title :ellipsis="false" v-if="title" :level="4">{{ title }}</mc-title>
      </slot>
    </label>
    <div class="mc-field-text__inner">
      <div class="mc-field-text__main">
        <div class="mc-field-text__prepend" v-if="$slots.prepend">
          <!-- @slot Слот в начале инпута -->
          <slot name="prepend" />
        </div>
        <div class="mc-field-text__input-wrapper">
          <calendar
            v-if="isCalendar"
            v-bind="datePickerAttrs"
            v-on="listeners"
            :attributes="attrs"
          />
          <date-picker
            v-else-if="isDate"
            v-bind="datePickerAttrs"
            v-on="listeners"
            :mode="mode"
            :value="_value"
            :color="color"
            :is-inline="isInline"
            :input-props="inputProps"
            :popover="{ visibility: 'click' }"
            @input="value => handleEmitDate(value)"
          />

          <textarea
            v-else-if="isTextarea"
            v-bind="inputAttrs"
            v-on="listeners"
            :maxlength="maxLength"
            @input="$event => handleInput($event.target.value)"
          />
          <textarea-autosize
            v-else-if="isTextareaAutosize"
            v-bind="inputAttrs"
            v-on="listeners"
            rows="1"
            :min-height="minHeight"
            :max-height="maxHeight"
            @input="handleInput"
          />

          <input
            v-else
            v-bind="inputAttrs"
            :type="type"
            ref="input"
            v-on="listeners"
            @input="$event => handleInput($event.target.value)"
            :readonly="readOnly"
            :maxlength="maxLength"
          />
        </div>
        <div class="mc-field-text__append" v-if="$slots.append || copy">
          <!-- @slot Слот в конце инпута -->
          <slot name="append" />
          <mc-button
            v-if="copy"
            variation="gray-dark-flat"
            size="s-compact"
            @click.prevent="handlerCopy(value)"
          >
            <mc-svg-icon slot="icon-append" :name="iconCopy" fill="rgb(62, 132, 244)" />
          </mc-button>
        </div>
      </div>
      <!-- @slot Слот справа инпута -->
      <div class="mc-field-text__right" v-if="$slots.right">
        <slot name="right" />
      </div>
    </div>
    <div class="mc-field-text__footer" v-if="errorText || helpText || $slots.footer">
      <mc-title tag-name="div" :ellipsis="false" color="red" size="s" v-if="errorText">
        {{ errorText }}
      </mc-title>
      <br v-if="errorText" />
      <!-- @slot Слот доп. текста под инпутом -->
      <slot name="footer">
        <mc-title tag-name="div" :ellipsis="false" size="s" v-if="helpText">
          {{ helpText }}
        </mc-title>
      </slot>
    </div>
  </div>
</template>

<script>
import _omit from "lodash/omit"

import tokens from "../../assets/tokens/tokens"
import flatPickr from "vue-flatpickr-component"
import Calendar from "v-calendar/lib/components/calendar.umd"
import DatePicker from "v-calendar/lib/components/date-picker.umd"
import TextareaAutosize from "vue-textarea-autosize/src/components/TextareaAutosize"

import McTitle from "../McTitle"
import McSvgIcon from "../McSvgIcon"
import McButton from "../McButton"
import McTooltip from "../McTooltip"

export default {
  name: "McFieldText",
  components: {
    McTooltip,
    McButton,
    McSvgIcon,
    McTitle,
    flatPickr,
    Calendar,
    DatePicker,
    TextareaAutosize,
  },
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     *  Тип:
     * `date, calendar, textarea, textarea-autosize и
     * нативные как text, password, email и т.д.`
     */
    type: {
      type: String,
      default: "text",
    },
    /**
     * Формат принимаемой даты
     */
    fromFormat: {
      type: String,
      default: "YYYY-MM-DD",
    },
    /**
     * `Формат отдаваемой даты
     */
    toFormat: {
      type: String,
      default: "YYYY-MM-DD",
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
     *  Max length
     *
     */
    maxLength: {
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
     *  Состояние копирования
     *
     */
    copy: {
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

    /**
     *  Мод дейтпикера: single, range, multiple
     *
     */
    mode: {
      type: String,
      default: "single",
    },

    /**
     *  Язык дейтпикера
     *
     */
    locale: {
      type: String,
      default: "ru",
    },

    /**
     *  Цвет дейтпикера
     *
     */
    color: {
      type: String,
      default: "blue",
    },

    /**
     *  Колонки дейтпикера
     *
     */
    columns: {
      type: Number,
      default: 1,
    },

    /**
     *  Дейтпикер без инпута
     *
     */
    isInline: {
      type: Boolean,
      default: false,
    },

    /**
     *  только чтение текста
     *
     */
    readOnly: {
      type: Boolean,
      default: false,
    },

    /**
     * Иконка для копирования
     */
    iconCopy: {
      type: String,
      default: "file_copy",
    },
  },

  data() {
    return {
      prependWidth: 0,
      appendWidth: 0,
      attrs: [
        {
          key: "today",
          highlight: true,
          dates: new Date(),
        },
        {
          key: "weekend",
          contentClass: "weekend-day",
          contentStyle: {
            color: "gray",
          },
          dates: {
            start: new Date("1/1/2000"),
            end: new Date("1/1/2199"),
            on: [{ weekdays: [1, 7] }],
          },
        },
      ],
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
        "mc-field-text--copy": this.copy,
        [`mc-field-text--color-${this.color}`]: this.color,
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

    isCalendar() {
      return this.type === "calendar"
    },

    datePickerAttrs() {
      return {
        class: "mc-field-text__date-picker",
        "title-position": "left",
        name: this.name,
        id: this.name,
        locale: this.locale,
        masks: this.masks,
        ref: "input",
        "first-day-of-week": 2,
        columns: this.columns,
      }
    },
    inputAttrs() {
      return {
        class: "mc-field-text__input",
        style: this.inputStyles,
        placeholder: this.placeholder,
        value: this.value,
        disabled: this.disabled,
        name: this.name,
        id: this.name,
        autocomplete: this.autocomplete,
      }
    },

    masks() {
      return {
        weekdays: "WW",
        input: ["L", "YYYY-MM-DD HH:mm:ss", "YYYY/MM/DD", "YYYY-MM-DD"],
      }
    },

    inputProps() {
      return {
        placeholder: this.placeholder,
        disabled: this.disabled,
        readonly: false,
        style: `padding-left: ${this.inputStyles.paddingLeft}; padding-tight: ${this.inputStyles.paddingRight};`,
      }
    },

    errorText() {
      if (this.errors === null || !this.errors.length) return null
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

    _value: {
      get() {
        if (!this.value) return
        return new Date(this.value)
      },
    },
  },

  methods: {
    handleInput(value) {
      /**
       * Событие инпута
       * @property {string}
       */
      this.$emit("input", value)
    },

    handleEmitDate(value) {
      const newValue = this.$moment(value).format(this.toFormat)
      this.handleInput(newValue)
    },

    calculatePadding() {
      this.prependWidth = this.calculateSlotPadding("prepend")
      this.appendWidth = this.calculateSlotPadding("append")
    },

    calculateSlotPadding(name) {
      return (
        this.$slots[name] &&
        this.$slots[name].reduce((acc, cur) => {
          const $el = cur.elm || cur
          return acc + $el.getBoundingClientRect().width
        }, 0)
      )
    },
    handlerCopy(value) {
      /**
       * Событие по кнопке копирования
       * @property {string}
       */
      this.$emit("handleCopy", value)
    },
  },
}
</script>

<style lang="scss">
.mc-field-text {
  $block-name: &;

  display: block;

  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-xs;

    &:empty {
      display: none;
    }
  }

  &__inner {
    display: flex;
    align-items: center;
  }

  &__right {
    flex-shrink: 0;
  }

  &__main {
    position: relative;
    width: 100%;
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
    color: $color-black;

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
        border-color: $color-red !important;
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

  &--copy {
    #{$block-name} {
      &__input {
        color: $color_gray_dark;
        background-color: $color_hover_gray;
        border-color: $color_hover_gray;
        padding-right: 56px;
      }
    }
  }

  &__date-picker,
  .vc-container {
    font-family: $font-heading !important;
    font-weight: $weight-medium !important;
    input {
      transition: all 0.2s ease;
      &:focus {
        box-shadow: none;
        border-color: $color-blue;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .vc-title {
      font-weight: $weight-medium !important;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    .vc-weekday {
      font-weight: $weight-medium !important;
      color: $color-black;
    }
    .vc-svg-icon {
      @include size($size-l);
      color: $color-black;
    }
    .vc-arrows-container {
      top: $space-xxxs;
    }
    .vc-highlight {
      border-radius: $radius-m;
      color: $color-blue;
    }
    .vc-day-content {
      font-weight: $weight-medium !important;
      border-radius: $radius-m;
      margin-top: $space-xxs;
      margin-bottom: $space-xxs;
    }
    .vc-bg-blue-200 {
      background-color: $color-lightest-blue;
    }
    .vc-text-blue-900 {
      color: $color-blue;
    }
    .vc-bg-blue-600 {
      background-color: $color-blue;
    }
  }
}
</style>

<docs>
    ```jsx
    let text = null
    <div style="max-width: 700px">
        <mc-field-text
            placeholder="Введите сообщение"
            name="login"
            help-text="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
        >
            <mc-title :ellipsis="false" :level="4" slot="header">
                <mc-tooltip
                    placement="right"
                    slot="icon-append"
                    size="s"
                    content="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
                >
                    <mc-svg-icon name="help"/>
                </mc-tooltip>
                Электронная почта
            </mc-title>
            <mc-svg-icon slot="prepend" name="face"/>
            <mc-svg-icon slot="prepend" name="access_time"/>
            <mc-svg-icon slot="append" name="attach_money"/>

            <mc-tooltip slot="append" size="s" content="Вывести все средства">
                <mc-button uppercase variation="gray-dark-invert" size="s">
                    Все
                </mc-button>
            </mc-tooltip>
            <mc-button slot="append" uppercase variation="gray-dark-invert" size="s">
                Фонды
            </mc-button>
        </mc-field-text>

        <br>

        <mc-field-text
            placeholder="Disabled"
            disabled
            name="pass"
            title="Заголовок"
            help-text="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
        />

        <br>

        <mc-field-text
            :errors="['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.']"
            name="message"
            type="textarea"
            placeholder="Введите сообщение"
            title="Textarea"
        >
            <mc-button
                variation="blue-link"
                slot="append"
                size="s-compact"
            >
                <mc-svg-icon slot="icon-append" name="send"/>
            </mc-button>
        </mc-field-text>

        <br>

        <mc-field-text title="Флэтпицкер" name="date" type="date" placeholder="Дата">
            <mc-button
              variation="blue-link"
              slot="prepend"
              size="s-compact"
            >
                <mc-svg-icon slot="icon-append" name="date_range" fill="#4285F4" />
            </mc-button>
        </mc-field-text>

        <br>

        <mc-field-text title="Calendar" name="date" type="calendar" placeholder="Дата"></mc-field-text>

        <br>

        <mc-field-text title="datePicker" name="date" value="2019-12-06T00:00:00+00:00" to-format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="Дата">
            <mc-button
              variation="blue-link"
              slot="prepend"
              size="s-compact"
            >
                <mc-svg-icon slot="icon-append" name="date_range" fill="#4285F4" />
            </mc-button>
        </mc-field-text>

        <br>

        <mc-field-text title="datePicker" mode="range" name="date" type="date" placeholder="Дата">
            <mc-button
              variation="blue-link"
              slot="prepend"
              size="s-compact"
            >
                <mc-svg-icon slot="icon-append" name="date_range" fill="#4285F4" />
            </mc-button>
        </mc-field-text>

        <br>
    </div>
    ```
</docs>
