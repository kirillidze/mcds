<template>
  <section class="mc-header-part-left">
    <McLogo :title="logoTitle" :src="logoSrc" :href="logoHref" :to="logoTo" />
  </section>
</template>

<script>
import McLogo from "../../../elements/McLogo"
export default {
  name: "McHeaderPartLeft",
  status: "ready",
  release: "0.0.1",
  components: { McLogo },

  props: {
    /**
     *  Название сервиса
     *
     */
    logoTitle: {
      type: String,
      default: "Mediacube",
    },
    /**
     *  Путь до изображения
     *
     */
    logoSrc: {
      type: String,
      default: null,
    },
    /**
     *  Если нужна обычная ссылка:
     * `https://mediacube.agency/`
     */
    logoHref: {
      default: null,
    },
    /**
     *  Если нужна ссылка внутри приложения:
     * `{name: 'test', params: { id: test.id }}`
     */
    logoTo: {
      default: null,
    },
  },
}
</script>

<style lang="scss">
.mc-header-part-left {
  $block-name: &;

  flex: 0 0 auto;
  display: flex;
  flex-wrap: nowrap;
  padding-right: $space-l;
}
</style>

<docs>
  ```jsx
  <div>
    <McHeaderPartLeft
            logo-title="Mediacube"
            logo-src="/icons/mediacube.svg"
            logo-href="javascript:void(0);"
    />
  </div>
  ```
</docs>
