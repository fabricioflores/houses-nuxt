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
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image"> <br>
      {{ review.reviewer.name }} <br>
      {{ formatDate(review.date) }} <br>
      <ShortText :text="review.comment" :target="150" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { ref, onMounted } from 'vue'

export default defineComponent({
  async setup() {
    const route = useRoute();
    const map = ref(null);

    onMounted(() => {
      const { $showMap } = useNuxtApp();
      $showMap(map.value, home.value._geoloc.lat, home.value._geoloc.lng);
    });

    const config = useRuntimeConfig();

    // TODO: check how to move to a composable
    const fetchOptions = {
          baseURL: config.public.baseURL,
          headers: {
            'X-Algolia-API-Key': config.public.apiKey,
            'X-Algolia-Application-Id': config.public.appId,
          },
    }

    const [{ data: home }, { data: reviews }] = await Promise.all([
        useFetch(`homes/${route.params.id}`, fetchOptions),
        useFetch(`reviews/query`, {
          method: 'POST',
          ...fetchOptions,
          body: {
            filters: `homeId:${route.params.id}`,
            hitsPerPage: 6,
            attributesToHighlight: [],
          },
        })
    ])

    useHead({
      title: home.value.title,
    });

    function formatDate(strDate) {
      const date = new Date(strDate);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }


    return {
      home,
      map,
      reviews: reviews.value.hits,
      formatDate,
    }
  },
})
</script>

