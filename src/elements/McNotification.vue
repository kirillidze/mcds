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
    /**
     *  Дизайн:
     *  `default,new`
     */
    variation: {
      type: String,
      default: "default",
    },
  },

  computed: {
    classes() {
      return {
        [`mc-notification--background-${this.background}`]: this.background,
        [`mc-notification--variation-${this.variation}`]: this.variation,
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
  position: relative;
  overflow: hidden;
  padding: $space-xs 12px;
  &__left {
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
          background-color: $value;
        }

        .mc-svg-icon {
          color: $value;
        }
      }
    }
  }
  &.mc-notification {
    &--variation-default {
      border-radius: $radius-m;
      &:before {
        width: 4px;
      }
      .mc-notification {
        &__left {
          margin-right: $space-xs;
        }
      }
    }
    &--variation-new {
      padding-top: 16px;
      padding-bottom: 16px;
      border-radius: 12px;
      &:before {
        width: 12px;
      }
      .mc-notification {
        &__left {
          margin-left: 12px;
          margin-right: 12px;
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
