<template>
  <modal
    class="mc-modal"
    :class="classes"
    :name="name"
    scrollable
    adaptive
    height="auto"
    width="100%"
    :maxWidth="maxWidth"
    :click-to-close="clickToClose"
    @before-open="handleBeforeOpen"
    @before-close="handleBeforeClose"
    @closed="handleClosed"
    @opened="handleOpened"
  >
    <div class="mc-modal__inner">
      <div class="mc-modal__header" v-if="$slots.title">
        <div class="mc-modal__title">
          <!-- @slot Слот заголовка -->
          <slot name="title" />
        </div>
      </div>
      <div class="mc-modal__body">
        <!-- @slot Слот контента -->
        <slot />
      </div>
      <div class="mc-modal__control" v-if="$slots.footer">
        <!-- @slot Слот футера -->
        <slot name="footer" />
      </div>
      <button
        v-if="arrowVisible"
        type="button"
        class="mc-modal__btn-back"
        @click.prevent="handleBack"
      >
        <mc-svg-icon name="keyboard_backspace" class="mc-modal__icon-back" />
      </button>
      <button v-if="closeVisible" type="button" class="mc-modal__btn-close" @click.prevent="close">
        <mc-svg-icon class="mc-modal__icon-close" width="24" height="24" name="clear" />
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
  status: "ready",
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
    /**
     *  Нужно ли закрывать попап
     *  кликом вне окна
     */
    clickToClose: {
      type: Boolean,
      default: true,
    },
    /**
     *  Стрелка в хедере
     */
    arrowVisible: {
      type: Boolean,
      default: false,
    },
    /**
     *  Кастомное модальное окно
     */
    secondaryModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "mc-modal--arrow-visible": this.arrowVisible,
        "mc-modal--secondary": this.secondaryModal,
      }
    },
  },
  methods: {
    handleBeforeOpen(event) {
      /**
       * Событие перед открытием
       * @property {Object}
       */
      this.$emit("beforeOpen", event)
    },
    handleBeforeClose(event) {
      /**
       * Событие перед закрытием
       * @property {Object}
       */
      this.$emit("beforeClose", event)
    },
    handleOpened(event) {
      /**
       * Событие после открытия
       * @property {Object}
       */
      this.$emit("opened", event)
    },
    handleClosed(event) {
      /**
       * Событие после закрытия
       * @property {Object}
       */
      this.$emit("closed", event)
    },
    close() {
      this.$modal.hide(this.name)
    },
    handleBack(event) {
      this.$emit("back", event)
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
  $border-color: #dee1e9;
  $box-shadow-color: #20008c28;

  padding: 12px 0;

  &__btn-close {
    @include reset-btn();
    @include position(absolute, 17px 15px null null);
    @include interplay-link();
    padding: 5px;
    z-index: 1;
  }
  &__btn-back {
    @include reset-btn();
    @include position(absolute, 15px null null 15px);
    @include interplay-link();
    padding: 5px;
    z-index: 1;
  }

  &__icon-close {
    @include size($tappable-element-xs);
    transition: color $duration-quickly;
  }

  &.overlay-fade-enter-active,
  &.overlay-fade-leave-active {
    .mc-modal__inner {
      transition: all $duration-quickly;
      transform: translate3d(0, 0, 0);
    }
  }

  &.overlay-fade-enter,
  &.overlay-fade-leave-active {
    .mc-modal__inner {
      transform: translate3d(0, -20px, 0);
    }
  }

  &.mc-modal--arrow-visible {
    .mc-modal {
      &__header {
        padding-left: 35px;
      }
    }
  }

  &.mc-modal--secondary {
    .mc-modal {
      &__inner {
        border-radius: 32px;
        box-shadow: 0px 15px 30px $box-shadow-color;
        padding: 32px;
      }
      &__btn-close,
      &__btn-back {
        top: 27px;
      }
      &__btn-close {
        right: 32px;
      }
      &__btn-back {
        left: 32px;
      }
      &__header {
        padding-bottom: 9px;
        border-bottom: 2px solid $border-color;
        margin-bottom: 32px;
      }
      &__control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .mc-button {
          border-radius: 12px;
        }
      }
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
    padding-bottom: $space-s;
    position: relative;
    padding-right: 35px;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 0;
    color: hsl(0, 0%, 13%);
    font-family: $font-heading;
    font-size: $size-l;
    font-weight: 400;
    line-height: line-height(23, 20);
  }

  &__inner {
    position: relative;
    box-shadow: 0 6px 12px rgba(110, 110, 110, 0.61);
    padding: 21px 25px 25px 25px;
    background-color: $color-white;
    margin: 0 12px 0 12px;
    border-radius: $radius-l;
  }

  &__control {
    display: flex;
    justify-content: flex-end;
    padding-top: $space-m;
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
  <mc-button @click.prevent="$modal.show('testModal')">Open</mc-button>
  <mc-modal name="testModal">
    <template slot="title">Заголовок</template>
    Контент
  </mc-modal>
  ```
</docs>
