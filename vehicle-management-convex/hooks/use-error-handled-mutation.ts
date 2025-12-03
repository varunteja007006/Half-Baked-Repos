import { withErrorHandling } from "@/lib/error-handler";
import { useCallback, useRef } from "react";

/**
 * Hook for operations that need error handling
 * Can be used for Convex mutations, file uploads, and other async operations
 */
export function useErrorHandledOperation() {
  return async <T>(
    operation: () => Promise<T>,
    options?: {
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
      loadingToastId?: string;
      // Toast customization options
      successDismissible?: boolean;
      successDuration?: number;
      errorDismissible?: boolean;
      errorDuration?: number;
    },
  ): Promise<T | null> => {
    return withErrorHandling(operation, options);
  };
}

/**
 * Hook that provides race condition protection for async operations
 * Prevents multiple simultaneous calls to the same operation
 */
export function useRaceConditionSafeOperation() {
  const operationInProgress = useRef(false);

  const execute = useCallback(
    async <T>(
      operation: () => Promise<T>,
      options?: {
        loadingMessage?: string;
        successMessage?: string;
        errorMessage?: string;
        loadingToastId?: string;
        successDismissible?: boolean;
        successDuration?: number;
        errorDismissible?: boolean;
        errorDuration?: number;
      },
    ): Promise<T | null> => {
      // Prevent multiple simultaneous operations
      if (operationInProgress.current) {
        console.warn("Operation already in progress, ignoring duplicate request");
        return null;
      }

      operationInProgress.current = true;

      try {
        const result = await withErrorHandling(operation, options);
        return result;
      } finally {
        operationInProgress.current = false;
      }
    },
    [],
  );

  return {
    execute,
    isInProgress: operationInProgress.current,
  };
}
