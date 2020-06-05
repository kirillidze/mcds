<template>
  <mc-tappable class="mc-filter-row">
    <div class="mc-filter-row__name">
      <mc-title>
        <!-- @slot Слот заголовка -->
        <slot />
      </mc-title>
    </div>
    <div class="mc-filter-row__chip" v-if="$slots.chip">
      <!-- @slot Слот чипа -->
      <slot name="chip" />
    </div>
    <mc-svg-icon class="mc-filter-row__icon" size="xs" name="chevron_right" />
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
    const handleClick = e => alert('row is clicked')
    const handleChipClick = e => alert('chip is clicked')
    <mc-filter-row @click.native="handleClick">
        Title
        <mc-filter-dot slot="chip" @click.stop="handleChipClick" />
    </mc-filter-row>
    ```
</docs>
