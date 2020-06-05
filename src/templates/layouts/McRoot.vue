<template>
  <div class="mc-root">
    <!-- @slot Слот контента -->
    <slot />
  </div>
</template>

<script>
import "normalize.css/normalize.css"
import "flatpickr/dist/flatpickr.css"
import "vue-snotify/styles/material.css"
import McTitle from "../../elements/McTitle"

/**
 * Это обязательный компонент, с него начинается любой layout,
 * т.к. здесь находятся глобальные стили.
 */
export default {
  name: "McRoot",
  status: "ready",
  release: "0.0.1",
  components: {
    McTitle,
  },
  beforeMount() {
    this.runResizeEvents()
    window.addEventListener("resize", this.runResizeEvents)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.runResizeEvents)
  },
  methods: {
    runResizeEvents() {
      this.vhFix()
    },
    vhFix() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    },
  },
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -ms-overflow-style: scrollbar;
  -ms-text-size-adjust: 100%;
  min-width: $site-width-m;
  min-height: 100%;
  font-size: $size-m;
}

body {
  overflow-y: hidden;
}

body,
#__nuxt,
#__layout,
.mc-root {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  background-color: $color-white;
  margin: 0;
  overflow-y: auto;
  word-break: break-word;

  font-family: $font-heading;
  font-size: $size-m;
  line-height: $line-height-s;
  color: $color-black;
}

[tabindex="-1"]:focus {
  outline: none !important;
}

[role="button"] {
  cursor: pointer;
}

input[type="search"] {
  -webkit-appearance: textfield;
}

a,
button,
[role="button"],
input,
label,
select,
textarea {
  touch-action: manipulation;
  margin: 0;
}

button,
input {
  overflow: visible;
  text-transform: none;
}

button,
html [type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

input[type="date"],
input[type="time"],
input[type="datetime-local"],
input[type="month"] {
  -webkit-appearance: listbox;
}

textarea {
  overflow: auto;
  resize: vertical;
}

svg {
  fill: currentColor;

  a &,
  button & {
    pointer-events: none;
  }

  &:not(:root) {
    overflow: hidden;
  }
}

img {
  max-width: 100%;
  height: auto;
}

a {
  background-color: transparent;
  text-decoration-skip-ink: auto;
  transition: color $duration-quickly;
}

::selection {
  background: fade-out($color-blue, 0);
  color: $color-white;
}

::-moz-selection {
  background: fade-out($color-blue, 0);
  color: $color-white;
}

button {
  -webkit-appearance: none;
}

a,
button {
  outline: none;

  &:focus {
    outline: none;
  }
}

hr {
  box-sizing: content-box;
  overflow: visible;
}

pre {
  font-size: 0.7em;
}

.mc-root {
  $block-name: &;
}

// Глобальные классы отступов

.pb-xl {
  padding-bottom: 56px;
  @media #{$media-query-m} {
    padding-bottom: 56px;
  }
  @media #{$media-query-l} {
    padding-bottom: 56px;
  }
}
.pt-xl {
  padding-top: 56px;
  @media #{$media-query-m} {
    padding-top: 56px;
  }
  @media #{$media-query-l} {
    padding-top: 56px;
  }
}
.pb-l {
  padding-bottom: 48px;
  @media #{$media-query-m} {
    padding-bottom: 48px;
  }
  @media #{$media-query-l} {
    padding-bottom: 48px;
  }
}
.pt-l {
  padding-top: 48px;
  @media #{$media-query-m} {
    padding-top: 48px;
  }
  @media #{$media-query-l} {
    padding-top: 48px;
  }
}
.pb-ml {
  padding-bottom: 40px;
  @media #{$media-query-m} {
    padding-bottom: 40px;
  }
  @media #{$media-query-l} {
    padding-bottom: 40px;
  }
}
.pt-ml {
  padding-top: 40px;
  @media #{$media-query-m} {
    padding-top: 40px;
  }
  @media #{$media-query-l} {
    padding-top: 40px;
  }
}
.pb-m {
  padding-bottom: 32px;
  @media #{$media-query-m} {
    padding-bottom: 32px;
  }
  @media #{$media-query-l} {
    padding-bottom: 32px;
  }
}
.pt-m {
  padding-top: 32px;
  @media #{$media-query-m} {
    padding-top: 32px;
  }
  @media #{$media-query-l} {
    padding-top: 32px;
  }
}
.pb-sm {
  padding-bottom: 24px;
  @media #{$media-query-m} {
    padding-bottom: 24px;
  }
  @media #{$media-query-l} {
    padding-bottom: 24px;
  }
}
.pt-sm {
  padding-top: 24px;
  @media #{$media-query-m} {
    padding-top: 24px;
  }
  @media #{$media-query-l} {
    padding-top: 24px;
  }
}
.pb-s {
  padding-bottom: 16px;
  @media #{$media-query-m} {
    padding-bottom: 16px;
  }
  @media #{$media-query-l} {
    padding-bottom: 16px;
  }
}
.pt-s {
  padding-top: 16px;
  @media #{$media-query-m} {
    padding-top: 16px;
  }
  @media #{$media-query-l} {
    padding-top: 16px;
  }
}
.pb-xs {
  padding-bottom: 12px;
  @media #{$media-query-m} {
    padding-bottom: 12px;
  }
  @media #{$media-query-l} {
    padding-bottom: 12px;
  }
}
.pt-xs {
  padding-top: 12px;
  @media #{$media-query-m} {
    padding-top: 12px;
  }
  @media #{$media-query-l} {
    padding-top: 12px;
  }
}
.pb-xxs {
  padding-bottom: 8px;
  @media #{$media-query-m} {
    padding-bottom: 8px;
  }
  @media #{$media-query-l} {
    padding-bottom: 8px;
  }
}
.pt-xxs {
  padding-top: 8px;
  @media #{$media-query-m} {
    padding-top: 8px;
  }
  @media #{$media-query-l} {
    padding-top: 8px;
  }
}

