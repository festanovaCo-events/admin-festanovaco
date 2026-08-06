import type { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type {
  UseAsyncRequestOptions,
  UseAsyncRequestReturn,
} from "@/interfaces/hooks/use-async-request.interface";

export function useAsyncRequest<T>(
  options: UseAsyncRequestOptions<T> = {},
): UseAsyncRequestReturn<T> {
  const {
    showToast = true,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    initialLoading = true,
  } = options;

  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const extractErrorMessage = useCallback((err: unknown): string => {
    if (err && typeof err === "object" && "response" in err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      return (
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Ha ocurrido un error"
      );
    }
    if (err instanceof Error) {
      return err.message;
    }
    return "Ha ocurrido un error desconocido";
  }, []);

  const execute = useCallback(
    async (requestFn: () => Promise<T>) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await requestFn();
        setData(result);

        if (showToast && successMessage) {
          toast.success(successMessage);
        }

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err: unknown) {
        const errorMsg = extractErrorMessage(err);
        setError(errorMsg);

        if (showToast) {
          const message = errorMessage || errorMsg;
          toast.error(message);
        }

        if (onError) {
          onError(errorMsg);
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [
      showToast,
      successMessage,
      errorMessage,
      onSuccess,
      onError,
      extractErrorMessage,
    ],
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    isLoading,
    error,
    data,
    execute,
    reset,
  };
}
