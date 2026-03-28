export interface UseAsyncRequestOptions {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
  initialLoading?: boolean;
}

export interface UseAsyncRequestReturn<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
  execute: (requestFn: () => Promise<T>) => Promise<void>;
  reset: () => void;
}
