<template>
  <div class="mc-card" :class="classes">
    <div class="mc-card__header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="mc-card__content">
      <slot />
    </div>
    <component v-if="isLink" :is="tag" v-bind="tagBind" class="mc-card__link"> </component>
  </div>
</template>

<script>
import McGridRow from "./McGrid/McGridRow"
import McLines from "./McLines"
import McAvatar from "../elements/McAvatar/McAvatar"
import McGridCol from "./McGrid/McGridCol"
import McPreview from "./McPreview"
import McTitle from "../elements/McTitle"
import McSvgIcon from "../elements/McSvgIcon"
import McButton from "../elements/McButton"
export default {
  name: "McCard",
  components: { McButton, McSvgIcon, McTitle, McPreview, McGridCol, McAvatar, McLines, McGridRow },
  status: "ready",
  release: "1.0.0",

  props: {
    /**
     *  Если нужна ссылка внутри приложения:
     * `{name: 'test', params: { id: test.id }}`
     */
    to: {
      default: null,
    },
    /**
     *  Если нужна обычная ссылка:
     * `https://mediacube.agency/`
     */
    href: {
      default: null,
    },
    /**
     *  По умолчанию ожидается использование в `nuxt.js`
     *
     */
    nuxt: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes() {
      return {
        "mc-card--has-link": this.isLink,
      }
    },
    isLink() {
      return this.to || this.href
    },
    tag() {
      let link = this.nuxt ? "nuxt-link" : "router-link"

      return this.to ? link : "a"
    },
    tagBind() {
      const result = {}

      if (this.to) {
        result.to = this.to
      } else if (this.href) {
        result.href = this.href
      }

      return result
    },
  },
}
</script>

<style lang="scss">
.mc-card {
  position: relative;
  display: block;
  border-radius: $radius-l;
  border: 2px solid $border-color;
  background: $color-white;

  &__content {
    padding: $size-m;
  }

  &__header {
    padding: $size-m;
    border-bottom: 2px solid $border-color;
  }

  &__link {
    @include position(absolute, 0);
  }

  &--has-link {
    transition: all $duration-quickly;

    .mc-button {
      z-index: 1;
    }

    &:hover,
    &:focus {
      border-color: darken($border-color, 10%);
    }

    &:active {
      border-color: darken($border-color, 15%);
    }
  }
}
</style>

<docs>
    ```jsx
    <div style="max-width: 600px">
        <McCard href="javascript:void(0)">
            <template slot="header">
                <McPreview>
                    <McAvatar rounded slot="left" />
                    <McTitle :level="3" size="m" slot="top">
                       WG_Global
                    </McTitle>
                    <McGridRow slot="right" :gutter-x="5" :gutter-y="5">
                        <McGridCol>
                            <McButton variation="primary-invert" size="s-compact">
                                <McSvgIcon slot="icon-append" name="create"/>
                            </McButton>
                        </McGridCol>
                        <McGridCol>
                            <McButton variation="danger-invert" size="s-compact">
                                <McSvgIcon slot="icon-append" name="delete"/>
                            </McButton>
                        </McGridCol>
                    </McGridRow>
                </McPreview>
            </template>
            <McGridRow :gutter-x="20">
                <McGridCol :span="4">
                    <McLines title="Бюджет">
                        1 200 $
                    </McLines>
                </McGridCol>
                <McGridCol :span="4">
                    <McLines title="Блогеров">
                        129
                    </McLines>
                </McGridCol>
                <McGridCol :span="4">
                    <McLines title="Дедлайн">
                        01.11.2018
                    </McLines>
                </McGridCol>
            </McGridRow>
        </McCard>

        <br>

        <McCard>
            <McGridRow :gutter-x="30" :gutter-y="10">
                <McGridCol>
                    <McLines title="Доля сети">
                        1 200 $
                    </McLines>
                </McGridCol>
                <McGridCol>
                    <McLines title="Доля орг.">
                        129 $
                    </McLines>
                </McGridCol>
                <McGridCol>
                    <McLines title="Мин. доля канала">
                        1 200 $
                    </McLines>
                </McGridCol>
                <McGridCol>
                    <McLines title="Макс. доля канала">
                        1 20000 $
                    </McLines>
                </McGridCol>
                <McGridCol>
                    <McLines title="Макс. срок контракта">
                        1 20000 $
                    </McLines>
                </McGridCol>
            </McGridRow>
        </McCard>

        <br>

        <McCard href="javascript:void(0)">
            <McPreview>
                <McAvatar slot="left"/>
                <McTitle slot="top">Facebook</McTitle>
                <McGridRow slot="bottom" :gutter-x="10" :gutter-y="6">
                    <McGridCol>
                        <McTitle size="s">
                            <McSvgIcon slot="icon-prepend" name="copyright"/>
                            Агентство 2, Агентство 3
                        </McTitle>
                    </McGridCol>
                    <McGridCol>
                        <McTitle size="s">
                            <McSvgIcon slot="icon-prepend" name="location_on"/>
                            United States
                        </McTitle>
                    </McGridCol>
                </McGridRow>
            </McPreview>
        </McCard>

        <br>

        <McCard>
            <McPreview>
                <McAvatar rounded slot="left"/>
                <McTitle slot="top">Алена Товстик</McTitle>
                <McTitle color="gray" size="s" slot="bottom">
                    Основной владелец
                </McTitle>
            </McPreview>
        </McCard>

        <br>

        <McCard href="javascript:void(0)">
            <McPreview>
                <McAvatar src="//i.ytimg.com/vi/If1sbtliqQk/default.jpg" slot="left"/>
                <McTitle :ellipsis="false" slot="top">Official Video: Nike Currant Song | Jassi Gill | Neha Kakkar | Sukh-E Muzical Doctorz | Jaani</McTitle>
            </McPreview>
        </McCard>

        <br>

        <McCard>
            <McGridRow justify="between" :gutter-x="20" :gutter-y="10">
                <McGridCol>
                    <McTitle>80-20</McTitle>
                </McGridCol>
                <McGridCol>
                    <McTitle size="xs">22.11.2018 - Текущий момент</McTitle>
                </McGridCol>
            </McGridRow>
        </McCard>

        <br>

        <McCard href="javascript:void(0)">
            <McPreview>
                <McSvgIcon size="m" name="videoblocks" slot="left"/>
                <McTitle size="l" slot="top">VidIQ Pro</McTitle>
            </McPreview>
        </McCard>
    </div>
    ```
</docs>
