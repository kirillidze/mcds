<template>
  <mc-modal :name="name" @beforeOpen="beforeOpen" @closed="event => $emit('closed', event)">
    <slot name="title" slot="title"></slot>
    <form @submit.prevent="handleSubmit">
      <slot></slot>
    </form>
    <template slot="footer" v-if="!footerDisabled">
      <mc-button
        v-if="!btnDisabled"
        @click="$modal.hide(name)"
        size="middle"
        height="small"
        color="main"
      >
        {{ btnCancelText }}
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
        {{ btnSaveText }}
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
    btnSaveText: {
      type: String,
    },
    btnCancelText: {
      type: String,
    },
    btnDisabled: {
      type: Boolean,
      disabled: false,
    },
    submitDisabled: {
      type: Boolean,
      disabled: false,
    },
    footerDisabled: {
      type: Boolean,
      disabled: false,
    },
  },
  methods: {
    handleSubmit() {
      if (this.loading) return
      this.$emit("submit")
    },
    beforeOpen(event) {
      this.$emit("beforeOpen", event)
    },
  },
}
</script>

<style lang="scss">
.p-form-modal {
  $block-name: &;
}
</style>
