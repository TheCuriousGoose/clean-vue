<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
});

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});
</script>

<template>
    <div class="mb-3">
        <label class="form-label">{{ label }}</label>
        <div v-for="option in options" :key="option.value" class="form-check">
            <input :id="option.value" type="radio" :name="name" class="form-check-input" :value="option.value"
                v-model="inputValue" @change="$emit('update:modelValue', inputValue)" />
            <label :for="option.value" class="form-check-label">{{ option.text }}</label>
        </div>
    </div>
</template>
