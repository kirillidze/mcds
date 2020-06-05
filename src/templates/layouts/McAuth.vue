<template>
  <main class="mc-auth">
    <div class="mc-auth__inner">
      <div class="mc-auth__content">
        <div class="mc-auth__left">
          <transition name="slide-fade">
            <!-- @slot Слот контента -->
            <slot />
          </transition>
        </div>
        <transition name="fade">
          <div
            v-if="randomImage && active"
            class="mc-auth__right"
            :style="{ backgroundImage: randomImage }"
          ></div>
        </transition>
        <transition name="fade">
          <div
            v-if="randomImageSecond && !active"
            class="mc-auth__right"
            :style="{ backgroundImage: randomImageSecond }"
          ></div>
        </transition>
      </div>
      <!-- @slot Слот навигации -->
      <slot name="nav" />
    </div>
  </main>
</template>

<script>
import _shuffle from "lodash/shuffle"
import _cloneDeep from "lodash/cloneDeep"
import McTitle from "../../elements/McTitle"
/**
 * Раньше использовался
 * на страницах авторизации/регистрации
 */
export default {
  name: "McAuth",
  status: "deprecated",
  release: "0.0.1",
  components: {
    McTitle,
  },
  props: {
    /**
     * Изображения в правой колонке
     *
     */
    images: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      randomImage: null,
      randomImageSecond: null,
      imagesMutable: [],
      active: true,
    }
  },
  watch: {
    $route() {
      this.changeImage()
    },
  },
  created() {
    this.imagesMutable = _cloneDeep(this.images)
  },
  mounted() {
    this.imagesMutable = _shuffle(this.imagesMutable)
    this.randomImage = `url(${this.imagesMutable[0]})`
  },
  methods: {
    changeImage() {
      this.active = !this.active
      let removed = this.imagesMutable.splice(0, 2)
      this.imagesMutable.splice(this.imagesMutable.length, 0, removed[0], removed[1])
      this.randomImage = `url(${this.imagesMutable[0]})`
      this.randomImageSecond = `url(${this.imagesMutable[1]})`
    },
  },
}
</script>

<style lang="scss">
$part-width-left: 62.5%;
$part-width-right: 37.5%;

.mc-auth {
  $block-name: &;

  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media #{$media-query-s} {
    align-items: center;
    justify-content: center;
    padding: $space-xl / 2;
  }

  &__inner {
    width: 100%;
    max-width: $container-s;
    padding-bottom: $space-xs;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media #{$media-query-s} {
      min-height: 0;
      padding-bottom: 0;
    }
  }

  &__content {
    position: relative;
    background-color: $color-white;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    background-image: $gradient-auth;
    flex-grow: 1;

    @media #{$media-query-s} {
      border: 1px solid $color-outline-gray;
      border-radius: $radius-xl;
      box-shadow: $shadow-m;
      min-height: $height-auth;
      flex-grow: 0;
    }

    .slide-fade-enter-active,
    .slide-fade-leave-active {
      transition: opacity $duration-standart + 0.1, transform $duration-standart + 0.1;
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
      transform: translateY($space-s);
      opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity $duration-standart + 0.1;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }

  &__left {
    background-color: $color-white;
    width: 100%;

    @media #{$media-query-m} {
      width: $part-width-left;
    }
  }

  &__right {
    display: none;

    @media #{$media-query-m} {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: darken(rgb(135, 61, 199), 25%);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: $part-width-right;
    }
  }
}
</style>

<docs>
  ```jsx
  <McAuth>
    <mc-title :ellipsis="false" style="padding: 16px;">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad eligendi eum facere, impedit iure minima provident quia quo totam. Ad commodi harum illo itaque laboriosam, perferendis quis rerum sapiente! Aliquid facere sunt voluptates. Nostrum quia quos temporibus. A aliquid amet aperiam beatae cupiditate dolores ea enim eveniet explicabo facere fugiat id incidunt iure libero maiores, molestiae molestias mollitia nihil omnis perferendis quas quia quos repellendus similique sit sunt tempora ullam. Debitis dolor ipsum itaque molestias nam natus neque nostrum possimus repudiandae ullam? Distinctio error id laboriosam laborum, libero natus nisi omnis quia repellendus rerum sed, sint unde voluptas voluptatum!
    </mc-title>
  </McAuth>
  ```
</docs>
