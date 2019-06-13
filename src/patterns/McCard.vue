<template>
  <div class="mc-card">
    <div class="mc-card__header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="mc-card__content">
      <slot />
    </div>
  </div>
</template>

<script>
import McGridRow from "./McGrid/McGridRow"
import McTwoLines from "./McTwoLines"
export default {
  name: "McCard",
  components: { McTwoLines, McGridRow },
  status: "deprecated",
  release: "1.0.0",
}
</script>

<style lang="scss">
.mc-card {
  position: relative;
  display: block;
  border-radius: 8px;
  border: 2px solid $border-color;
  background: $color-white;
  &__content {
    padding: $size-m;
  }
  &__header {
    padding: $size-m;
    border-bottom: 2px solid $border-color;
    display: flex;
    align-items: center;
  }
}
</style>

<docs>
    ```jsx
    <div>
        <McCard>
            <template slot="header">
                <McAvatar size="m" rounded/>
                <span style="margin-left: 10px">Заголовок карточки</span>
            </template>
            <mc-grid-row>
                <mc-grid-col>
                    <McTwoLines title="Бюджет">
                        1 200 $
                    </McTwoLines>
                </mc-grid-col>
                <mc-grid-col>
                    <McTwoLines title="Бюджет">
                        1 200 $
                    </McTwoLines>
                </mc-grid-col>
                <mc-grid-col>
                    <McTwoLines title="Бюджет">
                        1 200 $
                    </McTwoLines>
                </mc-grid-col>
            </mc-grid-row>
        </McCard>
    </div>
    ```
</docs>
