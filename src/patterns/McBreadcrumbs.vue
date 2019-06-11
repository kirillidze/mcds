<template>
  <div class="mc-breadcrumbs">
    <McBreadcrumb
      v-for="(item, index) in items"
      :key="index"
      :href="item.href"
      :title="item.title"
    ></McBreadcrumb>
  </div>
</template>

<script>
import McBreadcrumb from "../elements/McBreadcrumb"

export default {
  name: "McBreadcrumbs",
  status: "deprecated",
  release: "1.0.0",
  components: { McBreadcrumb },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
$gutters: 5px;
$font-size: 16px;
$line-height: line-height(19, 16);

.mc-breadcrumbs {
  $block-name: &;

  list-style: none;
  padding-left: 0;
  margin-top: -$gutters;
  margin-bottom: -$gutters;
  display: flex;
  flex-wrap: nowrap;
  margin-left: -$gutters;
}
</style>

<docs>
  ```jsx
  <McBreadcrumbs active="Dashboard" :items="[
    {title: 'Рейтинг каналов', href: '#'},
    {title: 'Ed Sheeran', href: '#'},
    {title: 'Владилен', href: '#'},
  ]"/>
  ```
</docs>
