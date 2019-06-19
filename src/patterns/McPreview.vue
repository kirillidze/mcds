<template>
  <section class="mc-preview">
    <div class="mc-preview__left">
      <slot name="left"></slot>
    </div>
    <div class="mc-preview__center">
      <div class="mc-preview__top">
        <slot name="top"></slot>
      </div>
      <div class="mc-preview__bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
    <div class="mc-preview__right">
      <slot name="right"></slot>
    </div>
  </section>
</template>

<script>
import McAvatar from "../elements/McAvatar/McAvatar"
import McTitle from "../elements/McTitle"
import McSvgIcon from "../elements/McSvgIcon"
export default {
  name: "McPreview",
  components: { McSvgIcon, McTitle, McAvatar },
  status: "ready",
  release: "1.0.0",
  props: {},
}
</script>

<style lang="scss">
.mc-preview {
  $block-name: &;

  @include reset-text-indents();
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;

  &__left {
    flex: 0 0 auto;
    margin-right: $space-s;

    &:empty {
      display: none;
    }
  }

  &__center {
    @include layout-flex-fix();
    flex: 1 1 auto;
    align-self: center;
  }

  &__top {
    &:empty {
      display: none;
    }
  }

  &__bottom {
    margin-top: $space-xxs;
    &:empty {
      display: none;
    }
  }

  &__right {
    flex: 0 0 auto;
    margin-left: $space-s;

    &:empty {
      display: none;
    }
  }
}
</style>

<docs>
  ```jsx
  <div style="max-width: 400px;">
    <McPreview>
        <McAvatar slot="left"/>
        <McTitle size="l" slot="top">Татьяна Владимирова Татьяна Владимирова Татьяна Владимирова</McTitle>
        <McTitle color="gray" size="m" slot="bottom">
            <McSvgIcon fill="rgb(61, 143, 65)" slot="icon-prepend" name="ready"/>
            ildar@mediacube.in
        </McTitle>
        <McAvatar size="xs" slot="right"/>
    </McPreview>

      <br>

    <McPreview>
        <McAvatar slot="left"/>
        <McTitle :ellipsis="false" size="l" slot="top">Татьяна Владимирова Татьяна Владимирова Татьяна Владимирова</McTitle>
        <McTitle color="gray" size="m" slot="bottom">
            <McSvgIcon fill="rgb(61, 143, 65)" slot="icon-prepend" name="ready"/>
            ildar@mediacube.in
        </McTitle>
        <McAvatar size="xs" slot="right"/>
    </McPreview>
      
      <br>
      
    <McPreview>
        <McAvatar size="s" slot="left"/>
        <McTitle size="m" slot="top">Татьяна Владимирова</McTitle>
        <McTitle uppercase color="gray" size="xs" slot="bottom">
            Татьяна Владимирова
        </McTitle>
        <McAvatar rounded size="xs" slot="right"/>
    </McPreview>

      <br>

    <McPreview>
        <McAvatar size="s" slot="left"/>
        <McTitle size="m" slot="top">Татьяна Владимирова</McTitle>
        <McAvatar size="s" slot="right"/>
    </McPreview>

      <br>

    <McPreview>
        <McAvatar size="s" slot="left"/>
        <McTitle size="m" slot="top">Татьяна Владимирова</McTitle>
        <McTitle uppercase color="gray" size="xs" slot="bottom">
            Татьяна Владимирова
        </McTitle>
    </McPreview>
  </div>
  ```
</docs>
