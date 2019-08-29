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
import McCell from "./McCells/McCell"
import McAvatar from "../elements/McAvatar/McAvatar"
import McGridCol from "./McGrid/McGridCol"
import McPreview from "./McPreview"
import McTitle from "../elements/McTitle"
import McSvgIcon from "../elements/McSvgIcon"
import McButton from "../elements/McButton"
import McTooltip from "../elements/McTooltip"
export default {
  name: "McCard",
  components: {
    McTooltip,
    McButton,
    McSvgIcon,
    McTitle,
    McPreview,
    McGridCol,
    McAvatar,
    McCell,
    McGridRow,
  },
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
    /**
     *  target
     *
     */
    target: {
      type: String,
      default: "_self",
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
  border: 1px solid $color-outline-gray;
  background: $color-white;

  &__content {
    padding: $size-m;
  }

  &__header {
    padding: $size-m;
    border-bottom: 1px solid $color-outline-gray;
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
      border-color: darken($color-outline-gray, 10%);
    }

    &:active {
      border-color: darken($color-outline-gray, 15%);
    }
  }
}
</style>

<docs>
    ```jsx
    <div style="max-width: 700px">
        <McCard href="javascript:void(0)">
            <McPreview slot="header">
                <McAvatar rounded slot="left" />
                <McTitle :level="3" size="m" slot="top">
                   WG_Global
                </McTitle>
                <McGridRow slot="right" :gutter-x="5" :gutter-y="5">
                    <McGridCol>
                        <McTooltip size="s" placement="top" content="Редактировать">
                            <McButton variation="blue-invert" size="s-compact">
                                <McSvgIcon slot="icon-append" name="create"/>
                            </McButton>
                        </McTooltip>
                    </McGridCol>
                    <McGridCol>
                        <McTooltip size="s" placement="top" content="Удалить">
                            <McButton variation="red-invert" size="s-compact">
                                <McSvgIcon slot="icon-append" name="delete"/>
                            </McButton>
                        </McTooltip>
                    </McGridCol>
                </McGridRow>
            </McPreview>
            <McGridRow :gutter-x="20">
                <McGridCol :span="4">
                    <McCell title="Бюджет">
                        <McTitle tag-name="p" size="m">
                            1 200 $
                        </McTitle>
                    </McCell>
                </McGridCol>
                <McGridCol :span="4">
                    <McCell title="Блогеров">
                        <McTitle tag-name="p" size="m">
                            129
                        </McTitle>
                    </McCell>
                </McGridCol>
                <McGridCol :span="4">
                    <McCell title="Дедлайн">
                        <McTitle tag-name="p" size="m">
                            01.11.2018
                        </McTitle>
                    </McCell>
                </McGridCol>
            </McGridRow>
        </McCard>

        <br>

        <McCard href="#" target="_blank">
            <McPreview slot="header">
                <McAvatar rounded slot="left" />
                <McTitle :level="3" size="m" slot="top">
                    Gukie
                </McTitle>
            </McPreview>
            <McGridRow :gutter-x="20">
                <McGridCol :span="6">
                    <McCell title="Основной владелец">
                        <McTitle tag-name="p" size="m">
                            Eugene Solonovich
                        </McTitle>
                    </McCell>
                </McGridCol>
                <McGridCol :span="6">
                    <McCell title="Владельцы">
                        <McGridRow :gutter-x="5" :gutter-y="5">
                            <McGridCol>
                                <McButton size="s">Roman Kolodko</McButton>
                            </McGridCol>
                            <McGridCol>
                                <McButton size="s">Dasha</McButton>
                            </McGridCol>
                        </McGridRow>
                    </McCell>
                </McGridCol>
            </McGridRow>
        </McCard>

        <br>

        <McCard>
            <McGridRow justify="between" slot="header" :gutter-x="30" :gutter-y="10">
                <McGridCol>
                    <McGridRow :gutter-x="10" :gutter-y="6">
                        <McGridCol>
                            <McTitle size="s">
                                <McSvgIcon slot="icon-prepend" name="shopping_cart"/>
                                Агентство 2
                            </McTitle>
                        </McGridCol>
                        <McGridCol>
                            <McTitle uppercase size="s">
                                <McSvgIcon slot="icon-prepend" name="event"/>
                                Сегодня, в 16:24
                            </McTitle>
                        </McGridCol>
                    </McGridRow>
                </McGridCol>
                <McGridCol>
                    <McGridRow :gutter-x="5" :gutter-y="5">
                        <McGridCol>
                            <McTooltip size="s" placement="top" content="Редактировать">
                                <McButton variation="blue-invert" size="s-compact">
                                    <McSvgIcon slot="icon-append" name="create"/>
                                </McButton>
                            </McTooltip>
                        </McGridCol>
                        <McGridCol>
                            <McTooltip size="s" placement="top" content="Удалить">
                                <McButton variation="red-invert" size="s-compact">
                                    <McSvgIcon slot="icon-append" name="delete"/>
                                </McButton>
                            </McTooltip>
                        </McGridCol>
                    </McGridRow>
                </McGridCol>
            </McGridRow>
            <McGridRow stretch :gutter-x="30" :gutter-y="10">
                <McGridCol>
                    <McCell title="Преролл">
                        <McTitle tag-name="p" size="l">
                            10$
                        </McTitle>
                        <McCell tag-name="p" size="s">
                            <McTitle tag-name="span" color="light-green" size="s">
                                10$
                            </McTitle>
                            <McTitle color="gray" tag-name="span" size="s">
                                (2%)
                            </McTitle>
                        </McCell>
                    </McCell>
                </McGridCol>
                <McGridCol>
                    <McCell title="Нативка">
                        <McTitle tag-name="p" size="l">
                            12$
                        </McTitle>
                        <McCell tag-name="p" size="s">
                            <McTitle tag-name="span" color="light-green" size="s">
                                12$
                            </McTitle>
                            <McTitle color="gray" tag-name="span" size="s">
                                (4%)
                            </McTitle>
                        </McCell>
                    </McCell>
                </McGridCol>
                <McGridCol>
                    <McCell title="Интеграция">
                        <McTitle tag-name="p" size="l">
                            12$
                        </McTitle>
                        <McCell tag-name="p" size="s">
                            <McTitle tag-name="span" color="light-green" size="s">
                                12$
                            </McTitle>
                            <McTitle color="gray" tag-name="span" size="s">
                                (4%)
                            </McTitle>
                        </McCell>
                    </McCell>
                </McGridCol>
                <McGridCol>
                    <McCell title="Эксклюзив">
                        <McTitle tag-name="p" size="l">
                            12$
                        </McTitle>
                        <McCell tag-name="p" size="s">
                            <McTitle tag-name="span" color="light-green" size="s">
                                17$
                            </McTitle>
                            <McTitle color="gray" tag-name="span" size="s">
                                (43%)
                            </McTitle>
                        </McCell>
                    </McCell>
                </McGridCol>
            </McGridRow>
        </McCard>

        <br>

        <McCard>
            <McGridRow :gutter-x="30" :gutter-y="10">
                <McGridCol>
                    <McCell title="Доля сети">
                        <McTitle tag-name="p" size="m">
                            1 200 $
                        </McTitle>
                    </McCell>
                </McGridCol>
                <McGridCol>
                    <McCell title="Доля орг.">
                        <McTitle tag-name="p" size="m">
                            129 $
                        </McTitle>
                    </McCell>
                </McGridCol>
                <McGridCol>
                    <McCell title="Мин. доля канала">
                        <McTitle tag-name="p" size="m">
                            1 200 $
                        </McTitle>
                    </McCell>
                </McGridCol>
                <McGridCol>
                    <McCell title="Макс. доля канала">
                        <McTitle tag-name="p" size="m">
                            1 20000
                        </McTitle>$
                    </McCell>
                </McGridCol>
                <McGridCol>
                    <McCell title="Макс. срок контракта">
                        <McTitle tag-name="p" size="m">
                            1 20000 $
                        </McTitle>
                    </McCell>
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