.mb-xl {
  margin-bottom: 56px;
  @media #{$media-query-m} {
    margin-bottom: 56px;
  }
  @media #{$media-query-l} {
    margin-bottom: 56px;
  }
}
.mt-xl {
  margin-top: 56px;
  @media #{$media-query-m} {
    margin-top: 56px;
  }
  @media #{$media-query-l} {
    margin-top: 56px;
  }
}
.mb-l {
  margin-bottom: 48px;
  @media #{$media-query-m} {
    margin-bottom: 48px;
  }
  @media #{$media-query-l} {
    margin-bottom: 48px;
  }
}
.mt-l {
  margin-top: 48px;
  @media #{$media-query-m} {
    margin-top: 48px;
  }
  @media #{$media-query-l} {
    margin-top: 48px;
  }
}
.mb-ml {
  margin-bottom: 40px;
  @media #{$media-query-m} {
    margin-bottom: 40px;
  }
  @media #{$media-query-l} {
    margin-bottom: 40px;
  }
}
.mt-ml {
  margin-top: 40px;
  @media #{$media-query-m} {
    margin-top: 40px;
  }
  @media #{$media-query-l} {
    margin-top: 40px;
  }
}
.mb-m {
  margin-bottom: 32px;
  @media #{$media-query-m} {
    margin-bottom: 32px;
  }
  @media #{$media-query-l} {
    margin-bottom: 32px;
  }
}
.mt-m {
  margin-top: 32px;
  @media #{$media-query-m} {
    margin-top: 32px;
  }
  @media #{$media-query-l} {
    margin-top: 32px;
  }
}
.mb-sm {
  margin-bottom: 24px;
  @media #{$media-query-m} {
    margin-bottom: 24px;
  }
  @media #{$media-query-l} {
    margin-bottom: 24px;
  }
}
.mt-sm {
  margin-top: 24px;
  @media #{$media-query-m} {
    margin-top: 24px;
  }
  @media #{$media-query-l} {
    margin-top: 24px;
  }
}
.mb-s {
  margin-bottom: 16px;
  @media #{$media-query-m} {
    margin-bottom: 16px;
  }
  @media #{$media-query-l} {
    margin-bottom: 16px;
  }
}
.mt-s {
  margin-top: 16px;
  @media #{$media-query-m} {
    margin-top: 16px;
  }
  @media #{$media-query-l} {
    margin-top: 16px;
  }
}
.mb-xs {
  margin-bottom: 12px;
  @media #{$media-query-m} {
    margin-bottom: 12px;
  }
  @media #{$media-query-l} {
    margin-bottom: 12px;
  }
}
.mt-xs {
  margin-top: 12px;
  @media #{$media-query-m} {
    margin-top: 12px;
  }
  @media #{$media-query-l} {
    margin-top: 12px;
  }
}
.mb-xxs {
  margin-bottom: 8px;
  @media #{$media-query-m} {
    margin-bottom: 8px;
  }
  @media #{$media-query-l} {
    margin-bottom: 8px;
  }
}
.mt-xxs {
  margin-top: 8px;
  @media #{$media-query-m} {
    margin-top: 8px;
  }
  @media #{$media-query-l} {
    margin-top: 8px;
  }
}
// Глобальные классы видимости
.hidden-m {
  @media #{$media-query-m} {
    display: none !important;
  }
}
.hidden-l {
  @media #{$media-query-l} {
    display: none !important;
  }
}

.hidden-m-down {
  @media #{$media-query-m-down} {
    display: none !important;
  }
}
.hidden-l-down {
  @media #{$media-query-l-down} {
    display: none !important;
  }
}
</style>

<docs>
  ```jsx
    <div>
      <McRoot>
        <div class="mb-s">
          <mc-title size="l" color="blue">Variables:</mc-title>
          <mc-title>xl - 56px</mc-title>
          <mc-title>l - 48px</mc-title>
          <mc-title>ml - 40px</mc-title>
          <mc-title>m - 32px</mc-title>
          <mc-title>sm - 24px</mc-title>
          <mc-title>s - 16px</mc-title>
          <mc-title>xs - 12px</mc-title>
          <mc-title>xxs - 8px</mc-title>
        </div>

        <div class="mb-s">
          <mc-title size="l" color="blue">Spaces:</mc-title>
          <mc-title>margin-bottom - mb</mc-title>
          <mc-title>margin-top - mt</mc-title>
          <mc-title>padding-bottom - pb</mc-title>
          <mc-title>margin-top - pb</mc-title>
        </div>

        <div>
          <mc-title size="l" color="blue">Visibilities:</mc-title>
          <mc-title>hidden-m (>768)</mc-title>
          <mc-title>hidden-l (>1024)</mc-title>
          <mc-title>hidden-m-down (<768)</mc-title>
          <mc-title>hidden-l-down (<1024)</mc-title>
        </div>
      </McRoot>
    </div>
  ```
</docs>
