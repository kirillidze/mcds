<template>
  <tabs
    class="mc-tabs"
    :cache-lifetime="cacheLifetime"
    :options="{ useUrlFragment, defaultTabHash }"
  >
    <slot />
  </tabs>
</template>

<script>
import Tabs from "vue-tabs-component/src/components/Tabs"

export default {
  name: "McTabs",
  status: "ready",
  release: "0.0.1",
  props: {
    cacheLifetime: {
      default: 5,
    },
    useUrlFragment: {
      default: false,
    },
    defaultTabHash: {
      default: null,
    },
  },
  components: {
    Tabs,
  },
}
</script>

<style lang="scss">
.mc-tabs {
  $block-name: &;

  .tabs-component-tabs {
    margin-top: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 2px solid #e5e5e5;
    padding: 0 15px;
    display: flex;
    flex-wrap: nowrap;
    margin-top: -6px;
  }

  .tabs-component-tab {
    font-size: 0;
    line-height: 0;
    min-width: 0;

    &:first-child {
      margin-left: -12px;
    }

    &:last-child {
      margin-right: -12px;
    }

    &.is-active {
      .tabs-component-tab-a {
        color: $black;
        pointer-events: none;
      }
    }
  }

  .tabs-component-tab-a {
    @include ellipsis();
    @include interplay-link();

    color: $color-secondary;
    font-size: 14px;
    font-weight: 500;
    line-height: line-height(17, 14);
    text-transform: uppercase;
    text-decoration: none;
    padding: 7px 12px;
  }

  .tabs-component-panels {
  }

  .tabs-component-panel {
  }

  &--type-2 {
    .tabs-component-tabs {
      border-radius: 8px;
      border: 1px solid #cccccc;
      margin-top: 0;
    }

    .tabs-component-tab-a {
      color: hsl(0, 0%, 13%);
      font-family: $font-family--headings-2;
      font-size: 16px;
      line-height: line-height(19, 16);
      font-weight: 600;
      text-transform: none;
      padding: 15px;

      @include interplay-link($color: $color-secondary);
    }

    .tabs-component-tab {
      &.is-active {
        .tabs-component-tab-a {
          color: $color-third;
        }
      }
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        <mc-tabs>
            <mc-tab name="First tab">
                First tab content
            </mc-tab>
            <mc-tab name="Second tab">
                Second tab content
            </mc-tab>
            <mc-tab name="Third tab">
                Third tab content
            </mc-tab>
        </mc-tabs>
    </div>
    ```
</docs>
