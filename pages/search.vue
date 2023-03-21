<template>
    <div>
        {{ lat }} / {{ lng }} / {{ label }}
        <div v-for="home in homes" :key="home.objectID">
            {{home.title}}
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const route = useRoute();

const lat = ref(route.query.lat);
const lng = ref(route.query.lng);
const label = ref(route.query.label);

const config = useRuntimeConfig();

// TODO: check how to move to a composable
const fetchOptions = {
        baseURL: config.public.baseURL,
        headers: {
        'X-Algolia-API-Key': config.public.apiKey,
        'X-Algolia-Application-Id': config.public.appId,
        },
}

watch(route, (routeChanged) => {
    lat.value = routeChanged.query.lat;
    lng.value = routeChanged.query.lng;
    label.value = routeChanged.query.label;
    console.log('route changed', lat.value, lng.value, label.value)
    refresh();
});

const { data: { value: { hits: homes } }, refresh } = await useFetch<any>(`homes/query`, {
    key: `${lat.value}-${lng.value}`,
    method: 'POST',
    ...fetchOptions,
    body: {
        aroundLatLng: `${lat.value},${lng.value}`,
        // in metters
        aroundRadius: 1500,
        hitsPerPage: 10,
        attributesToHighlight: [],
    },
});
</script>
