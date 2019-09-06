<template>
  <div class="mc-notification" :class="classes">
    <div class="mc-notification__left">
      <McSvgIcon :fill="background" name="baseline_warning"></McSvgIcon>
    </div>
    <div class="mc-notification__right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import McSvgIcon from "../elements/McSvgIcon"
import McTitle from "../elements/McTitle"
export default {
  name: "McNotification",
  components: { McSvgIcon, McTitle },
  status: "ready",
  release: "1.0.1",

  props: {
    /**
     * Бэкграунд
     */
    background: {
      type: String,
      default: "orange",
    },
  },

  computed: {
    classes() {
      return {
        [`mc-notification--background-${this.background}`]: this.background,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-notification {
  $block-name: &;

  display: flex;
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &__left {
    margin-right: 8px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &--background {
    @each $color, $value in $token-colors {
      &-#{$color} {
        background-color: rgba($value, 0.1);

        &:before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background-color: $value;
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McNotification >
      <McTitle
        :ellipsis="false"
        size="s"
      >
        Аккаунт не подключен к системе. Так бывает, когда YouTube отзывает доступ в целях безопасности,
        или когда пользователь сам отозвал доступ к аккаунту. Чтобы все было, как и раньше, войдите в аккаунт повторно.
      </McTitle>
    </McNotification>
  </div>

  ```
</docs>
