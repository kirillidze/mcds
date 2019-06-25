<template>
  <div class="channel-chat-comment">
    <McGridRow :gutter-x="10" justify="left" align="middle" stretch>
      <McGridCol style="max-width: 54px">
        <McAvatar rounded size="m" :src="comment.user_avatar" />
      </McGridCol>
      <McGridCol>
        <McLines>
          <McTitle slot="title" size="xs" uppercase>
            <McGridRow :gutter-x="10" justify="between">
              <McGridCol>
                {{ comment.user_name ? comment.user_name : "Системный комментарий" }}
              </McGridCol>
              <McGridCol>
                {{ comment.date }}
              </McGridCol>
            </McGridRow>
          </McTitle>
          <McTitle v-if="comment.changer_name" size="xs" uppercase>
            {{ comment.changer_name }}
          </McTitle>
          <McTitle tag-name="p" size="m">
            {{ comment.content }}
          </McTitle>
        </McLines>
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
import McLines from "../McLines"
import McTitle from "../../elements/McTitle"
export default {
  name: "McChatComment",
  components: {
    McTitle,
    McLines,
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
}
</script>

<style lang="scss">
.channel-chat-comment {
  width: 100%;
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
