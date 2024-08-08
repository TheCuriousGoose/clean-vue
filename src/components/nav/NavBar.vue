<script lang="ts" setup>
import { useLocalStorage } from '@/utils/useLocalStorage';
import { onMounted, ref, watch } from 'vue';
import SearchBar from './SearchBar.vue';

const isDarkMode = useLocalStorage<boolean>('darkmode', false);
const searchQuery = ref('');

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
};

const login = () => {
    console.log('Login clicked');
};

const register = () => {
    console.log('Register clicked');
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
                <ul class="navbar-nav mb-2 me-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/new" class="nav-link">New</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/hot" class="nav-link">Hot</RouterLink>
                    </li>
                </ul>
                <div class="me-auto w-25">
                    <SearchBar />
                </div>
                <button class="nav-link" @click="login">Login</button>
                <button class="nav-link ms-2" @click="register">Register</button>
                <span :class="{
                    'fa-regular fa-lightbulb fa-lg': isDarkMode,
                    'fa-solid fa-lightbulb fa-lg': !isDarkMode
                }" class="mx-3" @click="toggleDarkMode"></span>
            </div>
        </div>
    </nav>
</template>