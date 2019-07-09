<template>
  <section class="mc-date">
    <slot name="prepend">
      <McSvgIcon name="event" size="xxs" />
    </slot>
    <time :datetime="momentDate.format()" class="mc-date__time">{{ formattedDate }}</time>
    <slot name="append" />
  </section>
</template>

<script>
import McSvgIcon from "./McSvgIcon"
import McTitle from "./McTitle"

export default {
  name: "McDate",
  status: "ready",
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
    fromFormat: {
      default: "YYYY-MM-DD HH:mm:ss",
    },
  },

  computed: {
    momentDate() {
      return this.$moment(this.value, this.fromFormat).locale("ru")
    },
    formattedDate() {
      return this.momentDate.calendar()
    },
  },
}
</script>

<style lang="scss">
.mc-date {
  $block-name: &;

  color: $black;
  font-size: 0;
  font-weight: $weight-normal;
  line-height: 0;
  text-transform: uppercase;

  &__time {
    color: $color-gray-darken;
    font-family: $font-heading;
    font-size: $size-s;
    line-height: line-height(16, 13);
    font-weight: $weight-medium;
    position: relative;
    bottom: 3px;
    margin: 0 4px;
  }
}
</style>

<docs>
    ```jsx

    <McDate value="2019-06-11T16:33:20+03:00"/>

    <br />

    <McDate value="2016-01-01T23:35:01" from-format="HH:mm:ss">
        <McSvgIcon slot="prepend" name="access_time" size="xxs"/>
        <McTitle size="s" slot="append">
            Дата
        </McTitle>
    </McDate>
    ```
</docs>
