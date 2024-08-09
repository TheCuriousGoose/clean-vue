<script lang="ts" setup>
import { RecipeClient, type Recipe } from '@/api/recipeClient';
import { debounce } from '@/utils/debounce';
import { computed, ref, watch } from 'vue';

const recipeClient = new RecipeClient();

const searchQuery = ref<string>('');
const searchResults = ref<Recipe[]>([]);
const showResults = ref<boolean>(false);

function searchRecipes() {

}

const debouncedSearch = debounce((query: string) => {
    recipeClient.getRecipes({ search: query }).then((response) => {
        searchResults.value = response.recipes;
    });
}, 100);

watch(searchQuery, (newVal) => {
    debouncedSearch(newVal);
    showResults.value = newVal.length > 0;
});

const searchResultsLimited = computed(() => searchResults.value.slice(0, 5));
</script>

<template>
    <div class="search-bar">
        <form class="input-group" @submit.prevent="searchRecipes">
            <span class="input-group-text">
                <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input class="form-control" type="search" placeholder="Search recipes" aria-label="Search"
                v-model="searchQuery" @focusin="showResults = true" @focusout="showResults = false">
        </form>
        <div v-if="showResults && searchQuery" class="search-results">
            <span class="text-muted px-3">Results for "{{ searchQuery }}":</span>
            <div class="d-flex flex-column">
                <p class="text-center" v-if="searchResults.length < 1">No recepts found</p>
                <div v-for="recipe in searchResultsLimited" :key="recipe.id" class="recipe-card">
                    <p class="fw-bold mb-0">{{ recipe.name }}</p>
                    <small class="text-muted">{{ recipe.description }}</small>
                </div>
            </div>
        </div>
    </div>
</template>