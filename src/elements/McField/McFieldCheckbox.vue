<template>
  <div class="mc-field-checkbox" :class="classes">
    <div class="mc-field-text__header">
      <slot name="header">
        <McTitle :ellipsis="false" v-if="title" :level="4">{{ title }}</McTitle>
      </slot>
    </div>
    <div class="mc-field-checkbox__input-wrap">
      <label class="mc-field-checkbox__name">
        <input
          :disabled="disabled"
          class="mc-field-checkbox__input"
          type="checkbox"
          :name="name"
          :checked="value === checkedValue"
          @change="handleChange"
        />
        <span class="mc-field-checkbox__name-text">
          <slot>
            <McTitle tag-name="div" :ellipsis="false" v-if="mainText">
              {{ mainText }}
            </McTitle>
          </slot>
        </span>
      </label>
      <div class="mc-field-checkbox__footer">
        <McTitle tag-name="div" :ellipsis="false" color="danger" size="s" v-if="errorText">
          {{ errorText }}
        </McTitle>
        <br v-if="errorText" />
        <slot name="footer">
          <McTitle tag-name="div" :ellipsis="false" size="s" v-if="helpText">
            {{ helpText }}
          </McTitle>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import McTitle from "../McTitle"
export default {
  name: "McFieldCheckbox",
  components: { McTitle },
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     *  Значение
     *
     */
    value: {
      default: null,
    },

    /**
     *  Name
     *
     */
    name: {
      type: String,
      default: null,
    },

    /**
     *  Выбранное значение
     *
     */
    checkedValue: {
      default: true,
    },

    /**
     *  Невыбранное значение
     *
     */
    uncheckedValue: {
      default: false,
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
     *  Плейсхолдер
     *
     */
    placeholder: {
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
     *  Подпись чекбокса:
     *
     */
    mainText: {
      type: String,
      default: null,
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
     *  Отключенное состояние
     *
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "mc-field-checkbox--error": this.errors,
        "mc-field-checkbox--disabled": this.disabled,
        "mc-field-checkbox--empty": !this.mainText && !this.$slots.default,
      }
    },
    errorText() {
      if (this.errors == null || this.errors.length === 0) return null
      return this.errors.join(", ")
    },
  },
  methods: {
    handleChange(e) {
      this.$emit("input", e.target.checked ? this.checkedValue : this.uncheckedValue)
    },
    emitInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>

<style lang="scss">
.mc-field-checkbox {
  display: block;
  min-width: 18px;
  min-height: 18px;

  $block-name: &;

  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-xs;

    &:empty {
      display: none;
    }
  }

  &__input-wrap {
    & + & {
      margin-top: $space-xs;
    }
  }

  &__name {
    display: inline-block;
    position: relative;
    padding-left: $space-m;
    margin-right: $space-xs;
  }

  &__name-text {
    display: inline-block;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: $tappable-element-xxs + 2;
      height: $tappable-element-xxs + 2;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNMTYuOTg0IDFxLjc5NyAwIDEuNDA2LjYxLjYxLjYxLjYxIDEuNDA0djEzLjk3cTAgLjc5Ny0uNjEgMS40MDYtLjYxLjYxLTEuNDA2LjYxSDMuMDE0cS0uNzk2IDAtMS40MDUtLjYxUTEgMTcuNzggMSAxNi45ODRWMy4wMTRxMC0uNzk2LjYxLTEuNDA0UTIuMjIgMSAzLjAxNCAxaDEzLjk3em0wIDIuMDE2SDMuMDE0djEzLjk3aDEzLjk3VjMuMDE2eiIgZmlsbD0iIzk5OTk5OSIvPjwvc3ZnPg==");
      background-size: 100%;
    }
    @at-root input:checked ~ &:before {
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNNy45ODQgMTUuMDE3bDktOS0xLjQwNi0xLjQ1NC03LjU5NCA3LjU5NUw0LjQyIDguNTk0IDMuMDE4IDEwem05LTE0LjAxN3EuODQ0IDAgMS40My42MVQxOSAzLjAxNHYxMy45N3EwIC43OTctLjU4NiAxLjQwNi0uNTg2LjYxLTEuNDMuNjFIMy4wMTRxLS44NDMgMC0xLjQzLS42MVQxIDE2Ljk4NFYzLjAxNHEwLS43OTYuNTg1LTEuNDA0UTIuMTcgMSAzLjAxNSAxaDEzLjk3eiIgZmlsbD0iIzQyODVmNCIvPjwvc3ZnPg==");
    }
  }

  &__input {
    display: none;
  }

  &__footer {
    padding-left: $space-m;
    margin-top: $space-xxxs;
    &:empty {
      display: none;
    }
  }

  &--disabled {
    #{$block-name} {
      &__name-text {
        &:before {
          background-image: none;
          border-radius: $radius-s;
          background-color: $color-gray-lighten;
        }
      }
    }
  }

  &--empty {
    #{$block-name} {
      &__footer,
      &__name {
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let toggler = null
  let toggler2 = null
  <div>
    <McFieldCheckbox
            :errors="['Имя пользователя и пароль не совпадают', 'Поле обязательно для заполнения.']"
            name="check"
            title="Заголовок"
            help-text="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
            v-model="toggler"
            main-text="Чекбокс"
    />

    <br>

    <McFieldCheckbox
            disabled
            name="check2"
            title="Заголовок"
            help-text="Используйте электронный адрес, указанный при регистрации аккаунта MediaCube."
            v-model="toggler2"
            main-text="Чекбокс неактивный"
    />
  </div>
  ```
</docs>
