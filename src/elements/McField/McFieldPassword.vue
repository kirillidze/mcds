<template>
  <mc-field-text
    :type="type"
    :value="value"
    :title="title"
    :disabled="disabled"
    :name="name"
    :placeholder="placeholder"
    :errors="errors"
    @input="handleInput"
  >
    <!-- @slot Слот заголовка -->
    <slot name="header" slot="header">
      <mc-title v-if="title" :ellipsis="titleEllipsis" :level="4">{{ title }}</mc-title>
    </slot>
    <mc-button
      variation="gray-dark-link"
      slot="append"
      size="s-compact"
      default-tag="div"
      @click.prevent="handleToggleClick"
    >
      <mc-svg-icon
        slot="icon-append"
        :name="type === 'password' ? 'visibility' : 'visibility_off'"
      />
    </mc-button>
    <!-- @slot Слот доп. текста под инпутом -->
    <slot name="footer" slot="footer" />
  </mc-field-text>
</template>

<script>
import McFieldText from "./McFieldText"
import McSvgIcon from "../McSvgIcon"
import McButton from "../McButton"
import McTitle from "../McTitle"

export default {
  name: "McFieldPassword",
  components: { McButton, McSvgIcon, McFieldText, McTitle },
  status: "ready",
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
     *  Вспомогательный текст в конце поля:
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
     *  Title ellipsis
     *
     */
    titleEllipsis: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      type: "password",
    }
  },
  methods: {
    handleToggleClick() {
      this.type = this.type === "password" ? "text" : "password"
    },
    handleInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>

<docs>
    ```jsx
    let text = 'lalala'
    <div style="max-width: 700px;">
        <mc-field-password
            title="Заголовок"
            placeholder="Введите пароль"
            v-model="text"
            type="password"
            name="password"
        />
        <mc-field-password
            class="mt-s"
            placeholder="Введите пароль"
            v-model="text"
            type="password"
            name="password"
        >
            <mc-title slot="header" color="blue">
                Хедер
            </mc-title>
            <mc-title slot="footer" color="red">
                Футер
            </mc-title>
        </mc-field-password>
    </div>
    ```
</docs>
