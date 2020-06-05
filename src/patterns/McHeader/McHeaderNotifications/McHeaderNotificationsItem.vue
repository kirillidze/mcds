<template>
  <section class="mc-header-notifications-item">
    <div class="mc-header-notifications-item__inner">
      <div class="mc-header-notifications-item__text">
        {{ notification.title }} «{{ notification.name }}»
      </div>
      <div class="mc-header-notifications-item__controls">
        <mc-button @click="handleClickReject(notification.id)" variation="white-flat">
          {{ textReject }}
        </mc-button>
        <mc-button @click="handleClickAccept(notification.id)" variation="white">
          {{ textAccept }}
        </mc-button>
      </div>
    </div>
  </section>
</template>

<script>
import McButton from "../../../elements/McButton"
export default {
  name: "McHeaderNotificationsItem",
  components: { McButton },
  status: "ready",
  release: "0.0.1",
  props: {
    /**
     *  Уведомление
     *
     */
    notification: {
      type: Object,
      default: null,
    },
    /**
     *  Тест кнопки подтверждения нотификации
     *
     */
    textAccept: {
      type: String,
      default: null,
    },
    /**
     *  Тест кнопки отмены нотификации
     *
     */
    textReject: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleClickAccept(id) {
      /**
       * @property {Number}
       */
      this.$emit("click-accept", id)
    },
    handleClickReject(id) {
      /**
       * @property {Number}
       */
      this.$emit("click-reject", id)
    },
  },
}
</script>

<style lang="scss">
.mc-header-notifications-item {
  $block-name: &;

  color: $color-white;
  padding: $space-m / 2 $space-s;
  background-image: $gradient-notification;

  &__inner {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    max-width: $container-m;
    margin-left: auto;
    margin-right: auto;
  }

  &__text {
    @include ellipsis();
    margin-right: $space-s;
    flex: 1 1 auto;
    font-family: $font_heading;
    font-size: $size-m;
    line-height: $line-height-s;
    font-weight: $weight-medium;
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
    flex: 0 0 auto;
  }
}
</style>

<docs>
  ```jsx
  let notifications = require('@/mocks/notifications').default;
  let eventTest = (val) => alert(val)
  <div>
    <mc-header-notifications-item
      :notification="notifications[1]"
      textAccept="Принять"
      textReject="Отклонить"
      @click-accept="id => eventTest(`id: ${id}`)"
      @click-reject="id => eventTest(`id: ${id}`)"
    />
  </div>
  ```
</docs>
