<template>
  <section class="mc-date">
    <slot name="prepend">
      <McSvgIcon v-if="defaultIcon" name="event" :size="iconSize" />
    </slot>
    <time :datetime="momentDate" class="mc-date__time">
      <McTitle :size="dateSize" :ellipsis="ellipsis" :uppercase="uppercase">
        {{ formattedDate }}
      </McTitle>
    </time>
    <slot name="append" />
  </section>
</template>

<script>
import McSvgIcon from "./McSvgIcon"
import McTitle from "./McTitle"

export default {
  name: "McDate",
  status: "deprecated",
  release: "1.0.0",

  components: {
    McSvgIcon,
    McTitle,
  },

  props: {
    /**
     *  Значение
     */
    value: {
      type: String,
      default: null,
    },

    /**
     *  Формат даты
     */
    format: {
      default: "DD.MM.YYYY",
    },

    /**
     *  Отображение иконки по умолчанию
     */
    defaultIcon: {
      type: Boolean,
      default: true,
    },

    /**
     *  Размер иконки по умолчанию
     */
    iconSize: {
      type: String,
      default: "xxs",
    },

    /**
     *  Размер даты
     */
    dateSize: {
      type: String,
      default: "s",
    },

    /**
     *  Перенос строк
     */
    ellipsis: {
      type: Boolean,
      default: true,
    },

    /**
     *  Заглавные буквы
     */
    uppercase: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    momentDate() {
      if (this.$moment == null) return null
      let locale = this.$i18n ? this.$i18n.locale : "ru"
      return this.$moment(this.value).locale(locale)
    },
    formattedDate() {
      if (this.momentDate == null) return this.value
      return this.momentDate.format(this.format)
    },
  },
}
</script>

<style lang="scss">
.mc-date {
  $block-name: &;

  display: flex;
  align-items: center;
  color: $color-black;
  font-size: 0;
  font-weight: $weight-normal;
  line-height: 0;

  .mc-svg-icon {
    margin-right: $space-xxs;
  }

  &__time {
    color: $color-gray-dark;
    font-family: $font-heading;
    line-height: line-height(16, 13);
    font-weight: $weight-medium;
    margin-left: 0;
  }
}
</style>

<docs>
    ```jsx

    <McDate value="2019-06-11T16:33:20+03:00"/>

    <br />

    <McDate value="2016-01-01T23:35:01" format="HH:mm:ss">
        <McSvgIcon slot="prepend" name="access_time" size="xxs"/>
        <McTitle size="s" slot="append">
            Дата
        </McTitle>
    </McDate>
    ```
</docs>
