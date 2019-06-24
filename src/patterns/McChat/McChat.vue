<template>
  <div class="mc-chat">
    <McChatForm :value="value" :input="handleInput" />
  </div>
</template>

<script>
import McChatForm from "./McChatForm"

export default {
  name: "McChat",
  components: { McChatForm },
  props: {
    value: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
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
    title: {
      type: String,
      default: null,
    },
    textareaPlaceholder: {
      type: String,
      default: null,
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    commentable: {
      type: Array,
    },
    commentableValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      sortDropdown: false,
    }
  },

  methods: {
    handleInput(value) {
      this.$emit("input", value)
    },
    handleSubmit() {
      this.$emit("submit")
    },
    handleCommentableChange(value) {
      this.$emit("commentableChange", value)
      this.sortDropdown = false
    },
  },
}
</script>

<docs>
    ```jsx
    let text = ''
    <div>
        <McChat v-model="text" />
    </div>
    ```
</docs>
