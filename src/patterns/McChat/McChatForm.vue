<template>
  <div class="channel-chat-form">
    <form @submit.prevent="handleSubmit" class="channel-chat-form__input-wrap">
      <McFieldText
        type="textarea"
        class="channel-chat-form__input"
        @input="value => $emit('input', value)"
        :value="value"
        :errors="errors.content"
        @keyup.ctrl.enter.native="handleSubmit"
        @keyup.shift.enter.native="handleSubmit"
      >
        <McAvatar
          slot="prepend"
          rounded
          class="channel-chat-form__avatar"
          size="xs"
          :src="user ? user.avatar : null"
        />
        <McButton
          variation="primary-link"
          slot="append"
          size="s-compact"
          @click.prevent="handleSubmit"
          :loading="loading"
          class="channel-chat-form__submit"
          type="submit"
        >
          <McSvgIcon slot="icon-append" name="send" />
        </McButton>
      </McFieldText>
    </form>
  </div>
</template>

<script>
import McAvatar from "../../elements/McAvatar/McAvatar"
import McSvgIcon from "../../elements/McSvgIcon"
import McButton from "../../elements/McButton"
import McFieldText from "../../elements/McField/McFieldText"
export default {
  name: "McChatForm",
  components: { McFieldText, McButton, McSvgIcon, McAvatar },
  props: {
    value: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
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
    textareaPlaceholder: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleSubmit() {
      this.$emit("submit")
    },
  },
}
</script>

<docs>
    ```jsx
    let text = ''
    <div>
        <McChatForm v-model="text" />
    </div>
    ```
</docs>
