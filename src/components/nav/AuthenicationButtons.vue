<script setup lang="ts">
import BSModal from '@/components/BSModal.vue';
import TextInput from '../inputs/TextInput.vue';
import { RecipeClient } from '@/api/RecipeClient';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const recipeClient = new RecipeClient();
const userStore = useUserStore();

const errors = ref<any>({});
const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

async function register() {
    const register = await recipeClient.register(form.value);
    if (register.status == 'error') {
        errors.value = register.message;
        return;
    }

    const login = await recipeClient.login({ email: form.value.email, password: form.value.password });
    if (login.status == 'error') {
        errors.value = login.message;
        return;
    }

    const userResponse = await recipeClient.user();

    if (userResponse.status == 'error') {
        return;
    }

    userStore.setUser(userResponse);

    closeModal('registerModal');
}

async function login() {
    const login = await recipeClient.login({ email: form.value.email, password: form.value.password });
    if (login.status == 'error') {
        errors.value = login.message;
        return;
    }

    const userResponse = await recipeClient.user();

    if (userResponse.status == 'error') {
        return;
    }

    userStore.setUser(userResponse);

    closeModal('loginModal');
}

async function logout() {
    await recipeClient.logout();
    
    userStore.logout();
}

function closeModal(id: string) {
    const modal = document.getElementById(id);
    if (!modal) {
        return;
    }

    let close = modal.querySelector('.btn-close');
    if (!(close instanceof HTMLButtonElement)) {
        return;
    }

    close.click();
}

</script>

<template>
    <div v-if="userStore.isLoggedIn">
        <div class="dropdown">
            <span class="dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown"
                aria-expanded="false">
                {{ userStore.user?.name }}
            </span>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="#">View Profile</a></li>
                <li><a class="dropdown-item" @click="logout" href="#">Logout</a></li>
            </ul>
        </div>
    </div>
    <div v-if="!userStore.isLoggedIn" class="d-flex">
        <button class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
        <button class="nav-link ms-2" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
    </div>
    <BSModal modal-id="loginModal" title="Login">
        <TextInput type="email" label="Email" id="email" v-model="form.email" :errors="errors"></TextInput>
        <TextInput type="password" label="Password" id="password" v-model="form.password" :errors="errors">
        </TextInput>
        <small class="text-muted">
            Don't have an account?
            <span class="link-primary cursor-pointer" data-bs-toggle="modal"
                data-bs-target="#registerModal">Register!</span>
        </small>
        <template #footer>
            <button class="btn btn-primary" type="button" @click="login">Login</button>
        </template>
    </BSModal>
    <BSModal modal-id="registerModal" title="Register">
        <TextInput label="Name" id="name" v-model="form.name" :errors="errors"></TextInput>
        <TextInput type="email" label="Email" id="email" v-model="form.email" :errors="errors"></TextInput>
        <TextInput type="password" label="Password" id="Password" v-model="form.password" :errors="errors"></TextInput>
        <TextInput type="password" label="Confirm password" id="password_confirmation"
            v-model="form.password_confirmation" :errors="errors"></TextInput>
        <small class="text-muted">
            Already have an account?
            <span class="link-primary cursor-pointer" data-bs-toggle="modal" data-bs-target="#loginModal">Login!</span>
        </small>
        <template #footer>
            <button class="btn btn-primary" @click="register">Register</button>
        </template>
    </BSModal>

</template>