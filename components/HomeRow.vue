<template>
  <div style="clear: left;">
    <img :src="home.images[0]" style="width: 200px; float: left; padding: 10px;" > <br>
    {{home.title}} <br>
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} <br>
    {{ pluralize(home.guests, "guest") }}, {{ pluralize(home.bedrooms, "room") }}, {{ pluralize(home.beds, "bed") }}, {{ pluralize(home.bathrooms, "bathroom") }} <br>
    {{ home.pricePerNight }} / night <br>
    <img src="/img/star.svg" width="20" height="20"> {{ home.reviewValue }} ({{ home.reviewCount }}) <br>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
    home: { type: Object, required: true },
});

function pluralize(number: number, singularWord: string) {
  return `${number} ${singularWord}${number > 1 ? 's' : ''}`;
}

</script>

