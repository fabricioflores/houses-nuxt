<template>
<div class="app-padded-vertical">
    <div class="app-wrapper">
        <div class="app-testimonials">
            <div v-for="(review, index) in reviews" :key="index">
                <div class="app-testimonial-header">
                    <div><img :src="review.reviewer.image"></div>
                    <div>
                        <p class="app-testimonial-name">
                            {{ review.reviewer.name }}
                        </p>
                        <p class="app-testimonial-date">
                            {{ shortDate(review.date) }}
                        </p>
                    </div>
                </div>
                <div class="app-testimonial-body">
                    <ShortText :text="review.comment" :target="150" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import shortDate from '~/utils/shortDate';

const props = defineProps({
    reviews: { type: Array, required: true },
});

</script>
