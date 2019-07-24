<template>
  <section class="mc-cropper">
    <VueNoSsr>
      <VueCropper
        ref="cropper"
        :aspect-ratio="1 / 1"
        :initialAspectRatio="1 / 1"
        :highlight="false"
        :guides="false"
        :view-mode="2"
        drag-mode="crop"
        :background="true"
        :src="imgSrc"
        alt="Avatar"
      >
      </VueCropper>
    </VueNoSsr>
  </section>
</template>

<script>
import VueCropper from "vue-cropperjs"
import VueNoSsr from "vue-no-ssr"

export default {
  name: "McCropper",
  status: "deprecated",
  release: "1.0.0",
  components: {
    VueCropper,
    VueNoSsr,
  },
  data() {
    return {
      cropImg: "",
    }
  },
  props: {
    imgSrc: {},
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
          maxWidth: 500,
          maxHeight: 500,
        })
        .toBlob(blob => {
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
      background-color: $white;
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
