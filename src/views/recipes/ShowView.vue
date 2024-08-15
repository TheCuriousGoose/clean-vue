<script setup lang="ts">
import { RecipeClient, type Recipe } from '@/api/RecipeClient';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const router = useRouter();
const recipeClient = new RecipeClient();

const recipeId = Number(router.currentRoute.value.params.recipe);

if (isNaN(recipeId)) {
    router.push({ name: 'not-found' });
}
let recipesResponse = await recipeClient.getRecipe(recipeId);

if (recipesResponse.status.toLowerCase() == 'error') {
    router.push({ name: 'not-found' });
}

const recipe = recipesResponse.recipes[0];
const imageUrl = 'https://via.placeholder.com/600x400/BBB/31343C?text=' + ('totally real image of ' + recipe.name).replace(' ', '+');

const servings = ref<number>(recipe.servings);

const servingsAmount = (amount: any) => {
    let amountNumber = Number(amount);

    if (isNaN(amountNumber)) {
        return amount;
    }

    return (amount / recipe.servings) * servings.value;
}

const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false } as Intl.DateTimeFormatOptions;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};

</script>

<template>
    <div class="container">
        <div class="mt-5 row">
            <div class="my-2 d-flex justify-content-between">
                <RouterLink to="/recipes" class="btn btn-secondary">
                    <i class="fa fa-arrow-left"></i>
                    Back to recipes
                </RouterLink>

                <RouterLink :to="'/recipes/' + recipe.id + '/edit/'" class="btn btn-primary"
                    v-if="userStore.isLoggedIn && recipe.author.id == userStore.user.id">
                    <i class="fa fa-edit"></i>
                    Edit recipe
                </RouterLink>
            </div>

            <div class="col-6">
                <h1 class="mb-0">{{ recipe.name }}</h1>
                <span class="text-muted">Made by: {{ recipe.author.name }}</span>
                - <span class="text-muted">Created at: {{ formatDate(recipe.created_at) }}</span>
                - <span class="text-muted">Updated at: {{ formatDate(recipe.updated_at) }}</span>
                <hr>
                <div class="d-flex gap-2 mb-2">
                    <span class="badge text-bg-primary">{{ recipe.category.name }}</span>
                    <span class="badge text-bg-primary">
                        <i class="fa fa-clock"></i>
                        {{ recipe.preparation_time + recipe.cooking_time }} minutes
                    </span>
                </div>
                <p>{{ recipe.description }}</p>
            </div>
            <div class="col-6">
                <img class="rounded-2 w-100" :src="imageUrl" :alt="'An image of' + recipe.name">
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        <h2>Ingredients</h2>
                    </div>
                    <div class="card-body">
                        <p class="mb-0">Servings: </p>
                        <div class="d-flex my-2 w-75 gap-2">
                            <button class="btn btn-secondary btn-sm" @click="servings--">-</button>
                            <input type="number" class="form-control" v-model="servings">
                            <button class="btn btn-secondary btn-sm" @click="servings++">+</button>
                        </div>
                        <ul>
                            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                                {{ ingredient.name }} - {{ servingsAmount(ingredient.amount) }} <span
                                    v-if="ingredient.unit?.notation">{{
                                        ingredient.unit?.name }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="card">
                    <div class="card-body">
                        <h2>Instructions</h2>
                        <hr>
                        <div v-for="(instruction, index) in recipe.instructions?.sort((a, b) => { return a.step + b.step })"
                            :key="index">
                            <div class="row px-2">
                                <div class="col-auto d-flex justify-content-center">
                                    {{ instruction.step }}
                                </div>
                                <div class="col-11">
                                    <h4>{{ instruction.title }}</h4>
                                    <p>{{ instruction.description }}</p>
                                </div>
                                <hr v-if="index + 1 != recipe.instructions?.length">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>