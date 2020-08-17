<template>
  <div class="light-effect">
    <div class="light-effect__container" :class="classes">
      <slot />
    </div>
  </div>
</template>
<script>
import { FluentRevealEffect } from "fluent-reveal-effect"

export default {
  name: "McLightEffect",

  props: {
    /**
     *  Радиус эффекта:
     *  `s, m, l, и т.д.`
     */
    radius: {
      type: String,
      default: "m",
    },

    /**
     *  Эффект при клике:
     *  `true`
     */
    clickEffect: {
      type: Boolean,
      default: true,
    },

    /**
     *  Цвет эффекта у родителя:
     * `rgba(255,255,255,0.6)`
     */
    lightColor: {
      type: String,
      default: "rgba(255,255,255,0.7)",
    },

    /**
     *  Градиент родителя
     *  `80`
     */
    gradientSize: {
      type: Number,
      default: 80,
    },

    /**
     *  Контейнер
     *  `true`
     */
    isContainer: {
      type: Boolean,
      default: true,
    },

    /**
     *  Цвет эффекта у потомка:
     * `rgba(255,255,255,0.6)`
     */
    childrenLightColor: {
      type: String,
      default: "rgba(255,255,255,0.3)",
    },

    /**
     *  Градиент потомка
     *  `150`
     */
    childrenGradientSize: {
      type: Number,
      default: 150,
    },
  },
  mounted() {
    FluentRevealEffect.applyEffect(".light-effect", {
      clickEffect: this.clickEffect,
      lightColor: this.lightColor,
      gradientSize: this.gradientSize,
      isContainer: this.isContainer,
      children: {
        borderSelector: ".light-effect__container",
        elementSelector: ".mc-button--variation-light-effect",
        lightColor: this.childrenLightColor,
        gradientSize: this.childrenGradientSize,
      },
    })
  },

  computed: {
    classes() {
      return {
        [`light-effect__container--radius-${this.radius}`]: this.radius,
      }
    },
  },
}
</script>
<style lang="scss">
.light-effect {
  padding: 10px;
  @media #{$media-query-s-down} {
    padding: 0;
  }
  &__container {
    display: inline-block;
    padding: 2px;
    background-color: $color-secondary-purple;
    @media #{$media-query-s-down} {
      display: block;
      margin: 0;
      padding: 0;
    }
    .mc-button {
      &--variation-light-effect {
        @media #{$media-query-s-down} {
          margin: 0;
        }
      }
    }
  }
  &__container--radius {
    &-m {
      border-radius: $radius-m;
    }
    &-l {
      border-radius: $radius-l * 3;
    }
    &-xl {
      border-radius: $radius-xl;
    }
  }
}
</style>

<docs>
    ```jsx

    <div style="text-align: center; padding: 20px">
       <mc-light-effect>
           <McButton variation="light-effect" size="m">
               <McSvgIcon slot="icon-prepend" name="people"/>
               Example
           </McButton>
       </mc-light-effect>
    </div>
    ```
</docs>
