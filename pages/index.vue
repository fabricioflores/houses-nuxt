<template>
  <div>
    <div v-for="home in homes" :key="home.objectID" style="float: left; margin: 10px;">
      <nuxt-link :to="`/home/${home.objectID}`" no-prefetch>
        <HomeCard :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">

import homes from '~/data/homes.json';

useHead({
  title: 'HomePage',
  meta: [{
    name: 'description',
    content: 'This is the homepage!',
    hid: 'description'
  }]
});

</script>

