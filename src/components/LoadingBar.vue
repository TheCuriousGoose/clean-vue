<script lang="ts" setup>
import { useLoading } from '@/stores/loading';
const { isLoading } = useLoading();
</script>

<template>
    <div v-if="isLoading" class="loading-bar"></div>
</template>
