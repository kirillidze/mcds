<template>
  <component
    :is="tag"
    v-bind="tagBind"
    :class="[rootClassName, classes]"
    @click.prevent="handleClick"
  >
    <slot></slot>
  </component>
</template>

<script>
import McLines from "../McLines"
import McTitle from "../../elements/McTitle"
export default {
  name: "McCellBordered",
  components: { McTitle, McLines },
  status: "ready",
  release: "1.0.0",
  data() {
    return {
      rootClassName: "mc-cell-bordered",
      isActive: false,
    }
  },
  props: {
    /**
     *  Цвет рамки
     *
     */
    borderColor: {
      type: String,
      default: "transparent",
    },
    /**
     *  Отключенное состояние
     *
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     *  Градиент
     *
     */
    gradient: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      return {
        [`${this.rootClassName}--border-color-${this.borderColor}`]: this.borderColor,
        [`${this.rootClassName}--border-gradient`]: this.gradient,
        [`${this.rootClassName}--tappable`]: this.isTappable,
        [`${this.rootClassName}--is-active`]: this.isActive,
        [`${this.rootClassName}--is-disable`]: this.disabled,
      }
    },

    isTappable() {
      return !!this.$listeners.click
    },

    tag() {
      return this.isTappable ? "a" : "section"
    },

    tagBind() {
      return {
        href: this.isTappable && "#",
      }
    },
  },

  methods: {
    handleClick() {
      if (this.isTappable) {
        this.$emit("click", this.isActive)
        this.isActive = !this.isActive
      }
    },
  },
}
</script>

<style lang="scss">
.mc-cell-bordered {
  $block-name: &;

  display: flex;
  flex-direction: column;
  text-decoration: none;
  position: relative;
  border: 1px solid $color-gray-lighter;
  border-radius: $radius-m;
  min-height: $tappable-element-xl;
  padding: $space-m / 2;
  transition: all $duration-quickly;

  &::after {
    @include pseudo();
    left: -$space-xxxs;
    top: -$space_xxxs + 1;
    bottom: -$space_xxxs + 1;
    width: $space-xxs;
    border-radius: $radius-m 0 0 $radius-m;
    background-color: transparent;
  }

  .mc-lines {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &--tappable {
    &:hover {
      background-color: $color-gray-lightest;
    }

    &:active {
      background-color: darken($color-gray-lightest, 2%);
    }
  }

  &--is-disable {
    opacity: $opacity-disabled;
    pointer-events: none;
  }

  @each $color, $value in $token-colors {
    &--border-color-#{$color} {
      &::after {
        background-color: $value;
      }

      &#{$block-name} {
        &--is-active {
          background-color: fade-out($value, 0.85);

          &:active {
            background-color: darken(fade-out($value, 0.85), 15%);
          }
        }

        &--border-gradient {
          &::after {
            background-image: linear-gradient($value, adjust_hue($value, -45));
          }
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  let eventTest = (val) => alert(val)
  <div>
    <McCellBordered>
      <McLines>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McLines>
    </McCellBordered>

    <br>

    <McCellBordered border-color="red-light">
      <McLines>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McLines>
    </McCellBordered>

    <br>

    <McCellBordered border-color="primary" @click>
      <McLines>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McLines>
    </McCellBordered>

    <br>

    <McCellBordered gradient border-color="gorse" @click>
      <McLines>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McLines>
    </McCellBordered>

    <br>

    <McCellBordered disabled border-color="bright-turquoise-darker" @click>
      <McLines>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McLines>
    </McCellBordered>
  </div>
  ```
</docs>
