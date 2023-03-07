<template>
    <div class="error-page">
        {{ error.message }} {{ error.statusCode }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        error: {
            type: Object,
            required: true,
        }
    },
    setup() {
            useHead({
                title: 'Error',
            });
    }
})
</script>

