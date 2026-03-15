import { useState, useCallback } from "react";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface UseAsyncRequestOptions {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

interface UseAsyncRequestReturn<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
  execute: (requestFn: () => Promise<T>) => Promise<void>;
  reset: () => void;
}

/**
 * Hook personalizado para manejar peticiones async
 * Gestiona estados de carga, error y datos, además de mostrar toasts automáticamente
 * 
 * @template T - Tipo de datos que retorna la petición
 * @param options - Opciones de configuración del hook
 * @returns Objeto con estados y funciones para manejar la petición
 * 
 * @example
 * const { isLoading, error, data, execute } = useAsyncRequest<LoginResponse>({
 *   successMessage: "Login exitoso",
 *   onSuccess: (data) => router.push("/dashboard")
 * });
 * 
 * await execute(() => login(credentials));
 */
export function useAsyncRequest<T>(
  options: UseAsyncRequestOptions = {}
): UseAsyncRequestReturn<T> {
  const {
    showToast = true,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  /**
   * Extrae el mensaje de error de una excepción
   */
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

  /**
   * Ejecuta la petición async
   */
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
      } finally {
        setIsLoading(false);
      }
    },
    [showToast, successMessage, errorMessage, onSuccess, onError, extractErrorMessage]
  );

  /**
   * Limpia todos los estados
   */
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
