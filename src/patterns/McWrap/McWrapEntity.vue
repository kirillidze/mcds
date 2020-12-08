<template>
  <mc-card :class="classes">
    <!-- @slot Слот контента -->
    <slot />
    <div class="mc-wrap-entity__buttons">
      <!-- @slot Слот для добавления кнопок в начало -->
      <slot name="button-prepend" />
      <mc-button
        v-if="canEdit"
        variation="gray-dark-flat"
        size="m-compact"
        @click.prevent.stop="handleEdit"
      >
        <mc-svg-icon slot="icon-append" name="create" />
      </mc-button>

      <mc-button
        v-if="canDelete"
        variation="gray-dark-flat"
        size="m-compact"
        @click.prevent.stop="handleDelete"
      >
        <mc-svg-icon slot="icon-append" name="delete" />
      </mc-button>
      <!-- @slot Слот для добавления кнопок в конец -->
      <slot name="button-append" />
    </div>
  </mc-card>
</template>

<script>
import McCard from "../McCard"
import McButton from "../../elements/McButton"
import McSvgIcon from "../../elements/McSvgIcon"

export default {
  name: "McWrapEntity",
  components: {
    McCard,
    McButton,
    McSvgIcon,
  },
  status: "ready",
  release: "1.0.0",
  props: {
    canEdit: {
      type: Boolean,
      default: true,
    },
    canDelete: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    hasActions() {
      return this.canEdit || this.canDelete
    },
    classes() {
      return {
        "mc-wrap-entity": true,
        "mc-wrap-entity--has-actions": this.hasActions,
      }
    },
  },
  methods: {
    handleDelete() {
      /**
       * Событие по удалению
       */
      this.$emit("delete")
    },
    handleEdit() {
      /**
       * Событие по редактированию
       */
      this.$emit("edit")
    },
  },
}
</script>

<style lang="scss">
.mc-wrap-entity {
  $block-name: &;

  .mc-card__content {
    position: relative;
  }

  &__buttons {
    @include position(absolute, 0 0 0 null);
    display: none;
    align-items: center;
    background-color: $color-white;
    padding-right: $space-s;
    border-radius: 0 $space-xs $space-xs 0;

    &::before {
      content: "";
      @include position(absolute, 0 100% 0 null);
      height: 100%;
      width: $space-xl;
      background: transparent linear-gradient(270deg, $color-white 0, #fffffff0 40%, #ffffff00 100%);
    }

    .mc-button {
      &:not(:last-child) {
        margin-right: $space-xxxs;
      }

      &:hover {
        .mc-svg-icon {
          color: $color-black !important;
        }
      }
    }
  }

  &--has-actions {
    &:hover,
    &:focus {
      #{$block-name}__buttons {
        display: flex;
      }
    }
  }
}
</style>

<docs>
    ```jsx
    <div>
        <mc-wrap-entity can-edit can-delete>
            <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda commodi culpa fugiat. Accusantium alias assumenda blanditiis dignissimos ducimus eius esse est excepturi fugiat, fugit illum itaque iure laborum maxime mollitia natus nemo odit officia officiis perferendis perspiciatis provident quos, reiciendis repellendus repudiandae saepe sunt suscipit, tempore tenetur voluptate voluptatibus!
            </span>
            <mc-button slot="button-prepend" variation="gray-dark-flat" size="m-compact">
                <mc-svg-icon slot="icon-append" name="error"/>
            </mc-button>

            <mc-button slot="button-append" variation="gray-dark-flat" size="m-compact">
                <mc-svg-icon slot="icon-append" name="drag"/>
            </mc-button>
        </mc-wrap-entity>
    </div>
    ```
</docs>
