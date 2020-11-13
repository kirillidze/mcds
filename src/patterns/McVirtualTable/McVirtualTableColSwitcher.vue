<template>
  <mc-dropdown class="mc-virtual-table-col-switcher" v-model="dropIsOpen" :position="position">
    <mc-button variation="black-flat" size="m-compact" slot="activator">
      <mc-svg-icon slot="icon-append" :name="icon" fill="rgb(102, 102, 102)" />
    </mc-button>
    <mc-panel>
      <div class="mc-virtual-table-col-switcher__body">
        <template v-for="(column, index) in visiblePanelColumns">
          <mc-button
            variation="black-flat"
            size="l"
            @click="handleClick(column)"
            :key="index"
            text-align="left"
          >
            <mc-field-checkbox :main-text="column.title" v-model="column.visible" />
          </mc-button>
        </template>
      </div>
      <mc-separator />
      <div class="mc-virtual-table-col-switcher__footer">
        <mc-button size="l" variation="light-green" @click="handleSave" text-align="center">{{
          applyText
        }}</mc-button>
      </div>
    </mc-panel>
  </mc-dropdown>
</template>
<script>
import McSeparator from "../../elements/McSeparator"
import McTopLine from "../McTopLine"
import McFieldCheckbox from "../../elements/McField/McFieldCheckbox"
import McPanel from "../McPanel"
import McDropdown from "../McDropdown"
import McButton from "../../elements/McButton"
import McSvgIcon from "../../elements/McSvgIcon"

export default {
  name: "McVirtualTableColSwitcher",
  components: {
    McSeparator,
    McTopLine,
    McFieldCheckbox,
    McPanel,
    McDropdown,
    McButton,
    McSvgIcon,
  },
  props: {
    table: {
      type: Object,
      required: true,
    },
    position: {
      type: String,
      default: "right",
    },
    icon: {
      type: String,
      default: "settings",
    },
    hiddenPanelColumns: {
      type: Array,
      default: () => [],
    },
    userId: {
      type: [String, Number],
      default: null,
    },
    applyText: {
      type: String,
      required: true,
    },
    cardIsOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dropIsOpen: false,
      columns: [],
      usersTableColumns: localStorage.getItem("usersTableColumns")
        ? JSON.parse(localStorage.getItem("usersTableColumns"))
        : [],
    }
  },
  watch: {
    table() {
      this.columns = this.table.getColumns()
      this.hasId && this.initTableColumns()
    },
    cardIsOpen(val) {
      !val &&
        this.$nextTick(() => {
          this.initTableColumns()
        })
    },
  },
  computed: {
    visiblePanelColumns() {
      return this.columns.filter(column => !this.hiddenPanelColumns.includes(column.property))
    },
    hasId() {
      return this.usersTableColumns.some(column => column.id === this.userId)
    },
  },
  methods: {
    handleClick(column) {
      column.visible = !column.visible
    },
    handleSave() {
      const data = {
        id: this.userId,
        hiddenColumns: [],
      }
      const computedUserTableColumns = this.usersTableColumns.map(column => {
        if (column.id === data.id) {
          return {
            ...data,
          }
        }
        return column
      })
      const localStorageArray = this.hasId ? computedUserTableColumns : this.usersTableColumns
      this.columns.map(item => {
        !item.visible && data.hiddenColumns.push(item.property)
      })
      !this.hasId && this.usersTableColumns.push(data)
      localStorage.setItem("usersTableColumns", JSON.stringify(localStorageArray))
      this.table.refreshColumn()
      this.dropIsOpen = false
    },
    async initTableColumns() {
      const [currentUserColumns] = this.usersTableColumns.filter(
        column => column.id === this.userId
      )
      this.columns.map(column => {
        currentUserColumns.hiddenColumns.includes(column.property) && this.table.hideColumn(column)
      })
      await this.table.refreshColumn()
      await this.table.syncData()
    },
  },
}
</script>
<style lang="scss">
.mc-virtual-table-col-switcher {
  @include custom-scroll();
  &__body {
    padding-bottom: 8px;
    max-height: 500px;
    overflow-y: auto;
  }

  &__footer {
    padding-top: 8px;
  }

  .mc-panel {
    display: flex;
    flex-direction: column;
    width: 344px;
    max-width: none;

    .mc-button {
      width: 100%;

      &.mc-button--text-align-left {
        .mc-button__text {
          text-align: left;
        }
      }
    }

    .mc-field-checkbox {
      pointer-events: none;
    }

    .mc-field-checkbox__name-text {
      &:before {
        top: 3px;
      }
    }
  }
}
</style>
