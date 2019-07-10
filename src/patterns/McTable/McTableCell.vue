<template>
  <td class="mc-table-cell">
    <slot></slot>
  </td>
</template>

<script>
export default {
  name: "McTableCell",
}
</script>

<style lang="scss">
.mc-table-cell {
  $block-name: &;
}
</style>
