<template>
  <McPreview class="mc-chat-comment">
    <McAvatar
      class="mc-chat-comment__avatar"
      rounded
      size="s"
      :src="comment.user ? comment.user.avatar : null"
      slot="left"
    />

    <McCell slot="top">
      <McTitle slot="title" size="xs" uppercase>
        <McGridRow :gutter-x="10" justify="between" align="middle" :wrap="false">
          <McGridCol style="min-width: 30%">
            <McTitle size="xs" uppercase>
              {{ comment.user ? comment.user.name : "Системный комментарий" }}
            </McTitle>
          </McGridCol>
          <McGridCol>
            <McDate
              :value="comment.date"
              date-size="xs"
              :default-icon="false"
              format="YYYY-MM-DD HH:mm"
            />
          </McGridCol>
        </McGridRow>
      </McTitle>
      <McTitle v-if="comment.by_user" size="xs" uppercase>
        {{ comment.by_user.name }}
      </McTitle>
    </McCell>

    <McTitle
      class="mc-chat-comment__content"
      slot="bottom"
      tag-name="p"
      size="m"
      :color="comment.color"
      v-html="filteredComment"
    />
  </McPreview>
</template>

<script>
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
  },
  computed: {
    filteredComment() {
      let nl2br = this.$options.filters.nl2br
      return nl2br ? nl2br(this.comment.content) : this.comment.content
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
}
</style>

<docs>
    ```jsx
    let comment = { content: 'Статус (recruiting): Присвоено', date: '2018-10-19 20:30', user_name: 'Имя пользователя', changer_name: 'Имя изменившего пользователя', color: 'primary' }
    <div>
        <McChatComment :comment="comment" />
    </div>
    ```
</docs>
