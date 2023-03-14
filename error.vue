<template>
    <div class="error-page">
        {{ error.message }} {{ error.statusCode }}
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    error: { type: Object, required: true },
})

useHead({
    title: 'Error',
});

</script>

