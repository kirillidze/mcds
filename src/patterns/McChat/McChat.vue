<template>
  <div class="mc-chat">
    <div class="mc-chat__source" v-if="sources.length">
      <McChatSource :sources="sources" :value="source" @input="handleSourceInput" />
    </div>
    <div class="mc-chat__form" v-if="showInput">
      <McChatForm
        :value="value"
        :loading="loading"
        :errors="errors"
        :avatar="avatar"
        :placeholder="placeholder"
        @input="handleInput"
        @submit="handleSubmit"
      />
    </div>
    <div class="mc-chat__comments" v-if="comments.length">
      <div class="mc-chat__comment" v-for="comment in comments" :key="comment.key">
        <McChatComment :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import McChatForm from "./McChatForm"
import McChatComment from "./McChatComment"
import McChatSource from "./McChatSource"

export default {
  name: "McChat",
  components: { McChatSource, McChatComment, McChatForm },
  props: {
    value: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default() {
        return []
      },
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
    title: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    sources: {
      type: Array,
      default() {
        return []
      },
    },
    source: {
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
    handleSourceInput(value) {
      this.$emit("sourceInput", value)
    },
  },
}
</script>

<style lang="scss">
.mc-chat {
  &__source {
    margin-bottom: 10px;
  }
  &__comment {
    margin-top: 10px;
  }
}
</style>

<docs>
    ```jsx
    let text = ''
    let sources = [
        { name: 'Источник 1', value: '1' },
        { name: 'Другой чат', value: '2' },
    ]
    let source = '1';
    let comments = [
    { content: 'Статус (recruiting): Присвоено', date: '2018-10-19 20:30', user_name: 'Имя пользователя', changer_name:
    'Имя изменившего пользователя' },
    { content: 'Статус (recruiting): Отмена', date: '2014-12-19 10:22', user_name: 'пользователя Имя ' },
    ]
    let input = value => {
    text = value
    }
    let sourceInput = value => {
    source = value
    }
    let submit = () => {
    comments.push({ content: text, date: '2014-12-19 10:22', user_name: 'Тест' })
    text = ''
    }
    <div>
        <McChat
                style="width: 500px"
                :value="text"
                @input="input"
                :comments="comments"
                @submit="submit"
                :sources="sources"
                :source="source"
                @sourceInput="sourceInput"
        />
    </div>
    ```
</docs>
