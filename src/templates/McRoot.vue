<template>
  <div class="mc-root" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import McHeader from "../patterns/McHeader/McHeader"
import McMain from "./McMain"
export default {
  name: "McRoot",
  components: { McMain, McHeader },
  status: "ready",
  release: "0.0.1",
  computed: {
    classes() {
      return {
        //[`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
@import "~normalize.css/normalize";

// Временные
@import "~vue-snotify/styles/material";
@import "~vue-multiselect/dist/vue-multiselect.min";
@import "~flatpickr/dist/flatpickr";

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
  overflow-y: scroll;
  word-break: break-word;

  font-family: $font-text;
  font-size: $size-m;
  line-height: $line-height-s;
  color: $color-text;
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
  background: fade-out($color-primary, 0);
  color: $color-white;
}

::-moz-selection {
  background: fade-out($color-primary, 0);
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

// Это временные, их нужно убрать потом

.flatpickr-calendar {
  margin-top: 10px;
}

.color-text {
  //@each $color, $value in $colors {
  //&-#{$color} {
  //color: $value !important;
  //}
  //}
}

.g-top-line {
  $block-name: &; // #{$block-name}__element

  position: fixed;
  top: $header-height + $breadcrumbs-height;
  left: 0;
  right: 0;
  background-color: $white;
  z-index: $z-index-top-line;
  margin-left: $width-sidebar;
  padding-left: $gutters * 2;
  padding-right: $gutters * 2;

  &__inner {
    height: $top-line-height;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: -10px;
    margin-right: -10px;
  }

  &__left {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    flex: 0 1 auto;
    min-width: 0;
  }

  &__drop {
    flex: 0 0 auto;

    .el-dropdown {
      &__toggler {
        margin-left: -23px;
      }
    }
  }

  &__chips {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
  }

  &__right {
    font-size: 0;
    line-height: 0;
    padding-left: 10px;
    padding-right: 10px;
    flex: 0 0 auto;
    margin-right: -7px;
    display: flex;
    align-items: center;
  }

  #{$block-name}__el-link.el-link {
    font-size: 19px;
    color: $gray-darker;

    &:hover,
    &:focus {
      color: $color-secondary;
    }

    &:active {
      color: darken($color-secondary, 8%);
    }
  }

  &__text {
    @include ellipsis();
    color: $gray-light;
    font-size: 16px;
    font-weight: 400;
    line-height: line-height(19, 16);
    text-transform: lowercase;
    padding-left: 10px;
    padding-right: 10px;
  }
}

.g-container {
  $block-name: &; // #{$block-name}__element

  padding-left: $gutters * 2;
  padding-right: $gutters * 2;
}

.channel-form {
  $block-name: &;

  &__subtitle {
    @include ellipsis();
    font-family: $font-family--headings-2;
    color: hsl(0, 0%, 13%);
    font-size: 16px;
    font-weight: 500;
    line-height: line-height(18, 16);
    margin-top: 0;
    margin-bottom: 0;
    background-color: $white;
    display: block;

    &--small {
      font-size: 15px;
    }

    &--thin {
      font-weight: 400;
    }

    &--light {
      color: hsl(0, 0%, 53%);
    }

    &--bordered {
      position: relative;
      z-index: 0;

      span {
        position: relative;
        background-color: $white;
        z-index: 1;
        padding-right: 8px;
      }

      &::after {
        display: block;
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 8px;
        border-bottom: 1px dashed hsl(0, 0%, 53%);
      }
    }

    &--pb-small {
      padding-bottom: 10px;
    }

    &--danger {
      color: #e73232;
    }
  }

  &__row {
    padding-bottom: 10px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-left: -4px;
    margin-right: -4px;

    &--flex-start {
      align-items: flex-start;
    }

    &--no-flex {
      display: block !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    &--integration {
      #{$block-name} {
        &__cell {
          width: 25%;

          &:not(:first-child) {
            #{$block-name} {
              &__subtitle {
                text-align: right;
              }
            }
          }
        }
      }
    }

    &--channel-info {
      #{$block-name} {
        &__cell {
          &:first-child {
            width: 130px;
          }

          &:not(:first-child) {
            width: calc(100% - 130px);
          }
        }
      }
    }

    &--lecture {
      margin-left: -10px;
      margin-right: -10px;

      #{$block-name} {
        &__cell {
          padding-left: 10px;
          padding-right: 10px;

          &:first-child {
            width: 345px;
          }
          &:last-child {
            width: calc(100% - 345px);
          }
        }
      }
    }

    &--contacts {
      margin-left: -10px;
      margin-right: -10px;

      #{$block-name} {
        &__cell {
          padding-left: 10px;
          padding-right: 10px;

          &:nth-child(1) {
            width: 160px;
          }

          &:nth-child(2) {
            width: calc(100% - 200px);
          }

          &:nth-child(3) {
            width: 40px;

            .el-btn-action {
              margin-left: -6px;
            }
          }
        }
      }
    }

    &--pb-middle {
      padding-bottom: 30px;
    }

    &--pb-small {
      padding-bottom: 15px;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__cell {
    padding-left: 4px;
    padding-right: 4px;

    &--third {
      width: 33.333333%;
    }

    &--half {
      width: 50%;
    }

    &--full {
      width: 100%;
    }

    &--2-3 {
      width: 77.777777%;
    }
  }

  &__balance {
    margin-top: -21px;
    margin-left: -25px;
    margin-right: -25px;
    background-image: linear-gradient(74deg, #f5576c 0%, #f093fb 100%);
    border-radius: 8px 8px 0 0;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 2px;
    margin-bottom: -5px;
    padding-top: 18px;
  }

  &__balance-title {
    color: $white;
    font-family: $font-family--headings-2;
    font-size: 20px;
    line-height: line-height(23, 20);
    font-weight: 500;
    padding-left: 16px;
    padding-right: 16px;
  }

  &__info-text {
    @include ellipsis();

    color: hsl(0, 0%, 61%);
    font-size: 14px;
    line-height: line-height(17, 14);
    font-weight: 500;
    letter-spacing: 0.35px;
    max-width: 140px;
    height: 34px;
    vertical-align: middle;
    padding: 9px 7px;
  }

  &__help-text {
    color: #222222;
    font-family: $font-family--headings-2;
    font-size: 16px;
    line-height: line-height(19, 16);
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;
  }
}

.channel-card-info {
  $block-name: &;

  display: flex;
  flex-wrap: nowrap;

  &__avatar {
    font-size: 0;
    line-height: 0;
    flex: 0 0 auto;
    margin-right: 10px;
  }

  &__descr {
    flex: 1 1 auto;
    margin-top: 2px;
    font-size: 0;
    line-height: 0;
  }

  &__title {
    display: inline-block;
    text-decoration: none;
    margin-top: 0;
    margin-bottom: 0;
    color: hsl(0, 0%, 13%);
    font-size: 16px;
    font-weight: 500;
    line-height: line-height(19, 16);
    transition: color $transition-time-fast;
    font-family: $font-family--headings-2;

    &:hover {
      color: $color-main;
    }
  }

  &__list {
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-left: -7px;
    margin-right: -7px;
    margin-bottom: -7px;
    margin-top: 6px;
  }

  &__list-item {
    margin-right: 7px;
    margin-left: 7px;
    padding-bottom: 7px;
  }

  &__email {
  }

  &__email-link {
    @include ellipsis();
    padding-top: 5px;
    padding-bottom: 5px;
    display: inline-block;
    text-decoration: none;
    color: #222222;
    font-family: $font-family--headings-2;
    font-size: 13px;
    line-height: line-height(16, 13);
    font-weight: 500;
    transition: color $transition-time-fast;

    @include interplay-link();
  }

  &__email-link-icon {
    position: relative;
    top: 2px;
    width: 12px;
    height: 12px;
  }
}

.el-tabs {
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

.channel-tab-report {
  $block-name: &;

  &__stat {
  }

  &__item {
    padding: 15px;
    border-bottom: 2px solid $border-color;
    overflow: hidden;

    &:empty {
      display: none;
    }

    &:first-child {
      //border-top: 1px solid $gray-lighter;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__control {
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    justify-content: center;

    &:empty {
      display: none;
    }
  }
}

.tab-tags {
  $block-name: &;

  padding: 15px;
}

.channel-tab-marketing {
  $block-name: &;

  padding: 15px;
}

.channel-tab-contact {
  $block-name: &;

  padding: 15px;
}

.dashboard {
  &__sumbenu-item {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }

  &__submenu-title {
    color: #212121;
    font-family: $font-family--headings-2;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 20px;
    line-height: 1.15;
    font-weight: 500;
    letter-spacing: 0.01px;
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: -8px;

    &:empty {
      display: none;
    }
  }

  &__item {
    text-decoration: none;
    color: hsl(0, 0%, 13%);
    transition: border-color $transition-time-fast;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 15px;
    border-radius: 8px;
    border: 2px solid $border-color;
    width: calc(25% - 16px);
    margin: 8px;

    @media (min-width: $screen-xxl-up) {
      width: calc(20% - 16px);
    }

    &:hover {
      border-color: $color-secondary;
    }
  }

  &__title {
    font-family: $font-family--headings-2;
    font-size: 20px;
    line-height: 1.15;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;
  }

  &__icon {
    width: 35px;
    height: 43px;
    flex: 0 0 auto;
    margin-right: 15px;
    min-width: 0;
    fill: #212121;
  }
}

.agreement {
  $block-name: &;

  p {
    margin-top: 0;
    margin-bottom: 0;
    color: #222222;
    font-family: $font-family;
    font-size: 16px;
    line-height: line-height(19, 16);
    font-weight: 400;
  }

  p + p {
    margin-top: 20px;
  }

  h1,
  h2 {
    font-family: $font-family--headings-2;
    font-size: 20px;
    line-height: line-height(23, 20);
    font-weight: 400;
  }

  h1 {
    margin-bottom: 22px;
    margin-top: 22px;
  }

  h2 {
    margin-bottom: 0;
    margin-top: 22px;
  }
}

.breadcrumbs {
  $block-name: &;

  position: sticky;
  top: 65px;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 9999;
  border-bottom: 2px solid #d9d9d9;
  height: 31px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: -5px 16px 10px 16px;
}
</style>

<docs>
  ```jsx
    <div>
      <McRoot>
        Это обязательный компонент, с него начинается любой layout, т.к. здесь находятся глобальные стили.
      </McRoot>
    </div>
  ```
</docs>
