<template>
  <tabs
    class="mc-tabs"
    :class="classes"
    :cache-lifetime="cacheLifetime"
    :options="{ useUrlFragment, defaultTabHash }"
    @changed="e => changedHandler(e)"
    ref="tabs"
  >
    <!-- @slot для табов -->
    <slot />
  </tabs>
</template>

<script>
import Tabs from "vue-tabs-component/src/components/Tabs"
import McTab from "./McTab"

export default {
  name: "McTabs",
  status: "ready",
  release: "0.0.1",
  components: {
    McTab,
    Tabs,
  },
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
    /**
     *  Размеры табов:
     *  `xs, s, m, l и т.д.`
     */
    size: {
      type: String,
      default: "m",
    },
    /**
     *  Цвет текста табов
     */
    color: {
      type: String,
      default: "black",
    },
    /**
     *  Цвет линии активного таба
     */
    accentColor: {
      type: String,
      default: "blue",
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
    /**
     *  Массив номеров табов (с конца)
     *  для добавления ссылочной иконки
     */
    lastTabLink: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    classes() {
      const result = {
        [`mc-tabs--color-${this.color}`]: this.color,
        [`mc-tabs--accent-color-${this.accentColor}`]: this.accentColor,
        [`mc-tabs--size-${this.size}`]: this.size,
        [`mc-tabs--uppercase`]: this.uppercase,
      }
      this.lastTabLink.forEach(num => {
        result[`mc-tabs--last-tab-link-${num}`] = num
      })
      return result
    },
  },
  methods: {
    changedHandler(e) {
      /**
       * Событие при смене таба
       * @property {Object}
       */
      this.$emit("changed", e)
    },
    getActiveTab() {
      return this.$refs.tabs.getActiveTab()
    },
  },
}
</script>

<style lang="scss">
$last-childs: (
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
);

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

  @each $size, $value in $token-sizes {
    &--size-#{$size} {
      .tabs-component-tab-a {
        font-size: $value;
      }
    }
  }

  &--color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        .tabs-component-tab-a {
          color: $value;
        }
      }
    }
  }

  &--accent-color {
    @each $color, $value in $token-colors {
      &-#{$color} {
        .tabs-component-tab-a {
          &::after {
            background-color: $value;
          }
        }
      }
    }
  }

  &--uppercase {
    .tabs-component-tabs {
      text-transform: uppercase;
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
    font-family: $font-heading;
    line-height: $line-height-s;
    font-weight: $weight-medium;
    text-decoration: none;
    padding: $space-xs;

    @include border();

    &::after {
      opacity: 0;
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: 0;
      height: $separator-s;
      content: "";
      display: block;
      z-index: 1;
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
            @include position(absolute, 10px 5px null null);
            @include size($tappable-element-xxs);
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
        <mc-tabs @changed="e => changedHandler(e)" :last-tab-link="[1, 2]">
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
        <br />
        <mc-tabs @changed="e => changedHandler(e)" size="xs" color="red" accent-color="orange" uppercase>
            <mc-tab name="First small tab" id="1">
                First tab content
            </mc-tab>
            <mc-tab name="Second small tab" id="2">
                Second tab content
            </mc-tab>
            <mc-tab name="Third small tab" id="3">
                Third tab content
            </mc-tab>
        </mc-tabs>
    </div>
    ```
</docs>
