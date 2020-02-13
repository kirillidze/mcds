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

    <div slot="bottom" class="mc-comment__text">
      <mc-title size="s" :ellipsis="false">{{ comment.reason }}</mc-title>
    </div>
  </mc-preview>
</template>

<script>
export default {
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
