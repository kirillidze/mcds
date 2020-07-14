<template>
  <section class="mc-table-card-header">
    <div class="mc-table-card-header__left">
      <!-- @slot Слот контента -->
      <slot>
        <mc-button :to="backTo" exact variation="blue-link" uppercase size="s">
          <mc-svg-icon slot="icon-prepend" name="keyboard_arrow_left" style="margin-right: 0" />
          {{ buttonBackText }}
        </mc-button>
      </slot>
    </div>
    <div class="mc-table-card-header__right">
      <slot name="right">
        <!-- @slot download -->
        <slot name="download" />
        <template v-if="isCustom">
          <!-- @slot right-custom -->
          <slot name="right-custom" />

          <mc-dropdown
            v-model="editDropdown"
            class="mc-table-card-header__right-custom-dropdown"
            position="right"
            :rotate-icon="false"
          >
            <mc-button
              slot="activator"
              href="#"
              text-align="left"
              variation="blue-link"
              size="s"
              uppercase
              @click.prevent
            >
              {{ buttonEditText }}
            </mc-button>
            <mc-panel style="max-width: none;">
              <mc-button
                v-for="(link, _index) in editLinks"
                :key="_index"
                full-width
                text-align="right"
                variation="black-flat"
                @click="() => handleEditDropdownChange(link)"
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
  status: "ready",
  release: "1.0.0",
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
    handleEditDropdownChange(link) {
      /**
       * Событие клику кнопки
       * из списка редактирования
       * @property {Object}
       */
      this.$emit("editButtonClicked", link)
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
  padding: $space-xs $space-xxs;
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

    &-custom-dropdown {
      display: flex;
      align-items: center;
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

<docs>
  ```jsx
  const editLinks = [
    { name: 'Профиль'},
    { name: 'Транзакции'},
    { name: 'Безопасность'},
    { name: 'Выйти'},
  ]
  <div>
    <div>
      <mc-table-card-header>
        <template>
          <mc-button uppercase variation="blue-link">Назад</mc-button>
        </template>
        <template slot="right">
          <mc-button uppercase variation="blue-link">Запросить владельца</mc-button>
          <mc-button uppercase variation="blue-link">Запросить данные AI</mc-button>
          <mc-button uppercase variation="blue-link">Редактировать</mc-button>
        </template>
      </mc-table-card-header>

      <mc-table-card-header is-custom buttonEditText="Редактировать" :editLinks="editLinks">
        <template>
          <mc-button uppercase variation="blue-link">Назад</mc-button>
        </template>
        <mc-button size="m-compact" variation="blue-flat" slot="download">
          <mc-svg-icon name="get_app" />
        </mc-button>
        <template slot="right-custom">
          <mc-button uppercase variation="blue-link">Запросить владельца</mc-button>
        </template>
      </mc-table-card-header>
    </div>

  </div>
  ```
</docs>
