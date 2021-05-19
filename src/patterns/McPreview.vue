<template>
  <section class="mc-preview">
    <div class="mc-preview__left">
      <!-- @slot Слот слева -->
      <slot name="left" />
    </div>
    <div class="mc-preview__center">
      <div class="mc-preview__top">
        <!-- @slot Слот сверху -->
        <slot name="top" />
      </div>
      <div class="mc-preview__bottom">
        <!-- @slot Слот внизу -->
        <slot name="bottom" />
      </div>
    </div>
    <div class="mc-preview__right">
      <!-- @slot Слот справа -->
      <slot name="right" />
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
    margin-right: $space-m / 2;

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
    <mc-preview>
        <mc-avatar slot="left"/>
        <mc-title size="l" slot="top">Татьяна Владимирова Татьяна Владимирова Татьяна Владимирова</mc-title>
        <mc-title color="gray" slot="bottom">
            <mc-svg-icon fill="rgb(61, 143, 65)" slot="icon-prepend" name="ready"/>
            ildar@mediacube.in
        </mc-title>
        <mc-avatar size="xs" slot="right"/>
    </mc-preview>

      <br>

    <mc-preview>
        <mc-avatar slot="left"/>
        <mc-title :ellipsis="false" size="l" slot="top">
            Татьяна Владимирова Татьяна Владимирова Татьяна Владимирова
        </mc-title>
        <mc-title color="gray" slot="bottom">
            <mc-svg-icon fill="rgb(61, 143, 65)" slot="icon-prepend" name="ready"/>
            ildar@mediacube.in
        </mc-title>
        <mc-avatar size="xs" slot="right"/>
    </mc-preview>
      
      <br>
      
    <mc-preview>
        <mc-avatar size="s" slot="left"/>
        <mc-title slot="top">Татьяна Владимирова</mc-title>
        <mc-title uppercase color="gray" size="xs" slot="bottom">
            Татьяна Владимирова
        </mc-title>
        <mc-avatar rounded size="xs" slot="right"/>
    </mc-preview>

      <br>

    <mc-preview>
        <mc-avatar size="s" slot="left"/>
        <mc-title slot="top">Татьяна Владимирова</mc-title>
        <mc-avatar size="s" slot="right"/>
    </mc-preview>

      <br>

    <mc-preview>
        <mc-avatar size="s" slot="left"/>
        <mc-title slot="top">Татьяна Владимирова</mc-title>
        <mc-title uppercase color="gray" size="xs" slot="bottom">
            Татьяна Владимирова
        </mc-title>
    </mc-preview>
  </div>
  ```
</docs>
