<template>
  <div class="mc-wrap-collapse" :class="classes">
    <mc-collapse @toggle="handleToggle">
      <div class="mc-wrap-collapse__activator" slot="activator">
        <mc-grid-row justify="between" align="middle" :gutter-x="8" :wrap="false">
          <mc-grid-col class="mc-wrap-collapse__header">
            <slot name="head" />

            <div class="mc-wrap-collapse__buttons" v-if="canDelete || isDraggable">
              <mc-button
                v-if="canDelete"
                variation="gray-dark-flat"
                size="m-compact"
                @click.stop="handleDelete"
              >
                <mc-svg-icon slot="icon-append" name="delete" />
              </mc-button>
              <mc-button
                v-if="isDraggable"
                variation="gray-dark-flat"
                size="m-compact"
                @click.stop="handleDrag"
                v-drag
              >
                <mc-svg-icon name="drag" size="s" />
              </mc-button>
            </div>
          </mc-grid-col>

          <template v-if="$slots.body">
            <mc-grid-col v-if="isWarning && !toggled">
              <mc-svg-icon
                v-if="isWarning && !toggled"
                name="warning"
                fill="rgb(244, 62, 62)"
                size="s"
              />
            </mc-grid-col>
            <mc-grid-col style="display: flex;" v-if="!(isWarning && !toggled)">
              <mc-svg-icon
                class="mc-wrap-collapse__icon-arrow"
                name="arrow_drop_down"
                :fill="arrowColor"
                size="s"
              />
            </mc-grid-col>
          </template>
        </mc-grid-row>
        <slot name="head-bottom" />
      </div>

      <slot name="body" slot="body" />
    </mc-collapse>
  </div>
</template>

<script>
import { HandleDirective } from "vue-slicksort"
import McCollapse from "../McCollapse"
import McGridCol from "../McGrid/McGridCol"
import McGridRow from "../McGrid/McGridRow"
import McSvgIcon from "../../elements/McSvgIcon"
import McButton from "../../elements/McButton"

export default {
  name: "McWrapCollapse",
  components: {
    McCollapse,
    McGridCol,
    McGridRow,
    McSvgIcon,
    McButton,
  },
  status: "ready",
  release: "1.0.0",
  directives: { drag: HandleDirective },
  data() {
    return {
      toggled: false,
    }
  },
  props: {
    colored: {
      type: Boolean,
      default: false,
    },
    arrowColor: {
      type: String,
      default: "rgb(102, 102, 102)",
    },
    isWarning: {
      type: Boolean,
      default: false,
    },
    isDraggable: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleToggle() {
      this.$emit("toggle")
      this.toggled = !this.toggled
    },
    handleDelete() {
      this.$emit("delete")
    },
    handleDrag() {
      this.$emit("drag")
    },
  },
  computed: {
    classes() {
      return {
        "mc-wrap-collapse--is-open": this.toggled,
        "mc-wrap-collapse--is-empty": !this.$slots.body,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-wrap-collapse {
  $block-name: &;

  position: relative;
  border-radius: $radius-l;
  border: 1px solid $color-outline-gray;
  background-color: $color-white;

  &__activator {
    position: relative;
  }

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 100%;
    min-width: 0;
    @include child-indent-right($space-xs);
  }

  &__buttons {
    @include position(absolute, 0 0 0 null);
    @include child-indent-right($space-xs);
    display: none;
    align-items: center;
    background-color: $color-white;
    padding-right: $space-xs;
    border-radius: 0 $space-xs $space-xs 0;

    &::before {
      content: "";
      @include position(absolute, 0 100% 0 null);
      height: 100%;
      width: $space-xl;
      background: transparent linear-gradient(270deg, $color-white 0, #fffffff0 40%, #ffffff00 100%);
    }

    .mc-button {
      &:hover {
        .mc-svg-icon {
          color: $color-black !important;
        }
      }
    }
  }

  &:hover,
  &:focus {
    #{$block-name}__buttons {
      display: flex;
    }
  }

  .mc-collapse {
    &__body-inner {
      border-top: 1px solid $color-outline-gray;
    }
  }

  #{$block-name}__icon-arrow {
    transition: transform $duration-standart ease;
  }

  .mc-collapse {
    position: relative;
    z-index: 3;
    &__header {
      display: block;
      padding: 12px;
    }

    &__body-inner {
      padding: 12px;
    }

    &--is-open {
      #{$block-name}__icon-arrow {
        transform: rotate(-180deg);
        svg {
          fill: $color-black !important;
        }
      }
    }
  }

  .mc-grid-row {
    @media #{$media-query-m-down} {
      align-items: flex-start;
    }
  }

  &:not(&--is-empty)#{$block-name}:not(&--is-open) {
    &:hover,
    &:focus {
      box-shadow: 0 0 0 1px $color-blue;
      border: 1px solid $color-blue;

      #{$block-name}__icon-arrow {
        svg {
          fill: $color-blue !important;
        }
      }
    }
  }
}
</style>

<docs>
    ```jsx
        <div>
            <mc-wrap-collapse :can-delete="true" :is-draggable="true">
                 <span slot="head">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda commodi culpa fugiat. Accusantium alias assumenda blanditiis dignissimos ducimus eius esse est excepturi fugiat, fugit illum itaque iure laborum maxime mollitia natus nemo odit officia officiis perferendis perspiciatis provident quos, reiciendis repellendus repudiandae saepe sunt suscipit, tempore tenetur voluptate voluptatibus!
                 </span>
                <span slot="head-bottom">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda commodi culpa fugiat.
                </span>
                <span slot="body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolores excepturi id maiores minima, reiciendis!
                </span>
            </mc-wrap-collapse>
        </div>
    ```
</docs>
