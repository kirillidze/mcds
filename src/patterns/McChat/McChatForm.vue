<template>
  <div class="mc-chat-form">
    <form @submit.prevent="handleSubmit">
      <McFieldText
        name="chat-field"
        class="mc-chat-form__input"
        type="textarea-autosize"
        @input="handleInput"
        :value="value"
        :errors="errors.content"
        :placeholder="placeholder"
        @keyup.ctrl.enter.native="handleSubmit"
        @keyup.shift.enter.native="handleSubmit"
      >
        <McAvatar class="mc-chat-form__avatar" slot="prepend" rounded size="xs" :src="avatar" />
        <McButton
          class="mc-chat-form__btn"
          variation="primary-link"
          slot="append"
          size="s-compact"
          @click.prevent="handleSubmit"
          :loading="loading"
          type="submit"
        >
          <McSvgIcon slot="icon-append" name="send" />
        </McButton>
      </McFieldText>
    </form>
    <McSeparator indent-left="l" />
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
      this.$emit("input", value)
    },
    handleSubmit() {
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
        <McChatForm v-model="text" />
    </div>
    ```
</docs>
