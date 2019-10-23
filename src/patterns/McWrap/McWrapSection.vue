<template>
  <div class="mc-wrap-section">
    <div class="mc-wrap-section__head">
      <div class="mc-wrap-section__left">
        <slot name="left">
          <McTitle size="l">
            {{ title }}
          </McTitle>
        </slot>
      </div>
      <div class="mc-wrap-section__right" v-if="$slots.right">
        <slot name="right" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import McTitle from "../../elements/McTitle"
import McButton from "../../elements/McButton"
import McSvgIcon from "../../elements/McSvgIcon"

export default {
  name: "McWrapSection",
  components: {
    McTitle,
    McButton,
    McSvgIcon,
  },
  status: "ready",
  release: "1.0.0",
  props: {
    title: {
      type: String,
    },
  },
}
</script>

<style lang="scss">
.mc-wrap-section {
  $block-name: &;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $size-m;
  }

  &__left {
    min-width: 0;
    margin-right: $space-s;
    .mc-title {
      line-height: $line-height-s;
      @media #{$media-query-xs} {
        font-size: $size-ll;
      }
    }
  }

  &__right {
    @media #{$media-query-s-down} {
      .mc-button__text {
        display: none;
      }
      .mc-svg-icon {
        margin: 0 !important;
      }
    }
  }
}
</style>

<docs>
```jsx
    <div>
        <mc-wrap-section title="Заголовок">
            <mc-button slot="right" size="m" variation="blue-flat">
                Добавить
                <mc-svg-icon slot="icon-prepend" name="add" fill="rgb(62, 132, 244)"/>
            </mc-button>

            <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda commodi culpa fugiat. Accusantium alias assumenda blanditiis dignissimos ducimus eius esse est excepturi fugiat, fugit illum itaque iure laborum maxime mollitia natus nemo odit officia officiis perferendis perspiciatis provident quos, reiciendis repellendus repudiandae saepe sunt suscipit, tempore tenetur voluptate voluptatibus!
            </span>
        </mc-wrap-section>
    </div>
```
</docs>
