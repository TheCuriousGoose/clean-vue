<script lang="ts" setup>
import { useLocalStorage } from '@/utils/useLocalStorage';
import { onMounted, ref, watch } from 'vue';

const isDarkMode = useLocalStorage<boolean>('darkmode', false);
const searchQuery = ref('');

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
};

const searchRecipes = () => {
    console.log(`Searching for recipes with query: ${searchQuery.value}`);
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

watch(isDarkMode, (newVal) => {
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
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
                <form class="d-flex" @submit.prevent="searchRecipes">
                    <input class="form-control me-2" type="search" placeholder="Search recipes" aria-label="Search"
                        v-model="searchQuery">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <button class="btn btn-outline-primary ms-2" @click="toggleDarkMode">{{ isDarkMode ? 'Light Mode' :
                    'Dark Mode' }}</button>
                <button class="btn btn-outline-secondary ms-2" @click="login">Login</button>
                <button class="btn btn-outline-secondary ms-2" @click="register">Register</button>
            </div>
        </div>
    </nav>
</template>