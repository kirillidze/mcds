<template>
  <section class="mc-table-card-header">
    <div class="mc-table-card-header__left">
      <slot>
        <mc-button :to="backTo" :exact="true" variation="blue-link" :uppercase="true" size="s">
          <mc-svg-icon slot="icon-prepend" name="keyboard_arrow_left" style="margin-right: 0" />
          {{ buttonBackText }}
        </mc-button>
      </slot>
    </div>
    <div class="mc-table-card-header__right">
      <slot name="right">
        <template v-if="isCustom">
          <slot name="right-custom"></slot>
          <mc-dropdown v-model="editDropdown" position="right" :rotate-icon="false">
            <mc-button
              @click.prevent
              href="#"
              slot="activator"
              text-align="left"
              variation="blue-link"
              size="s"
              :uppercase="true"
            >
              {{ buttonEditText }}
            </mc-button>
            <mc-panel style="max-width: none;">
              <mc-button
                v-for="(link, _index) in editLinks"
                :key="_index"
                href="#"
                @click="handleEditDropdownChange(link)"
                :full-width="true"
                text-align="right"
                variation="black-flat"
              >
                {{ link.name }}
              </mc-button>
            </mc-panel>
          </mc-dropdown>
        </template>
      </slot>
    </div>
  </section>
</template>

<script>
import McButton from "../../elements/McButton"
import McSvgIcon from "../../elements/McSvgIcon"
import McDropdown from "../../patterns/McDropdown"
import McPanel from "../../patterns/McPanel"
export default {
  name: "McTableCardHeader",
  components: {
    McButton,
    McSvgIcon,
    McDropdown,
    McPanel,
  },
  props: {
    isCustom: {
      type: Boolean,
      default: false,
    },
    buttonBackText: {
      type: String,
      default: "Back",
    },
    buttonEditText: {
      type: String,
      default: "Edit",
    },
    backTo: {
      type: String,
      default: "#",
    },
    editLinks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editDropdown: false,
    }
  },
  computed: {},
  methods: {
    handleEditDropdownChange(index) {
      this.$emit("editButtonClicked", index)
    },
  },
}
</script>

<style lang="scss">
.mc-table-card-header {
  $block-name: &;

  display: flex;
  flex-wrap: nowrap;
  background-color: $color-white;
  padding-top: $space-xs;
  padding-bottom: $space-xs;
  padding-left: $space_xxs;
  padding-right: $space_xxs;
  align-items: center;
  height: 100%;
  border-radius: 0 8px 0 0;

  &__left,
  &__right {
    @include layout-flex-fix();
    display: flex;
    flex-wrap: nowrap;

    &:empty {
      display: none;
    }

    > * {
      margin-left: $space-m / 2;
      margin-right: $space-m / 2;
    }
  }

  &__left {
    margin-right: auto;
  }

  &__right {
    margin-left: auto;
  }
}
</style>
