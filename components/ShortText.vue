<template>
    <span>
        {{ displayText }}
        <button v-if="isTooLong && !isExpanded" @click="isExpanded = true" class="link" type="button">read more</button>
        <button v-if="isTooLong && isExpanded" @click="isExpanded = false" class="link" type="button">read less</button>
    </span>
</template>

<script setup lang="ts">

const isExpanded = ref(false);
const chunks = ref<String[]>([]);

const props = defineProps({
    text: { type: String, required: true },
    target: { type: Number, required: true },
})

chunks.value = getChunks();

const isTooLong = computed(() => chunks.value.length === 2);
const displayText = computed(() => {
    if (!isTooLong.value || isExpanded.value) {
        return chunks.value.join(' ');
    }
    return chunks.value[0] + '...';
});



function getChunks() {
    const position = props.text.indexOf(' ', props.target);
    if (props.text.length <= props.target || position === -1) {
        return [props.text];
    }
    return [props.text.substring(0, position), props.text.substring(position)];
}
</script>

<style lang="scss">
.link {
    color: blue;
    background-color: white;
    border: none;
    text-decoration: underline;
    cursor: pointer;

    &:focus {
        border: none;
        outline: none;
    }
}
</style>

