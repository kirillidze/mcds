<template>
  <div class="channel-chat-source">
    <mc-dropdown v-model="isOpened">
      <mc-button slot="activator" variation="blue-link">
        {{ activeSource.name }}
        <mc-svg-icon name="arrow_drop_down" slot="icon-append" />
      </mc-button>
      <mc-panel>
        <mc-button
          v-for="source in sources"
          :key="source.value"
          :is-active="source.value === activeSource.value"
          href="#"
          @click.prevent="_ => handleChange(source)"
          full-width
          text-align="left"
          variation="black-flat"
        >
          {{ source.name }}
        </mc-button>
      </mc-panel>
    </mc-dropdown>
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
      this.isOpened = false
      /**
       * Событие селекта
       * @property {Object}
       */
      this.$emit("input", source)
    },
  },
}
</script>

<style lang="scss">
.channel-chat-source {
}
</style>

<docs>
  ```jsx
  let sources = [
  { name: 'Источник 1', value: '1' },
  { name: 'Другой чат', value: '2' },
  ]
  let source = '1';
  let handleSourceInput = s => {
    alert(s.name);
    console.log(s.value);
    source = s.value;
  };
  <mc-chat-source :sources="sources" :value="source" @input="handleSourceInput" />
  ```
</docs>
