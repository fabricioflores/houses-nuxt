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
    <div style="width: 800px; height: 800px;" ref="map"></div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { ref, onMounted } from 'vue'

import { useGet } from '~/composables/useGet';


export default defineComponent({
  async setup() {
    const route = useRoute();
    const map = ref(null);

    const { data: home } = await useGet(`homes/${route.params.id}`);

    useHead({
      title: home.title,
    });

    onMounted(() => {
      const { $showMap } = useNuxtApp();
      $showMap(map.value, home._geoloc.lat, home._geoloc.lng);
    });


    return {
      home,
      map,
    }
  },
})
</script>

