<script setup lang="ts">
import { RecipeClient, type Recipe, type Category } from '@/api/RecipeClient';
import { ref, onMounted, computed } from 'vue';

const recipeClient = new RecipeClient();
const recipes = ref<Recipe[]>([]);
const categories = ref<Category[]>([]);
const selectedCategory = ref<number | null>(null);
const searchQuery = ref<string>('');
const sortOption = ref<string>('date');
const sortOrder = ref<'asc' | 'desc'>('desc');

onMounted(() => {
    recipeClient.getCategories().then(response => {
        categories.value = response.categories;
        selectedCategory.value = 0;
    });
    fetchRecipes();
});

const fetchRecipes = () => {
    recipeClient.getRecipes({
        category: selectedCategory.value > 0 ? selectedCategory.value : '',
        search: searchQuery.value,
        sort: sortOption.value,
        order: sortOrder.value
    }).then(response => {
        recipes.value = response.recipes;
    });
};

const imageUrl = (recipe: Recipe) => {
    return 'https://via.placeholder.com/600x400/BBB/31343C?text=' + encodeURIComponent('Image of ' + recipe.name);
};

const applyFilters = () => {
    fetchRecipes();
};
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-3">
                <div class="filters p-3 border rounded">
                    <h4>Filters</h4>

                    <!-- Search Filter -->
                    <div class="mb-3">
                        <input v-model="searchQuery" @input="applyFilters" class="form-control" type="search"
                            placeholder="Search recipes">
                    </div>

                    <!-- Category Filter -->
                    <div class="mb-3">
                        <label for="category" class="form-label">Category</label>
                        <select v-model="selectedCategory" @change="applyFilters" class="form-select" id="category">
                            <option value="0">All Categories</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Sort Filter -->
                    <div class="mb-3">
                        <label for="sort" class="form-label">Sort By</label>
                        <select v-model="sortOption" @change="applyFilters" class="form-select" id="sort">
                            <option value="date">Date</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>

                    <!-- Sort Order -->
                    <div class="mb-3">
                        <label for="order" class="form-label">Order</label>
                        <select v-model="sortOrder" @change="applyFilters" class="form-select" id="order">
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="col-md-9">
                <h1 class="text-center mb-4">Recipes</h1>
                <hr>
                <div class="row g-4">
                    <div v-for="(recipe) in recipes" :key="recipe.id" class="col-4">
                        <div class="card h-100">
                            <img :src="imageUrl(recipe)" :alt="'Image of ' + recipe.name"
                                class="card-img-top img-fluid rounded-top" />
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ recipe.name }}</h5>
                                <p class="card-text">{{ recipe.description }}</p>
                                <div class="mt-auto">
                                    <RouterLink :to="'/recipes/' + recipe.id" class="btn btn-primary">View Recipe
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filters {
    position: sticky;
    top: 1rem;
}

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-img-top {
    height: 200px;
    object-fit: cover;
}

.card-body {
    display: flex;
    flex-direction: column;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-title {
    font-size: 1.25rem;
}

.card-text {
    font-size: 1rem;
    color: #6c757d;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}
</style>
