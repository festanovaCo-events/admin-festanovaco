export interface UseAsyncRequestOptions<T = unknown> {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  initialLoading?: boolean;
}

export interface UseAsyncRequestReturn<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
  execute: (requestFn: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}
