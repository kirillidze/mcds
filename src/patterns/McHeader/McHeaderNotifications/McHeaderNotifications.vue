<template>
  <div class="mc-header-notifications">
    <div
      class="mc-header-notifications__item"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <McHeaderNotificationItem
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
import McHeaderNotificationItem from "../McHeaderNotifications/McHeaderNotificationsItem"
export default {
  name: "McHeaderNotifications",
  status: "ready",
  release: "0.0.1",
  components: {
    McHeaderNotificationItem,
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
  computed: {
    classes() {
      return {
        //[`el-logo--type-${this.type}`]: this.type,
      }
    },
  },

  methods: {
    handleClickAccept(id) {
      this.$emit("click-accept", id)
    },
    handleClickReject(id) {
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
    <McHeaderNotifications
            :notifications="notifications"
            notifications-text-accept="Принять"
            notifications-text-reject="Отклонить"
            @click-accept="(id) => eventTest('id: ' + id)"
            @click-reject="(id) => eventTest('id: ' + id)"
    />
  </div>
  ```
</docs>
