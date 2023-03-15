<template>
    <div>
        {{ route.query }}
    </div>
</template>
<script setup lang="ts">
const route = useRoute();
</script>
