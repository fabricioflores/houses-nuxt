<template>
  <div class="app-container">
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <PropertyMap :home="home" />
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
  </div>
</template>

<script setup lang="ts">

const route = useRoute();
const config = useRuntimeConfig();

// TODO: check how to move to a composable
const fetchOptions = {
      baseURL: config.public.baseURL,
      headers: {
        'X-Algolia-API-Key': config.public.apiKey,
        'X-Algolia-Application-Id': config.public.appId,
      },
}

const [
  { data: home, error: homeError },
  { data: reviewsData, error: reviewsError },
  { data: userData, error: userError }
] = await Promise.all([
    <any>useFetch(`homes/${route.params.id}`, fetchOptions),
    <any>useFetch(`reviews/query`, {
      method: 'POST',
      ...fetchOptions,
      body: {
        filters: `homeId:${route.params.id}`,
        hitsPerPage: 6,
        attributesToHighlight: [],
      },
    }),
    <any>useFetch(`users/query`, {
      method: 'POST',
      ...fetchOptions,
      body: {
        filters: `homeId:${route.params.id}`,
        attributesToHighlight: [],
      },
    })
]);

const reviews = reviewsData.value.hits;
const user = userData.value.hits[0]

const hasError = homeError?.value || reviewsError?.value || userError?.value;
if (hasError) {
  throw createError({ statusCode: hasError.statusCode, message: hasError.message })
}

useHead({
  title: home.value.title,
});

</script>

