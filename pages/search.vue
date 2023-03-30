<template>
    <div>
        {{ lat }} / {{ lng }} / {{ label }}
        <div v-if="homes.hits.length > 0">
            <HomeRow v-for="home in homes.hits" :key="home.objectID" :home="home" />
        </div>
        <div v-else>No results found</div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute();

const lat = computed(() => route.query.lat);
const lng = computed(() => route.query.lng);
const label = computed(() => route.query.label);

const config = useRuntimeConfig();

// TODO: check how to move to a composable
const fetchOptions = {
        baseURL: config.public.baseURL,
        headers: {
        'X-Algolia-API-Key': config.public.apiKey,
        'X-Algolia-Application-Id': config.public.appId,
        },
}

const { data: homes , refresh } = await useAsyncData<any>(`${lat.value}-${lng.value}`, () => $fetch(`homes/query`, {
    method: 'POST',
    ...fetchOptions,
    body: {
        aroundLatLng: `${lat.value},${lng.value}`,
        // in metters
        aroundRadius: 1500,
        hitsPerPage: 10,
        attributesToHighlight: [],
    },
}));

watch(() => route.query, () => refresh())

useHead({
  title: () => `Homes around ${label.value}`,
});

</script>
