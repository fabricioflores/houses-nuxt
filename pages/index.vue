<template>
  <div class="flex flex-col items-center">
    <div class="app-search w-10/12 mb-9">
      <input class="w-full" type="text" ref="citySearch" @changed="onChange" placeholder="Enter your address"/>
      <button>
        <img src="/images/icons/search.svg">
      </button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-10/12">
      <div v-for="home in homes.hits" :key="home.objectID">
        <nuxt-link :to="`/home/${home.objectID}`" no-prefetch>
          <HomeCard :home="home" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const citySearch = ref<HTMLInputElement | null>(null);
const router = useRouter();

onMounted(() => {
  const { $makeAutocomplete } = useNuxtApp();
  $makeAutocomplete(citySearch.value);
});

function onChange(event: CustomEvent) {
  const place = event.detail;
  if(!place) return;

  router.push({
    name: 'search',
    query: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      label: citySearch?.value?.value,
    }
  });

}

const { getHomePageHomeList } = useApi();

const { data: homes } = await getHomePageHomeList();

definePageMeta({
  layout: 'homepage',
})

useHead({
  title: 'HomePage',
  meta: [{
    name: 'description',
    content: 'This is the homepage!',
    hid: 'description'
  }]
});

</script>

