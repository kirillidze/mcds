<template>
  <McFieldText
    :type="type"
    :value="value"
    @input="handleInput"
    :title="title"
    :disabled="disabled"
    :name="name"
    :placeholder="placeholder"
    :errors="errors"
  >
    <McTitle v-if="title" slot="header" :ellipsis="titleEllipsis" :level="4">{{ title }}</McTitle>
    <McButton
      variation="gray-dark-link"
      slot="append"
      size="s-compact"
      @click.prevent="handleToggleClick"
      default-tag="div"
    >
      <McSvgIcon slot="icon-append" :name="type === 'password' ? 'visibility' : 'visibility_off'" />
    </McButton>
    <slot name="footer" slot="footer" />
  </McFieldText>
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
        <McFieldPassword
                placeholder="Введите пароль"
                v-model="text"
                type="password"
                name="password"
        />
    </div>
    ```
</docs>
