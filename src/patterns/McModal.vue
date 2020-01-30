<template>
  <modal
    class="mc-modal"
    :name="name"
    :scrollable="true"
    :adaptive="true"
    height="auto"
    width="100%"
    :maxWidth="maxWidth"
    @before-open="event => $emit('beforeOpen', event)"
    @before-close="event => $emit('beforeClose', event)"
    @closed="event => $emit('closed', event)"
    @opened="event => $emit('opened', event)"
  >
    <div class="mc-modal__inner">
      <div class="mc-modal__header" v-if="$slots.title">
        <div class="mc-modal__title">
          <slot name="title"></slot>
        </div>
      </div>
      <div class="mc-modal__body">
        <slot></slot>
      </div>
      <div class="mc-modal__control" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
      <button v-if="closeVisible" type="button" class="mc-modal__btn-close" @click.prevent="close">
        <McSvgIcon class="mc-modal__icon-close" width="24" height="24" name="clear" />
      </button>
    </div>
  </modal>
</template>

<script>
import McSvgIcon from "../elements/McSvgIcon"
import McButton from "../elements/McButton"
export default {
  name: "McModal",
  components: { McButton, McSvgIcon },
  status: "deprecated",
  release: "1.0.0",
  props: {
    name: {
      type: String,
    },
    maxWidth: {
      type: Number,
      default: 510,
    },
    closeVisible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      this.$modal.hide(this.name)
    },
  },
}
</script>

<style lang="scss">
.v--modal-block-scroll {
  width: 100%;
}

.mc-modal {
  $block-name: &;

  padding-top: 12px;
  padding-bottom: 12px;

  &__btn-close {
    @include reset-btn();
    padding: 5px;
    position: absolute;
    right: 15px;
    top: 17px;
    z-index: 1;

    @include interplay-link();
  }

  &__icon-close {
    width: 24px;
    height: 24px;
    transition: color $duration-quickly;
  }

  &.overlay-fade-enter-active,
  &.overlay-fade-leave-active {
    .mc-modal__inner {
      transition: all 0.15s;
      transform: translate3d(0, 0, 0);
    }
  }

  &.overlay-fade-enter,
  &.overlay-fade-leave-active {
    .mc-modal__inner {
      transform: translate3d(0, -20px, 0);
    }
  }

  &.v--modal-overlay {
    z-index: $z-index-overlay;
    background-color: fade-out($color-black, 0.5);

    .v--modal-background-click {
      padding-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .v--modal-box {
      overflow: visible;
      top: auto !important;
      left: auto !important;
    }

    &.scrollable {
      .v--modal-box {
        margin-bottom: 0;
      }
    }
  }

  .v--modal {
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
  }

  &__header {
    padding-bottom: 16px;
    position: relative;
    padding-right: 35px;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;
    color: hsl(0, 0%, 13%);
    font-family: $font-heading;
    font-size: 20px;
    font-weight: 400;
    line-height: line-height(23, 20);
  }

  &__inner {
    position: relative;
    box-shadow: 0 6px 12px rgba(110, 110, 110, 0.61);
    padding: 21px 25px 25px 25px;
    background-color: $color-white;
    margin: 0;
    border-radius: 8px;
    margin-left: 12px;
    margin-right: 12px;
  }

  &__control {
    display: flex;
    justify-content: flex-end;
    padding-top: 24px;
    margin-left: -3px;
    margin-right: -3px;

    &:empty {
      display: none;
    }

    .mc-button {
      margin-left: 3px;
      margin-right: 3px;
    }
  }
}
</style>

<docs>
  ```jsx
  <McButton @click.prevent="$modal.show('testModal')">Open</McButton>
  <McModal name="testModal">
    <template slot="title">Заголовок</template>
    Контент
  </McModal>
  ```
</docs>
