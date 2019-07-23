<template>
  <tabs
    class="mc-tabs"
    :cache-lifetime="cacheLifetime"
    :options="{ useUrlFragment, defaultTabHash }"
    @changed="e => changedHandler(e)"
    ref="tabs"
  >
    <slot />
  </tabs>
</template>

<script>
import Tabs from "vue-tabs-component/src/components/Tabs"
import McTab from "./McTab"

export default {
  name: "McTabs",
  status: "deprecated",
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
    McTab,
    Tabs,
  },
  methods: {
    changedHandler(e) {
      this.$emit("changed", e)
    },
    getActiveTab() {
      return this.$refs.tabs.getActiveTab()
    },
  },
}
</script>

<style lang="scss">
.mc-tabs {
  $block-name: &;

  .tabs-component-tabs {
    display: flex;
    flex-wrap: nowrap;
    @include margin(-$space-xs null 0);
    padding: 0 $space-s;
    list-style: none;
    border-bottom: $separator-xs solid $color-border;
  }

  .tabs-component-tab {
    @include reset-text-indents();
    min-width: 0;

    &:first-child {
      margin-left: -$space-s;
    }

    &:last-child {
      margin-right: -$space-s;
    }

    &.is-active {
      .tabs-component-tab-a {
        color: $color-black;
        pointer-events: none;
      }
    }
  }

  .tabs-component-tab-a {
    @include ellipsis();
    @include interplay-link();

    color: $color-secondary;
    font-size: $size-s;
    font-weight: $weight-medium;
    line-height: line-height(17, 14);
    text-transform: uppercase;
    text-decoration: none;
    padding: $space-xs $space-s;
  }

  .tabs-component-panels {
  }

  .tabs-component-panel {
  }
}
</style>

<docs>
    ```jsx
    function changedHandler(e) {
        console.log(e.tab.id)
    }
    <div>
        <mc-tabs @changed="e => changedHandler(e)">
            <mc-tab name="First tab" id="1">
                First tab content
            </mc-tab>
            <mc-tab name="Second tab" id="2">
                Second tab content
            </mc-tab>
            <mc-tab name="Third tab" id="3">
                Third tab content
            </mc-tab>
        </mc-tabs>
    </div>
    ```
</docs>
