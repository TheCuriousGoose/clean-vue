
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});
</script>

<template>
    <div class="mb-3 form-check">
        <input :id="id" type="checkbox" class="form-check-input" v-model="inputValue"
            @change="$emit('update:modelValue', inputValue)" />
        <label :for="id" class="form-check-label">{{ label }}</label>
    </div>
</template>
