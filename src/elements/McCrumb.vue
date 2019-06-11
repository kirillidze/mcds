<template>
  <section class="mc-crumb">
    <McSvgIcon v-if="icon" :width="16" :height="16" class="mc-crumb__icon" :name="icon" />
    <ul class="mc-crumb__list">
      <li class="mc-crumb__list-item">
        <slot></slot>
      </li>
    </ul>
  </section>
</template>

<script>
import McSvgIcon from "./McSvgIcon"
export default {
  name: "McCrumb",
  status: "deprecated",
  release: "1.0.0",
  components: { McSvgIcon },

  props: {
    icon: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.mc-crumb {
  $block-name: &;

  color: hsl(0, 0%, 13%);
  font-size: 13px;
  font-weight: 500;
  line-height: line-height(16, 13);
  font-family: $font-heading-secondary;
  display: flex;
  flex-wrap: nowrap;

  &__icon {
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
    margin-right: 4px;
    fill: $color-black;
    font-size: 16px;
    position: relative;
    //top: -1px;
  }

  &__list {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    list-style: none;
    //margin-right: -4px;
  }

  &__list-item {
    display: inline;
    //margin-right: 4px;

    &:not(:last-child) {
      &::after {
        content: ",";
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <McCrumb icon="insert_emoticon">
      Владилен
    </McCrumb>
  </div>
  ```
</docs>
