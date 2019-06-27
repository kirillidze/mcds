<template>
  <div class="mc-accordion">
    <slot />
  </div>
</template>

<script>
import McCollapse from "./McCollapse"

export default {
  name: "McAccordion",
  components: { McCollapse },
  status: "ready",
  release: "1.0.0",
  created() {
    this.$on("toggle", function(value) {
      this.handleToggle(value)
    })
  },
  methods: {
    handleToggle({ value, component }) {
      if (value === false) return
      this.$children.forEach($collapse => {
        if ($collapse.$options.name === "McCollapse") {
          if (component !== $collapse) {
            $collapse.close()
          }
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
                <template>Заголовок 1</template>
                <template slot="body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cum delectus doloribus ducimus
                    facilis nostrum quae velit. Architecto dolore esse, excepturi, illum modi nam optio quam quas quia
                    tempore unde!
                </template>
            </McCollapse>
            <McCollapse>
                <template>Заголовок 2</template>
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
