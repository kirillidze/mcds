<template>
  <div class="mc-chat-form">
    <form @submit.prevent="handleSubmit">
      <mc-field-text
        name="chat-field"
        class="mc-chat-form__input"
        type="textarea-autosize"
        @input="handleInput"
        :min-height="20"
        :value="value"
        :errors="errors.content"
        :placeholder="placeholder"
        @keyup.ctrl.enter.native="handleSubmit"
        @keyup.shift.enter.native="handleSubmit"
      >
        <mc-avatar class="mc-chat-form__avatar" slot="prepend" rounded size="s" :src="avatar" />
        <mc-button
          class="mc-chat-form__btn"
          variation="blue-link"
          slot="append"
          size="s-compact"
          @click.prevent="handleSubmit"
          :loading="loading"
          type="submit"
        >
          <mc-svg-icon slot="icon-append" name="send" />
        </mc-button>
      </mc-field-text>
    </form>
    <mc-separator indent-left="l" />
  </div>
</template>

<script>
import McAvatar from "../../elements/McAvatar/McAvatar"
import McSvgIcon from "../../elements/McSvgIcon"
import McButton from "../../elements/McButton"
import McFieldText from "../../elements/McField/McFieldText"
import McSeparator from "../../elements/McSeparator"

export default {
  name: "McChatForm",
  status: "ready",
  release: "1.0.0",
  components: { McSeparator, McFieldText, McButton, McSvgIcon, McAvatar },
  props: {
    value: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Object,
      default() {
        return {}
      },
    },
    placeholder: {
      type: String,
      default: null,
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
    handleSubmit() {
      /**
       * Событие по отправке
       */
      this.$emit("submit")
    },
  },
}
</script>

<style lang="scss">
.mc-chat-form {
  $block-name: &;

  .mc-field-text__input {
    border: none;
    padding-bottom: 0;
    padding-top: $space-s + $space-xxs;
    outline: none;
    line-height: line-height(18, 16);
  }

  &__input {
    margin-bottom: 0;
  }

  &__avatar,
  &__btn {
    align-self: flex-end;
  }
}
</style>

<docs>
    ```jsx
    let text = ''
    <div>
        <mc-chat-form v-model="text" />
    </div>
    ```
</docs>
