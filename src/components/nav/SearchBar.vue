<script lang="ts" setup>
import { RecipeClient, type Recipe } from '@/api/RecipeClient';
import { debounce } from '@/utils/debounce';
import { computed, ref, watch } from 'vue';

const recipeClient = new RecipeClient();
const searchQuery = ref<string>('');
const searchResults = ref<Recipe[]>([]);
const showResults = ref<boolean>(false);
const debounceDelay = 300;

const debouncedSearch = debounce((query: string) => {
    recipeClient.getRecipes({ search: query }).then(response => {
        searchResults.value = response.recipes;
    });
}, debounceDelay);

watch(searchQuery, (newVal) => {
    debouncedSearch(newVal);
    showResults.value = newVal.length > 0;
});

const searchResultsLimited = computed(() => searchResults.value.slice(0, 5));

const selectRecipe = (recipe: Recipe) => {
    window.location.href = `/recipes/${recipe.id}`;
    searchQuery.value = recipe.name;
    setTimeout(() => showResults.value = false, 1000);
};
</script>

<template>
    <div class="search-bar position-relative">
        <form class="input-group" @submit.prevent="searchRecipes">
            <span class="input-group-text">
                <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input class="form-control" type="search" placeholder="Search recipes" aria-label="Search"
                v-model="searchQuery" @focusin="showResults = true" @focusout="handleFocusOut" />
        </form>
        <div v-if="showResults && searchQuery" class="search-results position-absolute shadow border rounded">
            <span class="text-muted px-3 py-2 d-block">Results for "{{ searchQuery }}":</span>
            <div v-if="searchResults.length === 0" class="text-center py-2">
                <p class="text-muted mb-0">No recipes found</p>
            </div>
            <div class="d-flex flex-column">
                <div v-for="recipe in searchResultsLimited" :key="recipe.id"
                    class="recipe-card nav-link py-2 px-3 border-bottom d-flex align-items-center"
                    @click="selectRecipe(recipe)">
                    <div class="me-3">
                        <img :src="'https://via.placeholder.com/50x200'" :alt="'Image of ' + recipe.name"
                            class="img-fluid rounded-circle" style="width: 50px; height: 50px; object-fit: cover;" />
                    </div>
                    <div>
                        <p class="fw-bold mb-0">{{ recipe.name }}</p>
                        <small class="text-muted">{{ recipe.description }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>