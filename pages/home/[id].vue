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

const { getHomeById, getHomeReviewsByHomeId, getHostInformationByHomeId } = useApi();

const [
  { data: home, error: homeError },
  { data: reviewsData, error: reviewsError },
  { data: userData, error: userError }
] = await Promise.all([
    getHomeById(route.params.id as string),
    getHomeReviewsByHomeId(route.params.id as string),
    getHostInformationByHomeId(route.params.id as string),
]);

const reviews = reviewsData.value?.hits;
const user = userData.value?.hits[0]

const hasError = homeError?.value || reviewsError?.value || userError?.value;
if (hasError) {
  throw createError({ statusCode: hasError.statusCode, message: hasError.message })
}

useHead({
  title: home.value?.title,
});

</script>

