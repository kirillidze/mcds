<template>
  <article class="mc-table-card-body" :class="classes">
    <div class="mc-table-card-body__inner">
      <!-- @slot Слот заголовка -->
      <slot>
        <div class="mc-table-card-body__left">
          <div class="mc-table-card-body__inner-col">
            <!-- @slot Слот слева -->
            <slot name="left" />
          </div>
        </div>
        <div class="mc-table-card-body__right">
          <div class="mc-table-card-body__inner-col">
            <!-- @slot Слот справа -->
            <slot name="right" />
          </div>
        </div>
      </slot>
    </div>
  </article>
</template>

<script>
export default {
  name: "McTableCardBody",
  status: "ready",
  release: "1.0.0",
  props: {
    variation: {
      type: String,
      default: "default",
    },
  },
  computed: {
    classes() {
      return {
        [`mc-table-card-body--variation-${this.variation}`]: this.variation,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table-card-body {
  $block-name: &;

  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  &__inner {
    @include position(absolute, 0);
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    overflow-y: auto;
  }

  &__left,
  &__right {
    position: relative;
  }

  &__inner-col {
    @include position(absolute, 0);
    overflow-y: auto;
  }

  &--variation-default {
    #{$block-name} {
      &__left {
        width: calc(100% - 240px);
        border-right: 1px solid $color-outline-gray;
        flex: 1 1 auto;

        @media #{$media-query-xxl} {
          flex: 0 1 auto;
          width: 75%;
        }
      }

      &__right {
        width: 240px;
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;

        @media #{$media-query-xxl} {
          flex: 0 1 auto;
          width: 25%;
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
    <div style="position: relative; height: 300px; width: 100%; display: flex;">
      <div style="display: flex; flex-direction: column; flex-grow: 1;">
        <mc-table-card-body>
          <template slot="left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate minima non officiis sed suscipit temporibus voluptatum? Aliquam amet debitis delectus esse eveniet nihil praesentium quaerat ratione, sequi sint, sunt tenetur veniam, vero. Facilis illum neque nisi provident voluptas. Aperiam architecto exercitationem inventore magni nihil velit! Aut blanditiis, dolor exercitationem explicabo facere nemo nostrum voluptatem. Animi aspernatur assumenda consequuntur dolore maiores nam odit praesentium quisquam sapiente vero. Aspernatur beatae, dignissimos doloremque earum excepturi exercitationem expedita itaque labore laboriosam nam natus nisi obcaecati optio rerum similique, tenetur velit veritatis voluptatem. Atque cum deserunt dignissimos fugiat hic optio, sed. Autem cumque nesciunt quaerat quam velit. A accusantium, ad atque aut commodi consequatur consequuntur debitis dolorem doloribus dolorum ea, eius error excepturi fuga illum impedit inventore ipsam laboriosam laudantium libero minima nemo nulla officiis possimus quam quia quibusdam quis quisquam quo sapiente temporibus vel vero, voluptates! Dolorem est labore natus rerum vel. Accusamus accusantium, aliquid assumenda beatae distinctio et facilis fuga natus neque porro repellendus rerum veniam vero? Aliquam, quam, sed. Ducimus eaque error id laboriosam, laudantium non odio provident quibusdam, reprehenderit rerum saepe tenetur! Ab aliquam amet commodi delectus, dignissimos doloribus eius ex explicabo id molestiae similique voluptas voluptatem! Et necessitatibus, velit.
          </template>
          <template slot="right">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias amet at autem consequatur dolore doloribus dolorum error fuga id illum laborum modi nulla perferendis perspiciatis, quaerat quidem repellendus sequi totam ullam velit vero voluptatibus! Aspernatur consequatur, corporis cum debitis distinctio dolores ea eum, fugit harum hic, impedit inventore odio possimus quasi quo quos recusandae rerum temporibus tenetur unde! Aliquid blanditiis eligendi incidunt natus officia? Ab aliquam asperiores deserunt dignissimos facilis ipsam iusto natus neque nihil possimus quia sequi, vel! Cupiditate ea facere laudantium modi quia quis recusandae, rem sequi unde voluptatem. Esse fuga hic incidunt iste itaque libero minima natus placeat ratione recusandae, tempore, unde ut vitae! A aliquam animi aperiam architecto cupiditate debitis deleniti dicta distinctio ducimus esse ex excepturi explicabo harum illo impedit, in incidunt inventore ipsam laudantium libero magnam minima neque nihil perferendis quidem repellat repellendus sapiente totam ut veniam. Aut est id neque odio perferendis possimus recusandae reprehenderit soluta ullam velit. Autem cum eius expedita mollitia perspiciatis provident saepe sequi soluta? Aliquid animi architecto aspernatur autem, commodi dignissimos dolorum ex expedita fuga impedit labore laudantium minus pariatur perferendis porro quam quidem quisquam repellendus, sequi ut? Dicta et fuga, ipsum iure optio pariatur recusandae rem tempore!
          </template>
        </mc-table-card-body>
      </div>
    </div>
  ```
</docs>
