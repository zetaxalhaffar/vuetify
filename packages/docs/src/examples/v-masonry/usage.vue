<template>
  <div class="scrollable-container bg-surface-light">
    <v-masonry
      :columns="{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 6,
      }"
      :dragable-options="dragableOptions"
      :draggable="false"
      :gap="24"
      :items="items"
      :width="200"
      @swap="onSwap"
    >
      <template v-slot:content="{ item , index }">
        <v-card rounded="lg" border flat>
          <v-list lines="one">
            <v-list-item
              v-for="n in ( index + 3 )"
              :key="n"
              :subtitle="item.description"
              :title="item.title + ' ' + index"
            ></v-list-item>
          </v-list>
        </v-card>
      </template>
    </v-masonry>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const dragableOptions = computed(() => ({
    animation: 'spring',
  }))
  const onSwap = value => {
    console.log('onSwap', value)
  }
  const items = [{
    id: '1',
    title: 'Lorem Ipsum Dolor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    draggable: true,
  }, {
    id: '2',
    title: 'Ut Enim Ad Minim',
    description: '123 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    draggable: true,
  }, {
    id: '3',
    title: 'Excepteur Sint',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }, {
    id: '4',
    title: 'Sed Ut Perspiciatis',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  }, {
    id: '5',
    title: 'Nemo Enim Ipsam',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  }, {
    id: '6',
    title: 'Neque Porro',
    description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  }, {
    id: '7',
    title: 'At Vero Eos',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
  }, {
    id: '8',
    title: 'Similique Sunt',
    description: 'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
  }, {
    id: '9',
    title: 'Nam Libero Tempore',
    description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
  }, {
    id: '10',
    title: 'Temporibus Autem',
    description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
  }, {
    id: '11',
    title: 'Itaque Earum',
    description: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
  }, {
    id: '12',
    title: 'On The Other Hand',
    description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue.',
  }, {
    id: '13',
    title: 'Equal Blame',
    description: 'Equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.',
  }, {
    id: '14',
    title: 'These Cases',
    description: 'These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.',
  }, {
    id: '15',
    title: 'But In Certain',
    description: 'But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.',
  }, {
    id: '16',
    title: 'The Wise Man',
    description: 'The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
  }, {
    id: '17',
    title: 'Short Text',
    description: 'Brief content.',
  }, {
    id: '18',
    title: 'Medium Length Content',
    description: 'This is a medium length description that provides more context and detail about the topic at hand. It gives readers a better understanding of what this item is about.',
  }, {
    id: '19',
    title: 'Very Long Detailed Description',
    description: 'This is an extremely detailed and comprehensive description that goes into great depth about various aspects of the subject matter. It covers multiple points, provides extensive context, and offers thorough explanations that help readers understand the full scope and implications of the topic being discussed. Such detailed content is often necessary when dealing with complex subjects that require careful consideration and analysis.',
  }, {
    id: '20',
    title: 'Technical Documentation',
    description: 'Technical specifications and implementation details for advanced systems integration. Includes API endpoints, configuration parameters, and deployment considerations.',
  }]
</script>
<style>
.scrollable-container {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
