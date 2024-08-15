import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserResponse } from '@/api/RecipeClient'; 
import { useLocalStorage } from '@/utils/useLocalStorage';

export const useUserStore = defineStore('user', () => {
    const user = useLocalStorage<any>('user', null);
    const token = ref<string | null>(localStorage.getItem('bearingToken'));

    const isLoggedIn = computed(() => !!token.value);

    // Action to set user data
    function setUser(data: UserResponse) {
        if(data.status != 'error'){
            user.value = data.user;
            token.value = localStorage.getItem('bearingToken')
        }
    }

    function logout() {
        user.value = null;
        token.value = null;
        localStorage.removeItem('bearingToken');
    }

    return {
        user,
        token,
        isLoggedIn,
        setUser,
        logout
    };
});
