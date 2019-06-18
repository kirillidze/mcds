<template>
  <section class="mc-user">
    <div class="mc-user__avatar">
      <McAvatar :src="user.avatar" rounded />
    </div>
    <div class="mc-user__info">
      <div class="mc-user__name">
        <McTitle :level="3" size="l" ellipsis>{{ user.first_name }} {{ user.last_name }}</McTitle>
      </div>
      <div class="mc-user__email">{{ user.email }}</div>
    </div>
  </section>
</template>

<script>
import McAvatar from "../elements/McAvatar/McAvatar"
import McTitle from "../elements/McTitle"
export default {
  name: "McUser",
  components: { McTitle, McAvatar },
  status: "ready",
  release: "1.0.0",
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.mc-user {
  $block-name: &;

  @include reset-text-indents();
  font-family: $font-heading;
  padding: $space-s;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  &__avatar {
    margin-right: $space-s;
  }

  &__info {
    @include layout-flex-fix();
  }

  &__name {
    color: $color-text;
  }

  &__email {
    color: $color-gray;
    font-size: $size-m;
    line-height: $line-height-s;
    font-weight: $weight-medium;

    @include ellipsis();
  }
}
</style>

<docs>
  ```jsx
  let authUser = require('@/mocks/authUser').default;
  <div>
    <McUser :user="authUser"/>
  </div>
  ```
</docs>
