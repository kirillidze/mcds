<template>
  <section class="mc-status-select">
    <div class="mc-status-select__top">
      <h3 class="mc-status-select__title">
        {{ title }}
      </h3>
      <div class="mc-status-select__date" v-if="date">
        <!--<el-date class="mc-status-select__date-name" :value="date" />-->
      </div>
    </div>
    <div class="mc-status-select__select">
      <McFieldSelect
        :disabled="disabled"
        :background-color="backgroundColor"
        :avatar="avatar"
        :value="value"
        :options="selectItems"
        @input="handleSubmit"
        :searchable="false"
        open-direction="bottom"
      />
    </div>
  </section>
</template>

<script>
import McFieldSelect from "../elements/McFieldSelect"
export default {
  name: "McStatusSelect",
  components: { McFieldSelect },
  status: "deprecated",
  release: "1.0.0",
  props: {
    title: {},
    selectItems: {},
    value: {},
    avatar: {},
    backgroundColor: {},
    date: {},
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
    }
  },

  methods: {
    handleSubmit(value) {
      this.$emit("handleSubmit", value)
    },
  },
}
</script>

<style lang="scss">
.mc-status-select {
  $block-name: &;

  &__top {
    display: flex;
    flex-wrap: wrap;
    font-size: 0;
    line-height: 0;
    align-items: center;
    margin-bottom: 4px;
    padding-left: 8px;
    padding-right: 8px;
  }

  &__title {
    margin-top: 0;

    color: hsl(0, 0%, 13%);
    font-size: 13px;
    font-weight: 500;
    line-height: line-height(16, 13);
    text-transform: capitalize;
    margin-bottom: 2px;
    padding-right: 12px;
    margin-right: auto;
    flex: 0 0 auto;
    font-family: $font-heading-secondary;
  }

  &__date {
    margin-bottom: 1px;
    flex: 0 0 auto;
  }

  &__date-name {
    color: hsl(0, 0%, 13%);
    font-family: $font-heading-secondary;
    font-size: 10px;
    line-height: line-height(13, 10);
    font-weight: 500;
  }
}
</style>
