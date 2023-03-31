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

<script>
import { defineComponent } from '@vue/composition-api'
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

export default defineComponent({
  async setup() {
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
      { data: reviews, error: reviewsError },
      { data: user, error: userError }
    ] = await Promise.all([
        useFetch(`homes/${route.params.id}`, fetchOptions),
        useFetch(`reviews/query`, {
          method: 'POST',
          ...fetchOptions,
          body: {
            filters: `homeId:${route.params.id}`,
            hitsPerPage: 6,
            attributesToHighlight: [],
          },
        }),
        useFetch(`users/query`, {
          method: 'POST',
          ...fetchOptions,
          body: {
            filters: `homeId:${route.params.id}`,
            attributesToHighlight: [],
          },
        })
    ]);

    const hasError = homeError?.value || reviewsError?.value || userError?.value;
    if (hasError) {
      return error({ statusCode: hasError.statusCode, message: hasError.message })
    }

    useHead({
      title: home.value.title,
    });

    return {
      home,
      reviews: reviews.value.hits,
      user: user.value.hits[0],
    }
  },
})
</script>

