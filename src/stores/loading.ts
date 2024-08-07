import { reactive } from 'vue';

const loadingState = reactive({
  isLoading: false,
});

export const useLoading = () => loadingState;
