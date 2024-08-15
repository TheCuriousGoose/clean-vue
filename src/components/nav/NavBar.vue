<script lang="ts" setup>
import { useLocalStorage } from '@/utils/useLocalStorage';
import { onMounted, ref, watch } from 'vue';
import SearchBar from './SearchBar.vue';
import AuthenicationButtons from './AuthenicationButtons.vue';

const isDarkMode = useLocalStorage<boolean>('darkmode', false);
const searchQuery = ref('');

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
};

const setPageMode = () => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light')
}

watch(isDarkMode, () => {
    setPageMode();
});

onMounted(() => {
    setPageMode();
})

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary"
        :class="{ 'navbar-dark bg-dark': isDarkMode, 'navbar-light bg-light': !isDarkMode }">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Recipes</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="me-auto w-25">
                    <SearchBar />
                </div>
                <AuthenicationButtons />
                <span :class="{
                    'fa-regular fa-lightbulb fa-lg': isDarkMode,
                    'fa-solid fa-lightbulb fa-lg': !isDarkMode
                }" class="mx-3" @click="toggleDarkMode"></span>
            </div>
        </div>
    </nav>
</template>