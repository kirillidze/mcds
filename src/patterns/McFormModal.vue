<template>
  <mc-modal
    class="p-form-modal"
    :class="classes"
    :name="name"
    :max-width="maxWidth"
    :close-visible="closeVisible"
    @beforeOpen="event => $emit('beforeOpen', event)"
    @beforeClose="event => $emit('beforeClose', event)"
    @opened="event => $emit('opened', event)"
    @closed="event => $emit('closed', event)"
  >
    <slot name="title" slot="title"></slot>
    <form @submit.prevent="handleSubmit">
      <slot></slot>
    </form>
    <template v-if="visibleFooter" slot="footer">
      <mc-button
        v-if="!hideCancel"
        @click="$modal.hide(name)"
        size="middle"
        height="small"
        color="main"
        variation="gray-dark-invert"
      >
        {{ cancelText }}
      </mc-button>
      <mc-button
        design="button"
        size="middle"
        height="small"
        width="middle"
        @click.prevent="handleSubmit"
        :loading="loading"
        :disabled="submitDisabled"
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
  components: { McModal, McButton },
  status: "deprecated",
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
  },
  computed: {
    classes() {
      return {
        "p-form-modal--bottom-positioned": this.bottomPositioned,
      }
    },
  },
  methods: {
    handleSubmit() {
      if (this.loading) return
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
      }

      .mc-modal__inner {
        @media #{$media-query-xl-down} {
          margin: 0 !important;
          border-radius: 8px 8px 0 0;
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <McButton @click.prevent="$modal.show('testFormModal')">Open</McButton>
  <McFormModal name="testFormModal" cancel-text="Отмена" bottom-positioned submit-text="Сохранить">
    <template slot="title">Заголовок</template>
    Контент
  </McFormModal>
  ```
</docs>
