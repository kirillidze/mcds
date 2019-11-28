<template>
  <div class="mc-chat">
    <McTitle v-if="!!title" size="s">
      {{ title }}
    </McTitle>
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
      <div class="mc-chat__comment" v-for="comment in sortedComments" :key="comment.key">
        <McChatComment :music="music" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import McChatForm from "./McChatForm"
import McChatComment from "./McChatComment"
import McChatSource from "./McChatSource"
import McTitle from "../../elements/McTitle"

import _sortBy from "lodash/sortBy"
import _reverse from "lodash/reverse"

export default {
  name: "McChat",
  components: { McTitle, McChatSource, McChatComment, McChatForm },
  props: {
    value: {
      type: String,
    },
    comments: {
      type: Array,
      default() {
        return []
      },
    },
    music: {
      type: Boolean,
      default: false,
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
      default: null,
    },
  },

  computed: {
    sortedComments() {
      return _reverse(_sortBy(this.comments, this.handleSort))
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
    handleSort(comment) {
      return this.$moment ? this.$moment(comment.date) : Date.parse(comment.date)
    },
  },
}
</script>

<style lang="scss">
.mc-chat {
  $block-name: &;
  padding: $space-xs;
  border-top: 1px solid $color-outline-gray;

  &__source {
    margin-bottom: $space-xs;
  }
  &__comment {
    margin-top: $space-m;
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
    { content: 'Статус (recruiting): Присвоено', date: '2018-10-19 20:30',
    user: { name: 'Имя пользователя', avatar: 'https://lorempixel.com/640/480/?64646' },
    by_user: { name: 'Имя изменившего пользователя' }, },
    { content: 'Статус (recruiting): Отмена', date: '2014-12-19 10:22', user: { name: 'пользователя Имя' }, color: 'red' },
    ]
    let input = value => {
    text = value
    }
    let sourceInput = value => {
    source = value
    }
    let submit = () => {
    comments.push({ content: text, date: new Date().toString(), user: { name: 'Тест' }, color: 'blue',})
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
