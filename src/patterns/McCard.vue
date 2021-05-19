<template>
  <div class="mc-card" :class="classes">
    <div class="mc-card__header" v-if="$slots.header">
      <!-- @slot Слот хедера -->
      <slot name="header" />
    </div>
    <div class="mc-card__content">
      <!-- @slot Слот контента -->
      <slot />
    </div>
    <component v-if="isLink" :is="tag" v-bind="tagBind" class="mc-card__link" />
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
        <mc-card href="javascript:void(0)">
            <mc-preview slot="header">
                <mc-avatar rounded slot="left" />
                <mc-title :level="3" slot="top">
                   WG_Global
                </mc-title>
                <mc-grid-row slot="right" :gutter-x="5" :gutter-y="5">
                    <mc-grid-col>
                        <mc-tooltip size="s" placement="top" content="Редактировать">
                            <mc-button variation="blue-invert" size="s-compact">
                                <mc-svg-icon slot="icon-append" name="create"/>
                            </mc-button>
                        </mc-tooltip>
                    </mc-grid-col>
                    <mc-grid-col>
                        <mc-tooltip size="s" placement="top" content="Удалить">
                            <mc-button variation="red-invert" size="s-compact">
                                <mc-svg-icon slot="icon-append" name="delete"/>
                            </mc-button>
                        </mc-tooltip>
                    </mc-grid-col>
                </mc-grid-row>
            </mc-preview>
            <McGridRow :gutter-x="20">
                <mc-grid-col :span="4">
                    <mc-cell title="Бюджет">
                        <mc-title tag-name="p">
                            1 200 $
                        </mc-title>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col :span="4">
                    <mc-cell title="Блогеров">
                        <mc-title tag-name="p" >
                            129
                        </mc-title>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col :span="4">
                    <mc-cell title="Дедлайн">
                        <mc-title tag-name="p">
                            01.11.2018
                        </mc-title>
                    </mc-cell>
                </mc-grid-col>
            </McGridRow>
        </mc-card>

        <br>

        <mc-card href="#" target="_blank">
            <mc-preview slot="header">
                <mc-avatar rounded slot="left" />
                <mc-title :level="3" slot="top">
                    Gukie
                </mc-title>
            </mc-preview>
            <mc-grid-row :gutter-x="20">
                <mc-grid-col :span="6">
                    <mc-cell title="Основной владелец">
                        <mc-title tag-name="p">
                            Eugene Solonovich
                        </mc-title>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col :span="6">
                    <mc-cell title="Владельцы">
                        <mc-grid-row :gutter-x="5" :gutter-y="5">
                            <mc-grid-col>
                                <mc-button size="s">Roman Kolodko</mc-button>
                            </mc-grid-col>
                            <mc-grid-col>
                                <mc-button size="s">Dasha</mc-button>
                            </mc-grid-col>
                        </mc-grid-row>
                    </mc-cell>
                </mc-grid-col>
            </mc-grid-row>
        </mc-card>

        <br>

        <mc-card>
            <mc-grid-row justify="between" slot="header" :gutter-x="30" :gutter-y="10">
                <mc-grid-col>
                    <mc-grid-row :gutter-x="10" :gutter-y="6">
                        <mc-grid-col>
                            <mc-title size="s">
                                <mc-svg-icon slot="icon-prepend" name="shopping_cart"/>
                                Агентство 2
                            </mc-title>
                        </mc-grid-col>
                        <mc-grid-col>
                            <mc-title uppercase size="s">
                                <mc-svg-icon slot="icon-prepend" name="event"/>
                                Сегодня, в 16:24
                            </mc-title>
                        </mc-grid-col>
                    </mc-grid-row>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-grid-row :gutter-x="5" :gutter-y="5">
                        <mc-grid-col>
                            <mc-tooltip size="s" placement="top" content="Редактировать">
                                <mc-button variation="blue-invert" size="s-compact">
                                    <mc-svg-icon slot="icon-append" name="create"/>
                                </mc-button>
                            </mc-tooltip>
                        </mc-grid-col>
                        <mc-grid-col>
                            <mc-tooltip size="s" placement="top" content="Удалить">
                                <mc-button variation="red-invert" size="s-compact">
                                    <mc-svg-icon slot="icon-append" name="delete"/>
                                </mc-button>
                            </mc-tooltip>
                        </mc-grid-col>
                    </mc-grid-row>
                </mc-grid-col>
            </mc-grid-row>
            <mc-grid-row stretch :gutter-x="30" :gutter-y="10">
                <mc-grid-col>
                    <mc-cell title="Преролл">
                        <mc-title tag-name="p" size="l">10$</mc-title>
                        <mc-cell>
                            <mc-title tag-name="span" color="light-green" size="s">10$</mc-title>
                            <mc-title color="gray" tag-name="span" size="s">(2%)</mc-title>
                        </mc-cell>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-cell title="Нативка">
                        <mc-title tag-name="p" size="l">12$</mc-title>
                        <mc-cell>
                            <mc-title tag-name="span" color="light-green" size="s">12$</mc-title>
                            <mc-title color="gray" tag-name="span" size="s">(4%)</mc-title>
                        </mc-cell>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-cell title="Интеграция">
                        <mc-title tag-name="p" size="l">12$</mc-title>
                        <mc-cell>
                            <mc-title tag-name="span" color="light-green" size="s">12$</mc-title>
                            <mc-title color="gray" tag-name="span" size="s">(4%)</mc-title>
                        </mc-cell>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-cell title="Эксклюзив">
                        <mc-title tag-name="p" size="l">12$</mc-title>
                        <mc-cell>
                            <mc-title tag-name="span" color="light-green" size="s">17$</mc-title>
                            <mc-title color="gray" tag-name="span" size="s">(43%)</mc-title>
                        </mc-cell>
                    </mc-cell>
                </mc-grid-col>
            </mc-grid-row>
        </mc-card>

        <br>

        <mc-card>
            <mc-grid-row :gutter-x="30" :gutter-y="10">
                <mc-grid-col>
                    <mc-cell title="Доля сети">
                        <mc-title tag-name="p">1 200 $</mc-title>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-cell title="Доля орг.">
                        <mc-title tag-name="p">129 $</mc-title>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-cell title="Мин. доля канала">
                        <mc-title tag-name="p">1 200 $</mc-title>
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-cell title="Макс. доля канала">
                        <mc-title tag-name="p">1 20000</mc-title>$
                    </mc-cell>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-cell title="Макс. срок контракта">
                        <mc-title tag-name="p">1 20000 $</mc-title>
                    </mc-cell>
                </mc-grid-col>
            </mc-grid-row>
        </mc-card>

        <br>

        <mc-card href="javascript:void(0)">
            <mc-preview>
                <mc-avatar slot="left"/>
                <mc-title slot="top">Facebook</mc-title>
                <mc-grid-row slot="bottom" :gutter-x="10" :gutter-y="6">
                    <mc-grid-col>
                        <mc-title size="s">
                            <mc-svg-icon slot="icon-prepend" name="copyright"/>
                            Агентство 2, Агентство 3
                        </mc-title>
                    </mc-grid-col>
                    <mc-grid-col>
                        <mc-title size="s">
                            <mc-svg-icon slot="icon-prepend" name="location_on"/>
                            United States
                        </mc-title>
                    </mc-grid-col>
                </mc-grid-row>
            </mc-preview>
        </mc-card>

        <br>

        <mc-card>
            <mc-preview>
                <mc-avatar rounded slot="left"/>
                <mc-title slot="top">Алена Товстик</mc-title>
                <mc-title color="gray" size="s" slot="bottom">Основной владелец</mc-title>
            </mc-preview>
        </mc-card>

        <br>

        <mc-card href="javascript:void(0)">
            <mc-preview>
                <mc-avatar src="//i.ytimg.com/vi/If1sbtliqQk/default.jpg" slot="left"/>
                <mc-title :ellipsis="false" slot="top">
                    Official Video: Nike Currant Song | Jassi Gill | Neha Kakkar | Sukh-E Muzical Doctorz | Jaani
                </mc-title>
            </mc-preview>
        </mc-card>

        <br>

        <mc-card>
            <mc-grid-row justify="between" :gutter-x="20" :gutter-y="10">
                <mc-grid-col>
                    <mc-title>80-20</mc-title>
                </mc-grid-col>
                <mc-grid-col>
                    <mc-title size="xs">22.11.2018 - Текущий момент</mc-title>
                </mc-grid-col>
            </mc-grid-row>
        </mc-card>

        <br>

        <mc-card href="javascript:void(0)">
            <mc-preview>
                <mc-svg-icon size="m" name="videoblocks" slot="left"/>
                <mc-title size="l" slot="top">VidIQ Pro</mc-title>
            </mc-preview>
        </mc-card>
    </div>
    ```
</docs>
