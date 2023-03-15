<template>
  <div>
    <header>
      <nuxt-link to="/"> Home </nuxt-link>
      <input type="text" ref="citySearch" @changed="onChange" />
    </header>
    <slot />
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
</script>
