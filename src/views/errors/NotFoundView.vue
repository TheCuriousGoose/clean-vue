<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
const notFoundMessages: string[] = [
    "Oops! This page has gone on vacation.",
    "But hey, at least you found this funny message!",
    "Looks like you've reached the end of the internet. Sorry, no page here!",
    "Maybe it's hiding with Waldo?",
    "This page is in another castle. Try again!",
    "It must be playing hide and seek.",
    "Oops! Looks like the page took a wrong turn.",
    "Maybe it's on a coffee break?",
    "This page has gone fishing. Try another one!",
    "It's probably off exploring the universe.",
];

const randomNotFoundMessage = computed(() => {
    const randomIndex = Math.floor(Math.random() * notFoundMessages.length);
    return notFoundMessages[randomIndex];
});

</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="text-center">
                    <h1 class="display-4">404</h1>
                    <p class="lead">Page Not Found</p>
                    <p>{{ randomNotFoundMessage }}</p>
                    <RouterLink to="/" class="btn btn-primary">Go Back to Home</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-top: 100px;
}
</style>