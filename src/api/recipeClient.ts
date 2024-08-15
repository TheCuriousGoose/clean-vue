import { ApiClient } from './ApiClient'; // Adjust the import path as needed

export interface Recipe {
    id: number;
    name: string;
    user_id: number;
    category_id: number;
    category: { id: number; name: string };
    description: string;
    image: string;
    preparation_time: number;
    instructions?: Instruction[];
    cooking_time: number;
    servings: number;
    is_published: boolean;
    author: User;
    created_at: string;
    updated_at: string;
    ingredients: Ingredients[];
}

export interface Unit {
    id: number;
    name: string;
    notation: string;
}

export interface Ingredients {
    id: number;
    name: string;
    amount: string;
    unit: Unit;
}

export interface CategoryResponse {
    categories: Category[];
    message?: string;
    status: 'success' | 'error';
}

export interface Category {
    id: number;
    name: string;
}

export interface Instruction {
    id: number;
    step: number;
    recipe_id: number;
    description: string;
    title: string;
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
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface UserResponse {
    user: User;
    message?: string;
    status: 'success' | 'error';
}

export interface Review {
    id: number;
    user_id: number;
    recipe_id: number;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

export interface Auth {
    status?: 'success' | 'error';
    token?: string;
    message?: object | string;
}

export class RecipeClient extends ApiClient {
    constructor() {
        super('http://recipe-back-end.test/api');
    }

    async getRecipes(parameters: getRecipesParams): Promise<RecipeResponse> {
        return this.request<RecipeResponse>('get', '/recipes', undefined, parameters);
    }

    async createRecipe(recipeData: Omit<Recipe, 'id'>): Promise<RecipeResponse> {
        return this.request<RecipeResponse>('post', '/recipes', recipeData);
    }

    async getRecipe(recipeId: number): Promise<RecipeResponse> {
        return this.request<RecipeResponse>('get', `/recipes/${recipeId}`);
    }

    async updateRecipe(recipeId: number, recipeData: Omit<Recipe, 'id'>): Promise<RecipeResponse> {
        return this.request<RecipeResponse>('put', `/recipes/${recipeId}`, recipeData);
    }

    async deleteRecipe(recipeId: number): Promise<void> {
        await this.request<void>('delete', `/recipes/${recipeId}`);
    }

    async register(userData: User): Promise<Auth> {
        const response = await this.request<{ token: string }>('post', '/register', userData);
        localStorage.setItem('bearingToken', response.token);
        return response;
    }

    async login(credentials: { email: string; password: string }): Promise<Auth> {
        const response = await this.request<Auth>('post', '/login', credentials);
        localStorage.setItem('bearingToken', response.token || '');
        return response;
    }

    async logout(): Promise<void> {
        await this.request<void>('post', '/logout');
        localStorage.removeItem('bearingToken');
    }

    async user(): Promise<UserResponse> {
       return await this.request<UserResponse>('get', '/user');
    }

    async getReviews(recipeId: number): Promise<any[]> {
        return this.request<any[]>('get', `/recipes/${recipeId}/reviews`);
    }

    async createReview(recipeId: number, reviewData: any): Promise<any> {
        return this.request<any>('post', `/recipes/${recipeId}/reviews`, reviewData);
    }

    async updateReview(recipeId: number, reviewId: number, reviewData: any): Promise<any> {
        return this.request<any>('put', `/recipes/${recipeId}/reviews/${reviewId}`, reviewData);
    }

    async deleteReview(recipeId: number, reviewId: number): Promise<void> {
        await this.request<void>('delete', `/recipes/${recipeId}/reviews/${reviewId}`);
    }

    async getCategories(): Promise<CategoryResponse> {
        return this.request<CategoryResponse>('get', '/categories');
    }
}
