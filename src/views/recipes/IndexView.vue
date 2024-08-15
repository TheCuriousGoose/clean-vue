<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Recipes</h1>
      <hr>
      <div class="row g-4">
        <div
          v-for="(recipe, index) in recipes"
          :key="recipe.id"
          :class="cardSize(index)"
        >
          <div class="card h-100">
            <img
              :src="imageUrl(recipe)"
              :alt="'Image of ' + recipe.name"
              class="card-img-top img-fluid rounded-top"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ recipe.name }}</h5>
              <p class="card-text">{{ recipe.description }}</p>
              <div class="mt-auto">
                <RouterLink :to="'/recipes/' + recipe.id" class="btn btn-primary">View Recipe</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RecipeClient, type Recipe } from '@/api/RecipeClient';
  import { onMounted, ref } from 'vue';
  
  const recipeClient = new RecipeClient();
  const recipes = ref<Recipe[]>([]);
  
  onMounted(() => {
    recipeClient.getRecipes({}).then(response => {
      recipes.value = response.recipes;
    });
  });
  
  const cardSize = (index: number) => {
    if (index < 1) {
      return 'col-12';
    } else if (index < 3) {
      return 'col-6';
    } else {
      return 'col-4';
    }
  };
  
  const imageUrl = (recipe: Recipe) => {
    return 'https://via.placeholder.com/600x400/BBB/31343C?text=' + encodeURIComponent('Image of ' + recipe.name);
  };
  </script>
  
  <style scoped>
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card-img-top {
    height: 200px; /* Adjust as needed */
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
  