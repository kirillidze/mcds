<template>
  <div class="mc-card">
    <div class="mc-card__header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="mc-card__content">
      <slot />
    </div>
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
export default {
  name: "McCard",
  components: { McSvgIcon, McTitle, McPreview, McGridCol, McAvatar, McLines, McGridRow },
  status: "deprecated",
  release: "1.0.0",
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
    display: flex;
    align-items: center;
  }
}
</style>

<docs>
    ```jsx
    <div style="max-width: 600px">
        <McCard>
            <template slot="header">
                <McPreview>
                    <McAvatar rounded slot="left" />
                    <McTitle :level="3" size="m" slot="top">
                       WG_Global
                    </McTitle>
                </McPreview>
            </template>
            <McGridRow :gutter-g="20">
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
            <McGridRow :gutter-g="30" :gutter-v="10">
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

        <McCard>
            <McPreview>
                <McAvatar rounded slot="left"/>
                <McTitle slot="top">Facebook</McTitle>
                <McGridRow slot="bottom" :gutter-g="10" :gutter-v="6">
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

        <McCard>
            <McPreview>
                <McAvatar src="//i.ytimg.com/vi/If1sbtliqQk/default.jpg" slot="left"/>
                <McTitle :ellipsis="false" slot="top">Official Video: Nike Currant Song | Jassi Gill | Neha Kakkar | Sukh-E Muzical Doctorz | Jaani</McTitle>
            </McPreview>
        </McCard>
    </div>
    ```
</docs>
