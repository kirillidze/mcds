<template>
  <form @submit.prevent="handleSearch" class="mc-header-search" :class="classes">
    <div class="mc-header-search__field">
      <div class="mc-header-search__input-wrap">
        <input
          ref="inputSearch"
          :placeholder="placeholder"
          type="search"
          :value="_value"
          class="mc-header-search__input"
          @input="$event => handleInput($event.target.value)"
          @keyup.esc="closeSearch"
        />
      </div>
      <mc-button
        variation="black-flat"
        size="m-compact"
        rounded
        tabindex="-1"
        type="submit"
        class="mc-header-search__submit-btn"
      >
        <mc-svg-icon slot="icon-append" name="search" />
      </mc-button>
      <mc-button
        variation="black-flat"
        size="m-compact"
        rounded
        tabindex="-1"
        type="button"
        class="mc-header-search__close-btn"
        @click.prevent="closeSearch"
      >
        <mc-svg-icon slot="icon-append" name="close" />
      </mc-button>
    </div>
    <div class="mc-header-search__drop" v-if="searchItems">
      <mc-header-search-list
        :items="searchItems"
        @click-search-item="closeSearch"
        @click-search-all="closeSearch"
      />
    </div>
  </form>
</template>

<script>
import McHeaderSearchList from "../McHeaderSearch/McHeaderSearchList"
import McButton from "../../../elements/McButton"
import McSvgIcon from "../../../elements/McSvgIcon"
export default {
  name: "McHeaderSearch",
  components: { McSvgIcon, McButton, McHeaderSearchList },
  status: "ready",
  release: "0.0.1",
  props: {
    /**
     *  Результаты поиска
     *
     */
    searchItems: {
      type: Array,
      default: null,
    },
    /**
     *  Строка поиска
     *
     */
    value: {
      default: null,
    },
    /**
     *  Плейсхолдер поиска
     *
     */
    placeholder: {
      type: String,
      default: null,
    },
  },

  computed: {
    _value() {
      return this.value === null ? "" : this.value
    },
    classes() {
      return {
        "mc-header-search--is-result": this.searchItems,
      }
    },
  },

  methods: {
    emitInput(value) {
      this.$emit("input", value)
    },

    handleInput(value) {
      this.emitInput(value)
    },

    closeSearch() {
      this.$emit("search-close")
    },

    handleSearch() {
      this.$emit("search-submit")
    },

    getInput() {
      return this.$refs.inputSearch
    },
  },
}
</script>

<style lang="scss">
.mc-header-search {
  $block-name: &;

  @include position(absolute, 0);

  &__input-wrap {
    position: relative;
  }

  &__input {
    font-family: $font_heading;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    outline: none;
    padding: $space-xxs $space-l;
    color: $color-black;
    font-size: $size-m;
    font-weight: $weight-medium;
    line-height: $line-height-s;
    appearance: textfield;
    border: 1px solid $color-outline-gray;
    background-color: $color-white;
    border-radius: $radius-m;
    height: $tappable-element-l;

    &[type="search"]::-webkit-search-cancel-button,
    &[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    &[type="search"]::-ms-clear {
      display: none;
    }

    @include input-placeholder() {
      font-weight: $weight-medium;
      color: $color-outline-gray;
    }
  }

  &__submit-btn,
  &__close-btn {
    position: absolute;
    top: $space-xxs;
    color: $color-gray;
  }

  &__submit-btn {
    left: $space-xxs;
  }

  &__close-btn {
    right: $space-xxs;
  }

  &__drop {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border-bottom-right-radius: $radius-m;
    border-bottom-left-radius: $radius-m;
    background-color: $color-white;
    box-shadow: $shadow-m;
    border: 1px solid $color-outline-gray;
    border-top-color: $color-outline-gray;
    max-height: 75vmin;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &--is-result {
    #{$block-name} {
      &__input {
        box-shadow: $shadow-m;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-color: $color-outline-gray;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let searchResult = require('@/mocks/searchResult').default;
  let search = null
  let eventTest = (val) => alert(val)
  <div style="position: relative;">
    <mc-header-search
      style="position: relative"
      v-model="search"
      placeholder="Начните вводить"
      @search-submit="eventTest('Search submit')"
      @search-close="eventTest('reset')"
    />
  </div>
  ```
</docs>
