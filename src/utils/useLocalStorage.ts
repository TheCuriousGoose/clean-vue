import { ref, watch } from 'vue';

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const storedValue = localStorage.getItem(key);
    const parsedValue = storedValue !== null ? JSON.parse(storedValue) : defaultValue;

    const localStorageRef = ref<T>(parsedValue);

    watch(localStorageRef, (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
    }, { deep: true });

    return localStorageRef;
}