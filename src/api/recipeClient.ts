import axios, { type AxiosInstance } from 'axios';

export interface Recipe {
    id: number;
    name: string;
    user_id: number;
    category_id: number;
    description: string;
    image: string;
    preparation_time: number;
    cooking_time: number;
    servings: number;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    ingredients: Array<{ id: number; name: string; amount: string; unit_id: number }>;
}

export interface RecipeResponse {
    recipes: Recipe[];
    message?: string;
    status: 'success' | 'error';
}

export interface getRecipesParams {
    category?: number;
    search?: string;
    sort?: 'rating' | 'date';
    order?: 'asc' | 'desc';
}

export interface User {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export class RecipeClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: 'http://recipe-back-end.test/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem('bearingToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    async getRecipes(parameters: getRecipesParams): Promise<RecipeResponse> {
        const params: { [key: string]: any } = {};

        if (parameters.category) {
            params.category = parameters.category;
        }

        if (parameters.search) {
            params.search = parameters.search;
        }

        if (parameters.sort) {
            params.sort = parameters.sort;
            params.order = parameters.order || 'desc';
        }

        const response = await this.client.get('/recipes', { params });
        return response.data;
    }

    async createRecipe(recipeData: Omit<Recipe, 'id'>): Promise<RecipeResponse> {
        const response = await this.client.post('/recipes', recipeData);
        return response.data;
    }

    async getRecipe(recipeId: number): Promise<RecipeResponse> {
        const response = await this.client.get(`/recipes/${recipeId}`);
        return response.data;
    }

    async updateRecipe(recipeId: number, recipeData: Omit<Recipe, 'id'>): Promise<RecipeResponse> {
        const response = await this.client.put(`/recipes/${recipeId}`, recipeData);
        return response.data;
    }

    async deleteRecipe(recipeId: number): Promise<void> {
        await this.client.delete(`/recipes/${recipeId}`);
    }

    async registerUser(userData: User): Promise<{ token: string }> {
        const response = await this.client.post('/register', userData);
        localStorage.setItem('bearingToken', response.data.token);
        return response.data;
    }

    async loginUser(credentials: { email: string; password: string }): Promise<{ token: string }> {
        const response = await this.client.post('/login', credentials);
        localStorage.setItem('bearingToken', response.data.token);
        return response.data;
    }

    async logoutUser(): Promise<void> {
        await this.client.post('/logout');
        localStorage.removeItem('bearingToken');
    }

    async getReviews(recipeId: number): Promise<any[]> {
        const response = await this.client.get(`/recipes/${recipeId}/reviews`);
        return response.data;
    }

    async createReview(recipeId: number, reviewData: any): Promise<any> {
        const response = await this.client.post(`/recipes/${recipeId}/reviews`, reviewData);
        return response.data;
    }

    async updateReview(recipeId: number, reviewId: number, reviewData: any): Promise<any> {
        const response = await this.client.put(`/recipes/${recipeId}/reviews/${reviewId}`, reviewData);
        return response.data;
    }

    async deleteReview(recipeId: number, reviewId: number): Promise<void> {
        await this.client.delete(`/recipes/${recipeId}/reviews/${reviewId}`);
    }
}