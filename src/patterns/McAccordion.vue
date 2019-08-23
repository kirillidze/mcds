<template>
  <div class="mc-accordion">
    <slot />
  </div>
</template>

<script>
import { findChildrenComponents } from "../utils/treeSearch"

import McCollapse from "./McCollapse"
import McButton from "../elements/McButton"

export default {
  name: "McAccordion",
  components: { McButton, McCollapse },
  status: "ready",
  release: "1.0.0",
  created() {
    this.$on("toggle", function(value) {
      this.handleToggle(value)
    })
  },
  data() {
    return {
      isClosed: true,
    }
  },

  methods: {
    handleToggle({ value, component }) {
      let $collapse = findChildrenComponents(this, "McCollapse")
      this.isClosed = $collapse.every($child => {
        return !$child.isCollapsed
      })

      if (value === false) return

      $collapse.forEach($child => {
        if (component !== $child) {
          $child.close()
        }
      })
    },
  },
}
</script>

<style lang="scss">
.mc-accordion {
  $block-name: &;
}
</style>

<docs>
    ```jsx
    <div>
        <McAccordion>
            <McCollapse>
                <mc-button slot="activator">Заголовок</mc-button>
                <template slot="body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                    facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                    tempore unde!
                </template>
            </McCollapse>
            <McCollapse>
                <mc-button slot="activator">Заголовок 2</mc-button>
                <template slot="body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                    facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                    tempore unde!
                </template>
            </McCollapse>
        </McAccordion>
    </div>
    ```
</docs>
