<template>
    <div class="app-search-results-page">
        <div class="app-search-results">
            <div class="app-search-results-listing">
                <h2 class="app-title">Stays in {{ label }}</h2>
                <nuxt-link v-for="home in homes.hits" :key="home.objectID" :to="`/home/${home.objectID}`">
                    <HomeRow
                        :home="home"
                        @mouseover="highlightMarker(home.objectID, true)"
                        @mouseout="highlightMarker(home.objectID, false)"
                        class="app-house" />
                </nuxt-link>
            </div>
            <div class="app-search-results-map">
                <div class="app-map" ref="map"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const route = useRoute();
const map = ref(null);

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

watch(() => route.query, () => {
    refresh();
    updateMap();
})

useHead({
  title: () => `Homes around ${label.value}`,
});

function updateMap() {
    const { $showMap } = useNuxtApp();
    $showMap(map.value, lat.value as string, lng.value as string, getHomeMakers());
}

function getHomeMakers() {
    if (homes.value.hits.length === 0) {
        return null;
    }
    const makers = homes.value.hits.map((home: any) => {
        return {
            ...home._geoloc,
            pricePerNight: home.pricePerNight,
            id: home.objectID,
        };
    });
    return makers;
}

function highlightMarker(homeId: string, isHighlighted: boolean) {
    document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted);
}

onMounted(() => {
    updateMap();
});

</script>

<style lang="scss">
.marker {
    background-color: white;
    border: 1px solid lightgray;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 8px;

    &-highlight {
        color: white !important;
        background-color: black;
        border: 1px solid black;
    }
}
</style>
