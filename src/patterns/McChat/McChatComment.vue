<template>
  <div class="mc-chat-comment">
    <McGridRow :gutter-x="10" justify="left" align="middle" stretch>
      <McGridCol basis="54px" :span="12" :span-xl="2" class="mc-chat-comment__avatar">
        <McAvatar rounded size="m" :src="comment.user.avatar" />
      </McGridCol>
      <McGridCol :span="12" :span-xl="10" class="mc-chat-comment__content">
        <McCell>
          <McTitle slot="title" size="xs" uppercase>
            <McGridRow :gutter-x="10" justify="between" align="middle" :wrap="false">
              <McGridCol style="min-width: 30%">
                <McTitle size="xs" uppercase>
                  {{ comment.user.name ? comment.user.name : "Системный комментарий" }}
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
          <McTitle tag-name="p" size="m" v-html="filteredComment" />
        </McCell>
      </McGridCol>
    </McGridRow>
  </div>
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
export default {
  name: "McChatComment",
  components: {
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
    min-width: 54px;
  }

  &__content {
    max-width: calc(100% - 54px);
  }
}
</style>

<docs>
    ```jsx
    let comment = { content: 'Статус (recruiting): Присвоено', date: '2018-10-19 20:30', user_name: 'Имя пользователя', changer_name: 'Имя изменившего пользователя' }
    <div>
        <McChatComment :comment="comment" />
    </div>
    ```
</docs>
