<template>
  <div>
    <div v-for="home in homes.hits" :key="home.objectID" style="float: left; margin: 10px;">
      <nuxt-link :to="`/home/${home.objectID}`" no-prefetch>
        <HomeCard :home="home" />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">

const { getHomePageHomeList } = useApi();

const { data: homes } = await getHomePageHomeList();

useHead({
  title: 'HomePage',
  meta: [{
    name: 'description',
    content: 'This is the homepage!',
    hid: 'description'
  }]
});

</script>

