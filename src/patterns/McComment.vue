<template>
  <mc-preview class="mc-comment">
    <mc-avatar slot="left" :src="comment.avatar" size="s" lazy rounded />

    <div slot="top" class="mc-comment__name">
      <mc-title size="s" :ellipsis="false">{{ comment.name }}</mc-title>

      <mc-date
        date-size="xs"
        format="YYYY-MM-DD HH:mm"
        color="gray-dark"
        :ellipsis="false"
        :value="comment.date"
        :default-icon="false"
      />
    </div>

    <div slot="bottom" class="mc-comment__text" v-if="comment.reason">
      <mc-title size="s" :ellipsis="false">{{ comment.reason }}</mc-title>
    </div>
  </mc-preview>
</template>

<script>
import McTitle from "../elements/McTitle"
import McDate from "../elements/McDate"
import McAvatar from "../elements/McAvatar/McAvatar"
import McPreview from "../patterns/McPreview"
export default {
  components: { McTitle, McAvatar, McPreview, McDate },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.mc-comment {
  $block-name: &;

  &__name {
    .mc-title {
      width: auto;
      margin-right: $space-xs;
    }
  }

  &__text {
    padding: $space-s;
    margin-top: $space-xs;
    background-color: $color-hover-gray;
    border-radius: 0 8px 8px 8px;
  }
}
</style>
