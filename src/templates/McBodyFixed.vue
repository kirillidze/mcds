<template>
  <div class="mc-body-fixed">
    <div class="mc-body-fixed__top">
      <!-- @slot Слот шапки -->
      <slot name="top" />
    </div>
    <div class="mc-body-fixed__mid">
      <!-- @slot Слот контента -->
      <slot />
    </div>
  </div>
</template>

<script>
/**
 * Нужен для вписания контента
 * в оставшееся свободное пространство страницы браузера.
 * Чаще всего используется для таблиц.
 */
export default {
  name: "McBodyFixed",
  status: "ready",
  release: "1.0.0",
}
</script>

<style lang="scss">
.mc-body-fixed {
  $block-name: &;

  @include position(absolute, 0);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  background-color: $color-white;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    transition: background 0.3s;
  }
  ::-webkit-scrollbar-track {
    //background: rgba(0, 0, 0, 0.1);
    //border: 1px solid #dcdcdc;
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(240, 4%, 91%);
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #c1c1c1;
  }
  ::-webkit-scrollbar-thumb:active {
  }

  &__top,
  &__mid {
    &:empty {
      display: none;
    }
  }

  &__top {
    background-color: $color-white;
    flex-shrink: 0;
    margin-left: $space-s;
    margin-right: $space-s;
  }

  &__mid {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-left: $space-s;
    margin-right: $space-s;
    margin-bottom: $space-s;
  }
}
</style>
