import axios, { type AxiosInstance, AxiosError } from 'axios';

export class ApiClient {
    protected client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
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

    protected async request<T>(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any, params?: any): Promise<T | any> {
        try {
            const response = await this.client.request<T>({
                method,
                url,
                data,
                params,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    return axiosError.response.data;
                } else if (axiosError.request) {
                    console.error('Error Request:', axiosError.request);
                    return { message: 'No response received from the server' };
                } else {
                    console.error('Error Message:', axiosError.message);
                    return { message: `An error occurred: ${axiosError.message}` };
                }
            } else {
                console.error('Unexpected Error:', error);
                return { message: 'An unexpected error occurred' };
            }
        }
    }
}