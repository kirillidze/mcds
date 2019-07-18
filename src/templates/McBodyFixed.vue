<template>
  <div class="mc-body-fixed">
    <div class="mc-body-fixed__top">
      <slot name="top"></slot>
    </div>
    <div class="mc-body-fixed__mid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "McBodyFixed",
  computed: {
    classes() {
      return {
        // [`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
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
  }

  &__mid {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
