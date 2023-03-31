<template>
  <div>
    <div class="app-house-header" :style="`background-image: url(${home.images[0]})`"></div>
    <div class="app-house-body">
      <img class="app-fav" src="/images/icons/heart.svg">
      <h2>{{ home.title }}</h2>
      <div class="app-address">
        {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}
      </div>
      <div class="app-amenities">
        <p>
          {{ pluralize(home.guests, "guest") }}, {{ pluralize(home.bedrooms, "room") }}, {{ pluralize(home.beds, "bed") }}, {{ pluralize(home.bathrooms, "bathroom") }}
        </p>
        <p>{{ features }}</p>
      </div>
      <div class="app-flex">
        <div class="app-rating">
          {{ home.reviewValue }} <span>({{ home.reviewCount }})</span>
        </div>
        <div class="app-price">
          ${{ home.pricePerNight }} <span>/ night</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import pluralize from '~/utils/pluralize';

const props = defineProps({
    home: { type: Object, required: true },
});

const features = computed(() => props.home.features.slice(0, 3).join(', '));

</script>

