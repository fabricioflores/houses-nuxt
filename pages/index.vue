<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float: left; margin: 10px;">
      <nuxt-link :to="`/home/${home.objectID}`" no-prefetch>
        <HomeCard :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHead } from '@vueuse/head';

import homes from '~/data/homes.json';

export default defineComponent({
  setup() {

    useHead({
      title: 'HomePage',
      meta: [{
        name: 'description',
        content: 'This is the homepage!',
        hid: 'description'
      }]
    });

    return {
      homes,
    }
  },
})
</script>

