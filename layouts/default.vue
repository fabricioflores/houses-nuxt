<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <img src="/images/logo.svg">
      </div>
      <div class="app-search">
        <input type="text" ref="citySearch" @changed="onChange" placeholder="Enter your address"/>
      </div>
      <div class="app-user-menu">
        <img src="/images/user.jpg" class="avatar">
      </div>
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
