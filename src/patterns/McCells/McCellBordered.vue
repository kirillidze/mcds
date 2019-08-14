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
import McCell from "../McCells/McCell"
import McTitle from "../../elements/McTitle"
export default {
  name: "McCellBordered",
  components: { McTitle, McCell },
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
  border: 1px solid $color-border;
  border-radius: $radius-m;
  min-height: $tappable-element-xl - 10px;
  padding: $space_xs $space_xs $space_xs $space_s;
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

  .mc-cell {
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
      <McCell>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McCell>
    </McCellBordered>

    <br>

    <McCellBordered border-color="red-light">
      <McCell>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McCell>
    </McCellBordered>

    <br>

    <McCellBordered border-color="primary" @click>
      <McCell>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McCell>
    </McCellBordered>

    <br>

    <McCellBordered gradient border-color="gorse" @click>
      <McCell>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McCell>
    </McCellBordered>

    <br>

    <McCellBordered disabled border-color="bright-turquoise-darker" @click>
      <McCell>
        <McTitle color="gray-dark" slot="title" size="xs" uppercase>
          Доля организации
        </McTitle>
        <McTitle tag-name="p" size="l">
          140 873 $
        </McTitle>
      </McCell>
    </McCellBordered>
  </div>
  ```
</docs>
