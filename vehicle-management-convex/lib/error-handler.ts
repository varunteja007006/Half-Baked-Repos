import { toast } from "sonner";

/**
 * Convex error interface - matches the structure of errors thrown by Convex
 */
interface ConvexError extends Error {
  code?: string;
  message: string;
}

/**
 * Extract clean error message from Convex error
 */
function extractConvexErrorMessage(error: unknown): string {
  if (!error) return "An unexpected error occurred";

  // Handle ConvexError objects
  if (typeof error === "object" && error !== null && "message" in error) {
    const convexError = error as ConvexError;
    let message = convexError.message;

    // Remove technical prefixes from Convex error messages
    message = message.replace(/^\[CONVEX [^\]]+\]\s*/, ""); // Remove [CONVEX ...] prefix
    message = message.replace(/^\[Request ID: [^\]]+\]\s*/, ""); // Remove [Request ID: ...] prefix
    message = message.replace(/^Server Error\s*/, ""); // Remove "Server Error" prefix
    message = message.replace(/^Uncaught Error:\s*/, ""); // Remove "Uncaught Error:" prefix

    return message.trim();
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  // Fallback for unknown error types
  return "An unexpected error occurred";
}

/**
 * Enhanced error messages for better user experience
 */
const ERROR_MESSAGES = {
  // Authentication errors
  "Not authenticated": "Please log in to continue",
  "Authentication required": "Please log in to continue",
  Unauthorized: "You don't have permission to perform this action",

  // Document upload errors
  "already exist": (originalMessage: string) => {
    // Extract document types from the original message
    const match = originalMessage.match(/Document\(s\) already exist for this user: ([^.]+)/);
    if (match) {
      const docTypes = match[1];
      return `You have already uploaded these documents: ${docTypes}. Please delete the existing documents first if you want to upload new versions.`;
    }
    return "Some documents already exist. Please delete existing documents before uploading new ones.";
  },

  // Network/connectivity errors
  fetch: "Network error. Please check your internet connection and try again.",
  "Failed to fetch": "Network error. Please check your internet connection and try again.",

  // File upload errors
  "File size": "File size is too large. Please choose a smaller file.",
  "file type": "Invalid file type. Please upload a supported file format.",

  // Generic fallbacks
  "Internal server error": "Something went wrong on our end. Please try again later.",
  "Bad request": "Invalid request. Please check your input and try again.",
} as const;

/**
 * Get user-friendly error message
 */
function getUserFriendlyMessage(originalMessage: string): string {
  const lowerMessage = originalMessage.toLowerCase();

  // Check for specific error patterns
  for (const [pattern, friendlyMessage] of Object.entries(ERROR_MESSAGES)) {
    if (lowerMessage.includes(pattern.toLowerCase())) {
      if (typeof friendlyMessage === "function") {
        return friendlyMessage(originalMessage);
      }
      return friendlyMessage;
    }
  }

  // Return cleaned original message if no pattern matches
  return originalMessage;
}

/**
 * Handle Convex errors with user-friendly toast messages
 */
export function handleConvexError(
  error: unknown,
  fallbackMessage?: string,
  options?: {
    dismissible?: boolean;
    duration?: number;
  },
): void {
  console.error("Convex error:", error);

  const cleanMessage = extractConvexErrorMessage(error);
  const friendlyMessage = getUserFriendlyMessage(cleanMessage);

  toast.error(friendlyMessage || fallbackMessage || "An unexpected error occurred", {
    dismissible: options?.dismissible ?? true, // Default to dismissible
    duration: options?.duration ?? 5000, // Default to 5 seconds
  });
}

/**
 * Handle async operations with automatic error handling
 *
 * Features:
 * - All toasts are dismissible by default
 * - Customizable duration for success and error toasts
 * - Loading states with automatic cleanup
 * - User-friendly error messages
 *
 * @example
 * ```typescript
 * await withErrorHandling(
 *   () => mutation(data),
 *   {
 *     loadingMessage: "Saving...",
 *     successMessage: "Saved successfully!",
 *     errorMessage: "Failed to save",
 *     successDuration: 3000, // 3 seconds
 *     errorDuration: 5000,   // 5 seconds (longer for errors)
 *     errorDismissible: true  // Can be manually dismissed
 *   }
 * );
 * ```
 */
export async function withErrorHandling<T>(
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
): Promise<T | null> {
  const {
    loadingMessage,
    successMessage,
    errorMessage,
    loadingToastId,
    successDismissible = true,
    successDuration = 3000,
    errorDismissible = true,
    errorDuration = 5000,
  } = options || {};

  // Generate a unique loading toast ID if not provided to prevent conflicts
  const toastId =
    loadingToastId || `operation-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  try {
    if (loadingMessage) {
      toast.loading(loadingMessage, { id: toastId });
    }

    const result = await operation();

    // Always dismiss the loading toast before showing success
    if (loadingMessage) {
      toast.dismiss(toastId);
    }

    if (successMessage) {
      toast.success(successMessage, {
        dismissible: successDismissible,
        duration: successDuration,
      });
    }

    return result;
  } catch (error) {
    // Always dismiss the loading toast before showing error
    if (loadingMessage) {
      toast.dismiss(toastId);
    }

    handleConvexError(error, errorMessage, {
      dismissible: errorDismissible,
      duration: errorDuration,
    });
    return null;
  }
}

/**
 * Specific error handlers for common operations
 */
export const errorHandlers = {
  documentUpload: (error: unknown) =>
    handleConvexError(error, "Failed to upload documents", { dismissible: true, duration: 5000 }),
  documentDelete: (error: unknown) =>
    handleConvexError(error, "Failed to delete document", { dismissible: true, duration: 4000 }),
  documentApproval: (error: unknown) =>
    handleConvexError(error, "Failed to update document approval", {
      dismissible: true,
      duration: 5000,
    }),
  authentication: (error: unknown) =>
    handleConvexError(error, "Authentication failed", { dismissible: true, duration: 6000 }),
  dataFetch: (error: unknown) =>
    handleConvexError(error, "Failed to load data", { dismissible: true, duration: 4000 }),
} as const;
