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
import McTwoLines from "../elements/McTwoLines"
import McAvatar from "../elements/McAvatar/McAvatar"
import McGridCol from "./McGrid/McGridCol"
export default {
  name: "McCard",
  components: { McGridCol, McAvatar, McTwoLines, McGridRow },
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
            <McGridRow :gutter="20">
                <McGridCol :span="4">
                    <McTwoLines title="Бюджет">
                        1 200 $
                    </McTwoLines>
                </McGridCol>
                <McGridCol :span="4">
                    <McTwoLines title="Блогеров">
                        129
                    </McTwoLines>
                </McGridCol>
                <McGridCol :span="4">
                    <McTwoLines title="Дедлайн">
                        01.11.2018
                    </McTwoLines>
                </McGridCol>
            </McGridRow>
        </McCard>
    </div>
    ```
</docs>
