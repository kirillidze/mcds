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
    <McButton
      variation="gray-dark-link"
      slot="append"
      size="s-compact"
      @click.prevent="handleToggleClick"
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

export default {
  name: "McFieldPassword",
  components: { McButton, McSvgIcon, McFieldText },
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
