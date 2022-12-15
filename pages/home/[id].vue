<template>
  <div>
    <div style="display: flex">
      <img v-for="image in home.images" :src="image" :key="image" width="200" height="150" >
    </div>
    {{home.title}} <br>
    ${{home.pricePerNight}} /nigth <br>
    <img src="/img/marker.svg" width="20" height="20"> {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} <br>
    <img src="/img/star.svg" width="20" height="20"> {{ home.reviewValue }} <br>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bathrooms <br>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

import homes from '~/data/homes.json';


export default defineComponent({
  setup() {
    const route = useRoute();
    const home = homes.find(home => home.objectID === route.params.id);

    useHead({
      title: home.title,
    });

    return {
      home,
    }
  },
})
</script>

