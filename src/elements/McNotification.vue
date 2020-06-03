<template>
  <div class="mc-notification" :class="classes">
    <div class="mc-notification__left">
      <mc-svg-icon :name="icon" />
    </div>
    <div class="mc-notification__right">
      <!-- @slot Информация справа от иконки -->
      <slot />
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
    /**
     * Иконка
     */
    icon: {
      type: String,
      default: "warning",
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
  padding: $space-xs 12px;
  border-radius: $radius-m;
  position: relative;
  overflow: hidden;

  &__left {
    margin-right: $space-xs;

    .mc-svg-icon svg {
      margin-top: 5px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .mc-title {
    & a {
      font-size: 13px;
      line-height: 1;
      text-decoration: none;
      color: $color-blue;
      &:hover {
        color: darken($color-blue, 10%);
      }
    }
  }

  &--background {
    @each $color, $value in $token-colors {
      &-#{$color} {
        background-color: rgba($value, 0.1);

        &:before {
          content: "";
          display: block;
          @include position(absolute, 0 null null 0);
          height: 100%;
          width: 4px;
          background-color: $value;
        }

        .mc-svg-icon {
          color: $value;
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <mc-notification background="red">
      <mc-title :ellipsis="false" size="s">
        Аккаунт не подключен к системе. Так бывает, когда YouTube отзывает доступ в целях безопасности,
        или когда пользователь сам отозвал доступ к аккаунту. Чтобы все было, как и раньше, войдите в аккаунт повторно.
      </mc-title>
    </mc-notification>
  </div>

  ```
</docs>
