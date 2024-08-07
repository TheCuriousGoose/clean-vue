import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoading } from '@/stores/loading';
import ShowView from '@/views/recipes/ShowView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recipes/:recipe',
      name: 'home',
      component: ShowView
    }
  ]
})

const loadingState = useLoading();

router.beforeEach((to, from, next) => {
  loadingState.isLoading = true;
  next();
});

router.afterEach(() => {
  loadingState.isLoading = false;
});

export default router
