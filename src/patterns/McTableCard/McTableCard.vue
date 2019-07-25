<template>
  <div class="mc-table-card" :style="{ marginLeft: ml }">
    <div class="mc-table-card__header">
      <slot name="header"></slot>
    </div>
    <div class="mc-table-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import McTableCardHeader from "./McTableCardHeader"
import McTableCardBody from "./McTableCardBody"
import McButton from "../../elements/McButton"
export default {
  name: "McTableCard",
  components: { McButton, McTableCardHeader, McTableCardBody },
  props: {
    ml: {
      type: String,
      default: "251px",
    },
  },
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
.mc-table-card {
  $block-name: &;

  @include position(absolute, 0);
  z-index: 10;
  margin-left: 251px;
  background-color: $color-white;
  border: 1px solid $color-gray-light;
  display: flex;
  flex-direction: column;

  &__header {
    height: $tappable-element-l;
    border-bottom: 1px solid $color-gray-light;
    flex-shrink: 0;
  }

  &__body {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>

<docs>
  ```jsx
  <div>

    <div style="position: relative; height: 100vh; width: 100%">
      <McTableCard>
        <McTableCardHeader slot="header">
          <template>
            <McButton uppercase variation="primary-link">Назад</McButton>
          </template>
          <template slot="right">
            <McButton uppercase variation="primary-link">Запросить владельца</McButton>
            <McButton uppercase variation="primary-link">Запросить данные AI</McButton>
            <McButton uppercase variation="primary-link">Редактировать</McButton>
          </template>
        </McTableCardHeader>
        <McTableCardBody>
          <template slot="left">
            left
          </template>
          <template slot="right">
            right
          </template>
        </McTableCardBody>
      </McTableCard>
    </div>

  </div>
  ```
</docs>
