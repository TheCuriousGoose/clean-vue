<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/nav/NavBar.vue';
import LoadingBar from './components/LoadingBar.vue';
</script>

<template>
  <LoadingBar></LoadingBar>
  <header>
    <NavBar></NavBar>
  </header>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped></style>
