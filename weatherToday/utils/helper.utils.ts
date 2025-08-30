import { format } from "date-fns";

/**
 * Format a given date (in seconds) into a human-readable string.
 *
 * @param {number | null} date The date to format, or null to return null.
 *
 * @returns {string | null} The formatted date string in the format "PPpp", or null if the input was null.
 */
export const formatDate = (date: number | null, formatString?: string) => {
  if (!date) {
    return null;
  }
  return format(new Date(date * 1000), formatString ?? "PPpp");
};
