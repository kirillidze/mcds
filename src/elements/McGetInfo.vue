<template>
  <section class="mc-get-info">
    <div class="mc-get-info__btn" v-if="total === null">
      <slot></slot>
    </div>
    <div v-else class="mc-get-info__text">
      <slot name="answer"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "McGetInfo",
  status: "deprecated",
  release: "3.5.0",
  props: {
    total: {},
  },
  components: {},
}
</script>

<style lang="scss">
.mc-get-info {
  $block-name: &;
}
</style>
