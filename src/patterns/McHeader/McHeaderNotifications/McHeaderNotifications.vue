<template>
  <div class="mc-header-notifications">
    <div
      class="mc-header-notifications__item"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <mc-header-notifications-item
        @click-accept="handleClickAccept"
        @click-reject="handleClickReject"
        :text-accept="notificationsTextAccept"
        :text-reject="notificationsTextReject"
        :notification="notification"
      />
    </div>
  </div>
</template>

<script>
import McHeaderNotificationsItem from "../McHeaderNotifications/McHeaderNotificationsItem"
export default {
  name: "McHeaderNotifications",
  status: "ready",
  release: "0.0.1",
  components: {
    McHeaderNotificationsItem,
  },
  props: {
    /**
     *  Уведомления
     *
     */
    notifications: {
      type: Array,
      default: null,
    },
    /**
     *  Тест кнопки подтверждения нотификации
     *
     */
    notificationsTextAccept: {
      type: String,
      default: null,
    },
    /**
     *  Тест кнопки отмены нотификации
     *
     */
    notificationsTextReject: {
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
.mc-header-notifications {
  $block-name: &;

  position: relative;

  &__item {
    &:nth-child(n + 2) {
      display: none;
    }
  }
}
</style>

<docs>
  ```jsx
  let notifications = require('@/mocks/notifications').default;
  let eventTest = (val) => alert(val)
  <div>
    <mc-header-notifications
      :notifications="notifications"
      notifications-text-accept="Принять"
      notifications-text-reject="Отклонить"
      @click-accept="id => eventTest(`id: ${id}`)"
      @click-reject="id => eventTest(`id: ${id}`)"
    />
  </div>
  ```
</docs>
