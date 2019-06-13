<template>
  <McFieldText
    :type="type"
    :value="value"
    @input="handleInput"
    :title="title"
    :design="design"
    :theme="theme"
    :disabled="disabled"
    :name="name"
    :placeholder="placeholder"
  >
    <template slot="append">
      <McSvgIcon
        v-if="type === 'password'"
        name="visibility"
        type="a"
        href="#"
        @click.native.prevent="handleToggleClick"
      />
      <McSvgIcon
        v-else
        name="visibility_off"
        type="a"
        href="#"
        @click.native.prevent="handleToggleClick"
      />
    </template>
  </McFieldText>
</template>

<script>
import McFieldText from "./McFieldText"
import McSvgIcon from "./McSvgIcon"

export default {
  name: "McFieldPassword",
  components: { McSvgIcon, McFieldText },
  status: "deprecated",
  release: "3.5.0",
  props: {
    title: {
      type: String,
      default: null,
    },
    design: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null,
    },
    errors: {
      type: Array,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      type: "password",
    }
  },
  methods: {
    handleToggleClick() {
      this.type = this.type === "password" ? "text" : "password"
    },
    handleInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>

<docs>
    ```jsx
    let text = null
    <div>
        <McFieldPassword
                v-model="text"
                theme="light"
                type="text"
                design="simple"
        />
    </div>
    ```
</docs>
