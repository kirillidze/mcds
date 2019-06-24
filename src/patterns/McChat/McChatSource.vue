<template>
  <div class="channel-chat-source">
    <McDropdown v-model="isOpened">
      <McButton slot="activator" variation="primary-link">
        {{ activeSource.name }}
        <McSvgIcon name="arrow_drop_down"></McSvgIcon>
      </McButton>
      <McPanel>
        <McButton
          v-for="source in sources"
          :key="source.value"
          :is-active="source.value === activeSource.value"
          href="#"
          @click.prevent="_ => handleChange(source)"
          full-width
          text-align="left"
          variation="gray-darkest-flat"
          size="m"
        >
          {{ source.name }}
        </McButton>
      </McPanel>
    </McDropdown>
  </div>
</template>

<script>
import McDropdown from "../McDropdown"
import McButton from "../../elements/McButton"
import McPanel from "../McPanel"
import McSvgIcon from "../../elements/McSvgIcon"
export default {
  name: "McChatSource",
  components: { McSvgIcon, McPanel, McButton, McDropdown },
  props: {
    value: {
      type: String,
      required: true,
    },
    sources: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpened: false,
    }
  },
  computed: {
    activeSource() {
      return this.sources.find(s => s.value === this.value)
    },
  },
  methods: {
    handleChange(source) {
      this.$emit("input", source.value)
    },
  },
}
</script>

<style lang="scss">
.channel-chat-source {
}
</style>
