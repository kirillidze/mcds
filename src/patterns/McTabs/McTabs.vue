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
    size: {
      type: String,
      default: "m",
    },
    color: {
      type: String,
      default: "accent-blue",
    },
    uppercase: {
      type: Boolean,
      default: false,
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

  @mixin border() {
    &::before {
      @include pseudo();
      @include position(absolute, auto 0 0 0);
      height: $separator-xs;
      background-color: $color-outline-gray;
    }
  }

  .tabs-component-tabs {
    @include reset-text-indents();
    position: relative;
    padding-left: 0;
    margin-top: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    @include border();
  }

  .tabs-component-tab {
    position: relative;
    flex: 0 0 auto;

    &.is-active {
      .tabs-component-tab-a {
        &::after {
          left: 0;
          right: 0;
          opacity: 1;
        }
      }
    }
  }

  .tabs-component-tab-a {
    display: inline-flex;
    color: $color-black;
    font-family: $font-heading;
    font-size: $size-m;
    line-height: $line-height-s;
    font-weight: $weight-medium;
    text-decoration: none;
    padding: $space-xs;

    @include border();

    &:after {
      opacity: 0;
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: 0;
      height: $separator-s;
      content: "";
      display: block;
      z-index: 1;
      background-color: $color-accent-blue;
      transition: left 0.2s ease, right 0.2s ease, opacity 0.2s ease, color 0.2s ease;
    }
  }

  .tabs-component-panels {
  }

  .tabs-component-panel {
  }

  &--size-m {
  }
  &--color-accent-blue {
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
