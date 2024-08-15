<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Props {
    type?: string;
    label: string;
    id: string;
    placeholder?: string;
    modelValue?: string;
    errors?: any;
}

const props = defineProps<Props>();

const errorMessage = computed<string>(() => {
    return props.errors && props.errors[props.id] ? props.errors[props.id][0] : '';
});

const inputValue = ref<string|undefined>(props.modelValue || '');

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});
</script>

<template>
    <div class="mb-2">
        <label :for="id" class="form-label">{{ label }}</label>
        <input 
            :id="id" 
            :type="type" 
            class="form-control" 
            :placeholder="placeholder" 
            v-model="inputValue"
            @input="$emit('update:modelValue', inputValue)" 
        />
        <small v-if="errorMessage" class="d-block invalid-feedback">{{ errorMessage }}</small>
    </div>
</template>
