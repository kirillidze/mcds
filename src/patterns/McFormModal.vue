<template>
  <mc-modal
    class="p-form-modal"
    :class="classes"
    :name="name"
    :max-width="maxWidth"
    :close-visible="closeVisible"
    :click-to-close="clickToClose"
    :arrow-visible="arrowVisible"
    :secondary-modal="secondaryModal"
    @beforeOpen="event => $emit('beforeOpen', event)"
    @beforeClose="event => $emit('beforeClose', event)"
    @opened="event => $emit('opened', event)"
    @closed="event => $emit('closed', event)"
    @back="event => $emit('handleBack', event)"
  >
    <!-- @slot Слот заголовка -->
    <slot name="title" slot="title" />
    <form @submit.prevent="handleSubmit">
      <!-- @slot Слот контента -->
      <slot />
    </form>
    <template v-if="visibleFooter" slot="footer">
      <mc-button v-if="!hideCancel" :variation="btnLeftVariation" @click="$modal.hide(name)">
        {{ cancelText }}
      </mc-button>
      <mc-button
        :variation="btnRightVariation"
        :loading="loading"
        :disabled="submitDisabled"
        @click.prevent="handleSubmit"
      >
        {{ submitText }}
      </mc-button>
    </template>
  </mc-modal>
</template>

<script>
import McButton from "../elements/McButton"
import McModal from "./McModal"
export default {
  name: "McFormModal",
  components: {
    McModal,
    McButton,
  },
  status: "ready",
  release: "1.0.0",
  props: {
    name: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    cancelText: {
      type: String,
    },
    hideCancel: {
      type: Boolean,
      disabled: false,
    },
    submitDisabled: {
      type: Boolean,
      disabled: false,
    },
    submitText: {
      type: String,
    },
    visibleFooter: {
      type: Boolean,
      default: true,
    },
    bottomPositioned: {
      type: Boolean,
      default: false,
    },
    closeVisible: {
      type: Boolean,
      default: true,
    },
    maxWidth: {
      type: Number,
      default: 510,
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
     *  Кастомное модальное окно
     */
    secondaryModal: {
      type: Boolean,
      default: false,
    },
    /**
     *  Стрелка в хедере
     */
    arrowVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "p-form-modal--bottom-positioned": this.bottomPositioned,
      }
    },
    btnRightVariation() {
      return this.secondaryModal ? "light-effect" : "blue"
    },
    btnLeftVariation() {
      return this.secondaryModal ? "secondary-purple-link" : "gray-dark-invert"
    },
  },
  methods: {
    handleSubmit() {
      if (this.loading || this.submitDisabled) return
      this.$emit("submit")
    },
  },
}
</script>

<style lang="scss">
.p-form-modal {
  $block-name: &;

  &--bottom-positioned.mc-modal.v--modal-overlay {
    .v--modal-box {
      @media #{$media-query-xl-down} {
        position: absolute;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: 100vh !important;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .mc-modal__inner {
        overflow: auto;
        @media #{$media-query-xl-down} {
          margin: 0 !important;
          border-radius: $space-xs $space-xs 0 0;
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <mc-button @click.prevent="$modal.show('testFormModal')">Open</mc-button>
  <mc-form-modal name="testFormModal" cancel-text="Отмена" bottom-positioned submit-text="Сохранить">
    <template slot="title">Заголовок</template>
    Контент
  </mc-form-modal>
  ```
</docs>
