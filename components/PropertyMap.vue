<template>
<div>
    <div class="app-wrapper app-padded-vertical">
        <h2 class="app-subtitle">Location</h2>
        <p class="app-description">
            {{ home.location.address }}
            {{ home.location.city }}
            {{ home.location.state }}
            {{ home.location.country }}
        </p>
        <div ref="map" class="app-map"></div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    home: { type: Object, required: true },
});

const map = ref(null);

onMounted(() => {
    const { $showMap } = useNuxtApp();
    $showMap(map.value, props.home._geoloc.lat, props.home._geoloc.lng);
});

</script>
