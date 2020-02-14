<template>
  <tabs
    class="mc-tabs"
    :class="classes"
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
      default: "blue",
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    lastTabLink: {
      type: Array,
      default: [],
    },
  },
  components: {
    McTab,
    Tabs,
  },
  computed: {
    classes() {
      let result = {}
      this.lastTabLink.forEach(item => {
        result = {
          ...result,
          [`mc-tabs--last-tab-link-${item}`]: item,
        }
      })
      return result
    },
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
      background-color: $color-blue;
      transition: left 0.2s ease, right 0.2s ease, opacity 0.2s ease, color 0.2s ease;
    }
  }

  @each $title, $value in $last-childs {
    &--last-tab-link-#{$title} {
      & .tabs-component-tab {
        position: relative;
        &:nth-last-child(#{$value}) {
          &:after {
            content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/%3E%3C/svg%3E");
            display: block;
            position: absolute;
            right: 5px;
            top: 10px;
            width: 16px;
            height: 16px;
            z-index: 2;
          }

          & .tabs-component-tab-a {
            padding-right: 25px;
            z-index: 3;
            position: relative;
          }
        }
      }
    }
  }
}
</style>

<docs>
    ```jsx
    function changedHandler(e) {
        console.log(e.tab.id)
    }
    <div>
        <mc-tabs @changed="e => changedHandler(e)" last-tab-link>
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
