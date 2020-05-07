<template>
  <div class="mc-table-card" :style="{ marginLeft: ml }">
    <div class="mc-table-card__header">
      <slot name="header"></slot>
    </div>
    <div class="mc-table-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import McTableCardHeader from "./McTableCardHeader"
import McTableCardBody from "./McTableCardBody"
import McButton from "../../elements/McButton"
export default {
  name: "McTableCard",
  components: { McButton, McTableCardHeader, McTableCardBody },
  props: {
    ml: {
      type: String,
      default: "251px",
    },
  },
  computed: {
    classes() {
      return {
        // [`el-logo--type-${this.type}`]: this.type,
      }
    },
  },
}
</script>

<style lang="scss">
.mc-table-card {
  $block-name: &;

  @include position(absolute, 0);
  z-index: 10;
  margin-left: 251px;
  background-color: $color-white;
  border: 1px solid $color-outline-gray;
  display: flex;
  flex-direction: column;
  /*border-radius: 0 8px 0 0;*/

  &__header {
    height: $tappable-element-l;
    border-bottom: 1px solid $color-outline-gray;
    flex-shrink: 0;
  }

  &__body {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>

<docs>
  ```jsx
  <div>

    <div style="position: relative; height: 100vh; width: 100%">
      <McTableCard>
        <McTableCardHeader slot="header">
          <template>
            <McButton uppercase variation="blue-link">Назад</McButton>
          </template>
          <template slot="right">
            <McButton uppercase variation="blue-link">Запросить владельца</McButton>
            <McButton uppercase variation="blue-link">Запросить данные AI</McButton>
            <McButton uppercase variation="blue-link">Редактировать</McButton>
          </template>
        </McTableCardHeader>
        <McTableCardBody>
          <template slot="left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, blanditiis consequatur dicta dignissimos eius error impedit labore modi officiis, pariatur porro quam ratione saepe, similique totam velit veritatis vitae voluptatem. Ad adipisci aliquam aut cum error facilis maxime necessitatibus reiciendis temporibus voluptatibus. Dignissimos enim fuga hic non, officiis perferendis provident quos! Eveniet fugiat iusto praesentium qui quia totam. Adipisci alias aliquam animi blanditiis, consequatur ducimus fugit hic iste nesciunt nulla quaerat qui quibusdam quis vitae voluptas voluptatem voluptates. Assumenda ducimus eaque ut? Adipisci aliquid atque cum dolore, doloribus earum fugit ipsa laborum minima modi officiis optio porro, repellendus reprehenderit sit vitae, voluptates. Aperiam cumque, cupiditate distinctio ea earum, eos eum illo libero maiores necessitatibus nisi non optio quod, rem reprehenderit repudiandae sed sint? Ad cum dicta doloribus eum in laborum perferendis tempore velit. Cum dolore eum ipsum labore numquam reprehenderit sed suscipit! Illo laborum molestias neque non perspiciatis porro quo sed. Corporis cumque delectus dolores eligendi minus nobis quas saepe, sint! Adipisci aperiam aspernatur assumenda dolore, et fuga, id in labore magni modi nam nihil optio quo quod ratione, recusandae sed unde. Asperiores consequuntur dicta esse quo, sapiente sed soluta totam velit! Animi asperiores assumenda distinctio ea eius et eum inventore ipsa laborum magni maxime numquam officia pariatur porro quasi quo quod rem similique tempora, voluptatibus. Debitis deleniti dolores ea eligendi eveniet fugit illum libero magni nostrum perspiciatis quam ratione sequi sint sit tenetur voluptas, voluptatem. Ad amet at, cupiditate deleniti dicta dolorem ducimus, facere, iste labore nisi obcaecati quasi saepe vitae. Aliquam iure, natus omnis pariatur porro recusandae saepe sequi vel. Ab amet at dicta dolorem exercitationem hic itaque magnam, nobis numquam, pariatur quaerat quia saepe voluptas. Adipisci aspernatur aut consectetur cum eius, facere, fuga harum iusto magnam, maxime necessitatibus numquam odit ratione sint veniam. Aliquid aspernatur beatae cumque cupiditate, dolorum ea facere hic id iste laudantium libero maxime minima nam nostrum quas quibusdam quidem quos reiciendis repellat rerum sed, tempora temporibus tenetur ullam voluptatem? Aperiam deleniti facilis fugit laudantium placeat quisquam quod voluptatem. Amet commodi cumque eum fugit omnis quas quos similique. Asperiores debitis eligendi fugiat ipsum libero omnis possimus quae repudiandae voluptate! Dolores error ipsam mollitia nihil, non porro repellendus similique. Accusantium ad alias aliquid architecto asperiores assumenda, atque consectetur cumque deserunt doloribus eligendi enim et ex, excepturi fugit hic, in iste labore natus neque officia omnis optio placeat quaerat quisquam quo quod reiciendis sequi similique tempora unde ut vitae voluptas. Accusantium dignissimos necessitatibus nemo neque optio, pariatur possimus rerum. Adipisci alias aliquam architecto assumenda corporis cupiditate dolores ducimus, et facilis fuga harum, impedit incidunt libero magni minima nam perspiciatis quia quibusdam, quisquam sint sunt vel voluptas. Accusamus adipisci aliquam distinctio dolorem, ipsum mollitia pariatur provident qui quisquam repellendus saepe, totam? Aliquam amet, aperiam architecto at atque cum cumque cupiditate debitis dicta dignissimos distinctio doloribus enim excepturi expedita facilis fugit illo iste maiores molestiae non odio, officiis optio perspiciatis provident qui quibusdam quo recusandae rem reprehenderit rerum, saepe similique sint tempora unde veniam vitae voluptatem? Aliquid aspernatur distinctio ea et eum ex, facilis fuga ipsam iste laboriosam laborum minus molestias nam velit vitae? Ad aperiam debitis deleniti, dolorum eaque itaque labore possimus provident soluta unde. At autem eveniet expedita id itaque. Consequuntur corporis dolores, esse nobis nulla sunt temporibus ullam veniam? Dolore dolorem doloribus expedita, labore molestias optio quam sunt velit voluptates voluptatum! Eos excepturi explicabo fugiat harum quae quod ratione repudiandae totam veniam voluptatum! Error iste iure odit, officiis perferendis perspiciatis quo reiciendis repellat, soluta sunt ullam, unde voluptate voluptatibus! Ab architecto consequatur cum cumque debitis deserunt dolorem doloribus, ducimus eaque esse est excepturi, explicabo id illo itaque iure labore modi mollitia nam nobis non numquam odit, omnis optio porro possimus quasi ratione sint sit sunt suscipit tempora temporibus unde. A consectetur debitis est itaque omnis placeat praesentium provident, quia quisquam vero? Architecto doloremque incidunt magnam vitae? Adipisci aliquam aliquid assumenda autem blanditiis eaque iusto nam pariatur tenetur vel? Aspernatur, dolores reiciendis. Animi cupiditate deserunt eos excepturi repellendus. Aspernatur eum nemo nesciunt optio possimus, quidem similique sit voluptas. Ad alias aliquam assumenda atque blanditiis consequuntur corporis cumque, distinctio et, fugit harum iste molestias natus nemo pariatur, possimus quaerat quas quasi quidem quisquam repellendus repudiandae sit totam ut voluptatum! Aliquam assumenda consectetur enim, impedit incidunt iusto! Aliquam autem molestias sapiente. A aliquam consectetur consequuntur distinctio ea enim ipsa omnis quae quis quod rem, repellendus rerum voluptate? Ab accusamus aliquid cum doloribus dolorum earum in itaque nobis porro provident quisquam ratione, sequi unde veritatis vero voluptatem voluptates. Ab alias amet assumenda at blanditiis culpa delectus doloremque dolorum ducimus earum eligendi enim est excepturi fuga id ipsam magni nam necessitatibus neque nostrum obcaecati optio placeat porro possimus quas quidem quisquam quod ratione rem reprehenderit rerum soluta sunt tempora ut vel velit, voluptas! At aut beatae deleniti ex exercitationem facilis hic in iusto, laboriosam nihil repellat sint totam vitae. Dolore doloribus molestiae quasi recusandae. A assumenda at beatae cum, delectus deserunt distinctio dolorem doloremque eius est fuga id illo incidunt ipsa iste itaque iusto laborum laudantium minima minus modi molestias mollitia nesciunt nulla, officia officiis quam quidem recusandae rem repellat repudiandae sapiente sunt, suscipit vel vero voluptas voluptatibus? A blanditiis consequuntur culpa dicta dolore dolores doloribus error impedit in incidunt iste laboriosam libero maiores minima minus obcaecati odio omnis perspiciatis quam quos ratione recusandae rem rerum, sed tempore totam ut vel veniam vero voluptate? Beatae corporis ducimus, eveniet facere inventore itaque non pariatur praesentium quasi rem. Aperiam eum neque nesciunt pariatur placeat quaerat tempora. Consequuntur saepe, sequi. Ab autem blanditiis eius est iste maxime molestiae recusandae voluptates? Accusamus architecto asperiores consequuntur corporis cumque deleniti dignissimos dolorum eius eum exercitationem fuga impedit inventore labore maiores maxime minima nam nobis nulla perferendis provident quasi qui repellendus rerum saepe sed, sit veniam vero! Dignissimos exercitationem qui voluptate. Aliquam animi aperiam, aspernatur at autem commodi cum distinctio, dolor dolorem ea enim est ex hic id illum ipsum itaque iure magni maxime minus nam nostrum numquam odio omnis optio porro provident recusandae repellendus reprehenderit saepe tempora temporibus vel veniam vero vitae voluptatem voluptates. Aliquid animi autem blanditiis, consequatur cumque delectus eius eligendi explicabo molestiae nesciunt nostrum odio omnis possimus quam, quas quis, quisquam rerum voluptas! Asperiores, aspernatur distinctio, doloremque eos facere illum labore natus necessitatibus non numquam officiis placeat praesentium quae quis ratione repellendus suscipit. Alias commodi culpa distinctio ducimus esse inventore ipsa minus necessitatibus, nihil odit officia, quam quod quos ratione vitae? Ab asperiores consectetur consequuntur dolores doloribus ducimus ex facere fugit hic illo iste laudantium magni modi molestias nam neque nihil nulla numquam officiis optio pariatur provident quam quibusdam quidem quis quo saepe soluta, tenetur totam vero. Accusamus architecto autem cupiditate fugiat fugit incidunt odio odit placeat provident voluptatibus? A, atque, consequuntur culpa dignissimos dolores explicabo illum itaque, maiores reiciendis ut veritatis voluptate voluptatibus? Beatae, blanditiis cumque dicta et excepturi hic ipsam iusto maxime molestias necessitatibus pariatur qui quo ratione. Aliquid consequatur consequuntur dignissimos laboriosam optio rerum saepe, sapiente sunt tempora voluptatibus. Alias ea esse excepturi porro? Accusamus aliquam aliquid autem delectus dignissimos earum eligendi exercitationem harum magni modi, molestias natus nisi officia, omnis optio perferendis quae quasi qui quia quibusdam quo rem saepe voluptas. Adipisci at doloribus est fugiat in iure reiciendis ut. Assumenda beatae consectetur doloremque est et illo inventore iure laborum libero, mollitia nihil perferendis, praesentium quia quidem sint soluta tempora, vero voluptatum. Eos et excepturi expedita ipsa nam perferendis quaerat recusandae repellat, tempora voluptate. Consequuntur dolorem fugit laudantium nesciunt quis! A alias deleniti dolorem doloribus laboriosam numquam porro praesentium sed? Doloribus eos expedita ipsum nam optio provident sint. Ab asperiores atque doloremque ducimus eligendi, error eum excepturi hic ipsa, ipsam iusto non odio odit optio perferendis quasi quisquam sapiente sed tenetur ullam vero vitae voluptatem? Aut maiores nemo porro quae rem, sint ut! A blanditiis commodi consequatur culpa deleniti earum fugiat in, ipsa labore laudantium magni praesentium, quasi ratione saepe sequi, suscipit tempore? A accusamus aperiam aspernatur at, autem dicta dolor doloribus dolorum ducimus ea enim fuga illo ipsam iste mollitia nam pariatur perferendis porro provident quas quasi, quia sit unde vel veniam? Accusamus, at beatae, consectetur debitis dolorum magnam, maiores optio quae quo similique sint tempora. A asperiores, at cumque dicta dolor eius exercitationem in iusto magnam mollitia nobis odit pariatur quaerat recusandae saepe sequi tempora totam ut veritatis voluptatum! Accusamus aperiam architecto assumenda consectetur dicta, ducimus ea explicabo hic incidunt, iste laboriosam laudantium magnam molestiae natus necessitatibus officiis perspiciatis praesentium qui quo quod, suscipit tempore veritatis voluptas? Accusantium aliquam aspernatur consectetur corporis deserunt excepturi exercitationem fugiat in iste nemo, optio quisquam quo quos sequi soluta temporibus totam ut vitae. Ab aliquam architecto atque consectetur dolor eos explicabo facere id illum libero nostrum quisquam quo tempore, unde ut voluptates voluptatum? Ipsam, tempora, tenetur? Adipisci aliquid architecto aspernatur error, eum magni quis! Aut enim est et ex iure modi non quos sapiente tempora, voluptas? Doloremque illo ipsa nemo possimus quas quisquam voluptatibus voluptatum? Aperiam atque aut blanditiis commodi corporis cum dolores ducimus earum eius eligendi eos facere illum ipsam minus modi nemo odio optio pariatur placeat provident quas reiciendis repellendus sapiente sunt tempora unde, veniam vitae? Accusantium ad aspernatur eos facere fugit ipsa iste numquam odio repellendus sint, vero voluptate! Culpa cumque doloribus facere modi qui repellat veniam voluptate voluptatibus. Ab cupiditate distinctio, dolorem excepturi, facere harum nobis quisquam quos tempora, tempore tenetur voluptate? Amet assumenda atque doloremque eaque eos inventore molestiae possimus quisquam ratione, saepe velit voluptate, voluptatem. Architecto ipsam minima officia possimus quae? Assumenda dolore earum eligendi, et ipsum, itaque laborum mollitia nihil quisquam saepe suscipit tempora unde vero! Accusamus beatae blanditiis, culpa cum cumque dolor ducimus ea enim excepturi, exercitationem fugiat ipsum laborum magni neque nisi non, quidem. Ab accusamus ad consectetur dolor earum facere, fugit, laborum libero, magnam magni natus officia praesentium quam quia vel! Aliquam cumque explicabo iure, labore odio quas quos rem reprehenderit saepe voluptatum? Aperiam aspernatur autem debitis eligendi ex fugiat in ipsa maxime, pariatur quibusdam reiciendis repellendus reprehenderit sed sequi sit totam vitae voluptatibus. Adipisci aspernatur consequatur consequuntur corporis culpa deleniti eius eos est exercitationem expedita facere facilis hic inventore ipsa laudantium molestiae natus, necessitatibus, nemo nisi, nobis nostrum odit porro quam quia quibusdam quo quod rem rerum saepe tempore ut velit veritatis voluptatem! Blanditiis culpa doloribus earum esse fugiat hic impedit ipsa ipsum, iure magnam molestias mollitia, non, possimus quae quidem quod quos rerum veritatis voluptas voluptates. At consequatur debitis eaque eius eligendi eveniet expedita facere fuga fugiat ipsam itaque labore laborum non obcaecati, omnis pariatur perspiciatis praesentium quae qui quos, sed tempore temporibus tenetur veniam voluptatem! Adipisci aliquam aliquid architecto debitis distinctio doloribus dolorum earum eius esse exercitationem, laudantium nemo nesciunt nihil nostrum perspiciatis possimus quaerat qui quod, repellat reprehenderit rerum sed sequi, sint tempore vel velit veritatis. Assumenda commodi corporis debitis eum quasi quis quos reprehenderit? Aliquid autem corporis deserunt ea ex exercitationem harum hic, ipsam iure minima, odio quasi quisquam repellat saepe voluptatum. Adipisci alias aliquid amet, aperiam blanditiis culpa, deserunt dolores earum ex explicabo facilis incidunt ipsum laudantium modi nesciunt quod rem rerum tempora tenetur voluptas? Illo, inventore sequi. Aliquid corporis laboriosam tempore veritatis. A amet, eligendi eveniet iure mollitia natus odit optio quisquam repellat voluptate? Consequatur facere hic iusto officiis quisquam. Cupiditate debitis dolorum et harum laudantium obcaecati officiis, rerum saepe totam veniam. Alias amet asperiores commodi corporis cumque debitis delectus deserunt earum eos, esse eveniet ipsa iusto, laudantium magni nemo nisi omnis perspiciatis quaerat, quod sint sunt velit voluptatum. Accusamus alias mollitia nemo, nobis non perferendis quis tempora totam! Aperiam asperiores aspernatur atque cupiditate delectus eaque enim eos, esse expedita incidunt laudantium nihil nisi non nostrum numquam perspiciatis possimus provident quam quas quidem ratione sapiente, vel vero, voluptas voluptatum. Accusantium beatae qui quis sunt voluptate! A dolor provident quam quibusdam sit! Assumenda atque dignissimos dolores doloribus dolorum esse excepturi fuga fugit illo in iste libero magnam molestiae nam obcaecati, porro provident quae quas qui quia reprehenderit, rerum tempore ullam velit voluptatum. Accusamus, aliquid dicta dolore eos id, minima optio quam quia temporibus totam, vel?
          </template>
          <template slot="right">
            right
          </template>
        </McTableCardBody>
      </McTableCard>
    </div>

  </div>
  ```
</docs>
