<template>
  <section class="mc-cropper">
    <vue-cropper
      ref="cropper"
      drag-mode="crop"
      background
      alt="Avatar"
      :aspect-ratio="1 / 1"
      :initialAspectRatio="1 / 1"
      :highlight="false"
      :guides="false"
      :view-mode="2"
      :src="imgSrc"
    />
  </section>
</template>

<script>
import VueCropper from "vue-cropperjs"

export default {
  name: "McCropper",
  status: "ready",
  release: "1.0.0",
  components: {
    VueCropper,
  },
  data() {
    return {
      cropImg: "",
    }
  },
  props: {
    /**
     *  Путь к изображению
     *
     */
    imgSrc: {
      type: [String, Object],
      default: null,
    },
  },
  watch: {
    imgSrc(val) {
      this.setImage(val)
    },
  },
  methods: {
    setImage() {
      this.$refs.cropper.replace(this.imgSrc)
    },
    cropImage() {
      this.$refs.cropper
        .getCroppedCanvas({
          maxWidth: 650,
          maxHeight: 650,
        })
        .toBlob(blob => {
          /**
           * Событие по обрезке
           * @property {blob}
           */
          this.$emit("crop", blob)
        })
    },
  },
}
</script>

<style lang="scss">
.mc-cropper {
  $block-name: &;

  $color-main: $color-blue;

  .cropper {
    &-modal {
      opacity: $opacity-active;
      background-color: $color-white;
    }

    &-face,
    &-line,
    &-point {
      opacity: 0;
    }

    &-view-box {
      border-radius: $radius-circle;
      outline: 1px dashed $color-main;
    }

    &-line {
      background-color: $color-main;
    }

    &-point {
      background: $color-main;

      &.point-se {
        @media #{$media-query-xl} {
          opacity: 1;
        }

        &:before {
          background-color: $color-main;
        }
      }
    }

    &-center {
      display: none;
    }

    &-canvas {
      height: 100% !important;
    }

    &-hide {
      height: 100% !important;
    }
  }
}
</style>

<docs>
    ```jsx
        let imgSrc = 'https://yt3.ggpht.com/-xxp17w8gwH4/AAAAAAAAAAI/AAAAAAAAAAA/yoFDaHVr8os/s84-c-k-no-mo-rj-c0xffffff/photo.jpg';

        <div style="max-width: 100px;">
            <McCropper
               :img-src="imgSrc"
            />
        </div>
    ```
</docs>
