<template>
  <div class="mc-field-checkbox" :class="classes">
    <div class="mc-field-text__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title :ellipsis="false" v-if="title" :level="4">{{ title }}</mc-title>
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
          <!-- @slot Слот для пользовательской подписи чекбокса -->
          <slot>
            <mc-title tag-name="div" :ellipsis="false" v-if="mainText">
              {{ mainText }}
            </mc-title>
          </slot>
        </span>
      </label>
      <div class="mc-field-checkbox__footer">
        <mc-title tag-name="div" :ellipsis="false" color="red" size="s" v-if="errorText">
          {{ errorText }}
        </mc-title>
        <br v-if="errorText" />
        <!-- @slot Слот доп. текста под чекбоксом -->
        <slot name="footer">
          <mc-title tag-name="div" :ellipsis="false" size="s" v-if="helpText">
            {{ helpText }}
          </mc-title>
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

    /**
     *  Кастомная иконка
     *
     */
    iconPurple: {
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
        "mc-field-checkbox--icon-purple": this.iconPurple,
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
      /**
       * Событие инпута
       * @property {boolean}
       */
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

    .mc-button {
      display: inline;
      white-space: normal;
      vertical-align: top;
      margin-left: 1px;

      &__text {
        white-space: normal;
        display: inline;
      }
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
          background-color: $color-outline-gray;
        }
      }
    }
    &.mc-field-checkbox--icon-purple {
      #{$block-name} {
        &__name-text {
          &:before {
            background-color: $color-secondary-gray;
          }
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
  &--icon-purple {
    .mc-field-checkbox__name-text {
      &:before {
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmVyc2lvbj0iMS4xIiBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7fQ0KCS5zdDF7ZmlsbDojREVFMUU5O30NCjwvc3R5bGU+DQo8ZyBpZD0iY2hlY2tib3hfb25fbGlnaHQxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTQgLTQwKSI+DQoJPHJlY3QgaWQ9ImNoZWNrYm94X2xpZ2h0IiB4PSI5NCIgeT0iNDAiIGNsYXNzPSJzdDAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIvPg0KCTxnIGlkPSJSZWN0YW5nbGVfNDQ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NyA0MykiPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zLjItMS41aDExLjdjMi42LDAsNC43LDIuMSw0LjcsNC43djExLjdjMCwyLjYtMi4xLDQuNy00LjcsNC43SDMuMmMtMi42LDAtNC43LTIuMS00LjctNC43VjMuMg0KCQkJCUMtMS41LDAuNiwwLjYtMS41LDMuMi0xLjV6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTQuOCwxOS41SDMuMmMtMi42LDAtNC43LTIuMS00LjctNC43VjMuMmMwLTIuNiwyLjEtNC43LDQuNy00LjdoMTEuN2MyLjYsMCw0LjcsMi4xLDQuNyw0Ljd2MTEuNw0KCQkJCUMxOS41LDE3LjQsMTcuNCwxOS41LDE0LjgsMTkuNXogTTMuMiwwLjhjLTEuMywwLTIuMywxLTIuMywyLjN2MTEuN2MwLDEuMywxLDIuMywyLjMsMi4zaDExLjdjMS4zLDAsMi4zLTEsMi4zLTIuM1YzLjINCgkJCQljMC0xLjMtMS0yLjMtMi4zLTIuM0gzLjJ6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==");
      }
    }
    input {
      &:checked + .mc-field-checkbox__name-text {
        &:before {
          background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmVyc2lvbj0iMS4xIiBpZD0i0KHQu9C+0LlfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7fQ0KCS5zdDF7Y2xpcC1wYXRoOnVybCgjU1ZHSURfMl8pO30NCgkuc3Qye2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO2ZpbGw6IzU1MDBGRjt9DQo8L3N0eWxlPg0KPGcgaWQ9ImNoZWNrYm94X29uX2xpZ2h0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTQgLTQwKSI+DQoJPHJlY3QgaWQ9ImNoZWNrYm94X2xpZ2h0IiB4PSI5NCIgeT0iNDAiIGNsYXNzPSJzdDAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIvPg0KCTxnPg0KCQk8ZGVmcz4NCgkJCTxwYXRoIGlkPSJTVkdJRF8xXyIgZD0iTTEwMC4yLDQxLjVoMTEuNmMyLjYsMCw0LjcsMi4xLDQuNyw0Ljd2MTEuNmMwLDIuNi0yLjEsNC43LTQuNyw0LjdoLTExLjZjLTIuNiwwLTQuNy0yLjEtNC43LTQuN1Y0Ni4yDQoJCQkJQzk1LjUsNDMuNiw5Ny42LDQxLjUsMTAwLjIsNDEuNXoiLz4NCgkJPC9kZWZzPg0KCQk8Y2xpcFBhdGggaWQ9IlNWR0lEXzJfIj4NCgkJCTx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIiAgc3R5bGU9Im92ZXJmbG93OnZpc2libGU7Ii8+DQoJCTwvY2xpcFBhdGg+DQoJCTxnIGlkPSJNYXNrX0dyb3VwXzE5OSIgY2xhc3M9InN0MSI+DQoJCQk8cGF0aCBpZD0iY2hlY2tfb25fbGlnaHQiIGNsYXNzPSJzdDIiIGQ9Ik0xMTQuMiw0MS41SDk3LjhjLTEuMywwLTIuMywxLTIuMywyLjN2MTYuM2MwLDEuMywxLDIuMywyLjMsMi4zaDE2LjMNCgkJCQljMS4zLDAsMi4zLTEsMi4zLTIuM1Y0My44QzExNi41LDQyLjYsMTE1LjQsNDEuNSwxMTQuMiw0MS41eiBNMTAzLjcsNTcuOGwtNS44LTUuNmwxLjYtMS42bDQuMiw0bDguOS04LjVsMS42LDEuNkwxMDMuNyw1Ny44eiINCgkJCQkvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=");
        }
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
