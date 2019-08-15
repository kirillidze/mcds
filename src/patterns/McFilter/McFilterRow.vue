<template>
  <mc-tappable class="mc-filter-row">
    <div class="mc-filter-row__name">
      <McTitle>
        <slot></slot>
      </McTitle>
    </div>
    <div class="mc-filter-row__chip" v-if="$slots.chip">
      <slot name="chip"></slot>
    </div>
    <McSvgIcon class="mc-filter-row__icon" size="xs" name="arrow_drop_down" />
  </mc-tappable>
</template>

<script>
import McTappable from "../McTappable"
import McTitle from "../../elements/McTitle"
import McSvgIcon from "../../elements/McSvgIcon"
export default {
  name: "McFilterRow",
  components: { McSvgIcon, McTitle, McTappable },
  status: "ready",
  release: "1.0.0",
}
</script>

<style lang="scss">
.mc-filter-row {
  $block-name: &;

  min-height: $tappable-element-l;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  &__name {
  }

  &__chip {
    flex: 0 0 auto;
    margin-left: $space-xs;
  }

  &__icon {
    margin-left: auto;
    color: $color-gray-dark;
    transition: transform $duration-quickly;
  }
}

.mc-collapse {
  &--is-open {
    .mc-filter-row {
      &__icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        
    </div>
    ```
</docs>
