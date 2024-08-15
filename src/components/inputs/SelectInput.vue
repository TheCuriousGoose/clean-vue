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
        <label :for="id" class="form-label">{{ label }}</label>
        <select :id="id" class="form-select" v-model="inputValue" @change="$emit('update:modelValue', inputValue)">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>
