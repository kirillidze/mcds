<template>
  <mc-preview class="mc-chat-comment">
    <mc-avatar
      class="mc-chat-comment__avatar"
      rounded
      size="xs"
      :src="comment.user ? comment.user.avatar : null"
      slot="left"
    />

    <mc-cell slot="top">
      <mc-title slot="title" size="xs">
        <mc-grid-row :gutter-x="10" justify="between" align="middle">
          <mc-grid-col :span="12">
            <mc-date
              :value="comment.date"
              date-size="xs"
              color="666"
              :default-icon="false"
              format="YYYY-MM-DD HH:mm"
            />
          </mc-grid-col>
          <mc-grid-col :span="12" style="min-width: 30%">
            <mc-title size="s" line-height="s">
              {{ computedName }}
            </mc-title>
          </mc-grid-col>
        </mc-grid-row>
      </mc-title>
      <mc-title v-if="comment.by_user" size="xs" uppercase>
        {{ comment.by_user.name }}
      </mc-title>
    </mc-cell>

    <template slot="bottom">
      <mc-title
        class="mc-chat-comment__content"
        tag-name="p"
        size="s"
        line-height="s"
        :color="comment.color"
        v-html="filteredComment"
        :ellipsis="false"
      />

      <mc-title v-if="comment.reason" class="mt-xxs" size="s" line-height="s" :ellipsis="false">
        {{ comment.reason }}
      </mc-title>
    </template>
  </mc-preview>
</template>

<script>
import _has from "lodash/has"
import McAvatar from "../../elements/McAvatar/McAvatar"
import McSvgIcon from "../../elements/McSvgIcon"
import McButton from "../../elements/McButton"
import McFieldText from "../../elements/McField/McFieldText"
import McGridRow from "../McGrid/McGridRow"
import McGridCol from "../McGrid/McGridCol"
import McCell from "../McCells/McCell"
import McTitle from "../../elements/McTitle"
import McDate from "../../elements/McDate"
import McPreview from "../McPreview"
export default {
  name: "McChatComment",
  status: "ready",
  release: "1.0.0",
  components: {
    McPreview,
    McDate,
    McTitle,
    McCell,
    McGridCol,
    McGridRow,
    McFieldText,
    McButton,
    McSvgIcon,
    McAvatar,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    defaultUserName: {
      type: String,
      default: "System comment",
    },
  },
  computed: {
    filteredComment() {
      let nl2br = this.$options.filters.nl2br
      return nl2br ? nl2br(this.commentWithLinks) : this.commentWithLinks
    },
    computedName() {
      return _has(this.comment, ["user", "name"]) ? this.comment.user.name : this.defaultUserName
    },
    commentWithLinks() {
      const regExp = /((http|https):\/\/)?(([0-9a-zA-Zа-яА-Я.-]*)\.([a-zA-Zа-яА-Я]{2,}).*)/gi
      return this.comment.content.replace(regExp, match => {
        const url = /^http/.test(match) ? match : `http://${match}`
        return `<a class="mc-chat-comment__link" href='${url}' target="_blank">${match.trim()}</a>`
      })
    },
  },
}
</script>

<style lang="scss">
.mc-chat-comment {
  $block-name: &;

  width: 100%;

  &__avatar {
    margin-left: $space-xs;
  }

  &__content {
    display: block;
  }

  &__link {
    color: $color-blue;
    &:hover,
    &:focus {
      color: darken($color-blue, 12%);
    }

    &:active {
      color: darken($color-blue, 16%);
    }
  }
}
</style>

<docs>
  ```jsx
  let comment = { content: 'Статус (recruiting): Присвоено', date: '2018-10-19 20:30', user_name: 'Имя пользователя', changer_name: 'Имя изменившего пользователя', color: 'blue', reason: 'всё резонно' }
  <div>
    <mc-chat-comment :comment="comment" />
  </div>
  ```
</docs>
