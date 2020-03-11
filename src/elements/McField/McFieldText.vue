<template>
  <div class="mc-field-text" :class="classes">
    <label :for="name" class="mc-field-text__header">
      <slot name="header">
        <McTitle :ellipsis="false" v-if="title" :level="4">{{ title }}</McTitle>
      </slot>
    </label>
    <div class="mc-field-text__inner">
      <div class="mc-field-text__main">
        <div class="mc-field-text__prepend">
          <slot name="prepend" />
        </div>
        <div class="mc-field-text__input-wrapper">
          <calendar
            v-if="isCalendar"
            class="mc-field-text__date-picker"
            title-position="left"
            :name="name"
            :id="name"
            :attributes="attrs"
            :locale="locale"
            :masks="masks"
            ref="input"
            :first-day-of-week="2"
            v-on="listeners"
            :columns="columns"
          />

          <date-picker
            v-else-if="isDate"
            class="mc-field-text__date-picker"
            title-position="left"
            :name="name"
            :id="name"
            :mode="mode"
            :masks="masks"
            :value="_value"
            :color="color"
            :locale="locale"
            ref="input"
            :first-day-of-week="2"
            :is-inline="isInline"
            :input-props="inputProps"
            :columns="columns"
            :popover="{ visibility: 'click' }"
            v-on="listeners"
            @input="value => handleEmitDate(value)"
          />

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
            :maxlength="maxLength"
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
            :readonly="readOnly"
            :maxlength="maxLength"
          />
        </div>
        <div class="mc-field-text__append">
          <slot name="append" />
          <mc-button
            v-if="copy"
            variation="gray-dark-flat"
            size="s-compact"
            @click.prevent="handlerCopy(value)"
          >
            <mc-svg-icon slot="icon-append" name="file_copy" fill="rgb(62, 132, 244)" />
          </mc-button>
        </div>
      </div>
      <div class="mc-field-text__right" v-if="$slots.right">
        <slot name="right" />
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
     * `text, password, email и т.д.`
     */
    type: {
      type: String,
      default: "text",
    },
    /**
     * `Формат принимаемой даты
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

    _value: {
      get() {
        if (!this.value) return
        return new Date(this.value)
      },
    },
  },

  methods: {
    handleInput(value) {
      this.$emit("input", value)
    },

    handleEmitDate(value) {
      let newValue = this.$moment(value).format(this.toFormat)
      console.log(newValue)
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
          const $el = cur.elm ? cur.elm : cur
          return acc + $el.getBoundingClientRect().width
        }, 0)
      )
    },
    handlerCopy(value) {
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
      width: 20px;
      height: 20px;
      color: $color-black;
    }
    .vc-arrows-container {
      top: 2px;
    }
    .vc-highlight {
      border-radius: 4px;
      color: $color-blue;
    }
    .vc-day-content {
      font-weight: $weight-medium !important;
      border-radius: 4px;
      margin-top: 4px;
      margin-bottom: 4px;
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

        <McFieldText title="Флэтпицкер" name="date" type="date" placeholder="Дата">
            <McButton
              variation="blue-link"
              slot="prepend"
              size="s-compact"
            >
                <McSvgIcon slot="icon-append" name="date_range" fill="#4285F4" />
            </McButton>
        </McFieldText>

        <br>

        <McFieldText title="Calendar" name="date" type="calendar" placeholder="Дата"></McFieldText>

        <br>

        <McFieldText title="datePicker" name="date" value="2019-12-06T00:00:00+00:00" to-format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="Дата">
            <McButton
              variation="blue-link"
              slot="prepend"
              size="s-compact"
            >
                <McSvgIcon slot="icon-append" name="date_range" fill="#4285F4" />
            </McButton>
        </McFieldText>

        <br>

        <McFieldText title="datePicker" mode="range" name="date" type="date" placeholder="Дата">
            <McButton
              variation="blue-link"
              slot="prepend"
              size="s-compact"
            >
                <McSvgIcon slot="icon-append" name="date_range" fill="#4285F4" />
            </McButton>
        </McFieldText>

        <br>
    </div>
    ```
</docs>
