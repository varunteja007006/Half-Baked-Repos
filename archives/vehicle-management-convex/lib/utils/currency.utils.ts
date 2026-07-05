export function formatCurrency(
  amount: number | null | undefined,
  currency: string = "INR",
  locale: string = "en-IN",
): string {
  if (amount === null || amount === undefined) {
    return "N/A";
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // fallback if invalid currency
    return `${amount} ${currency}`;
  }
}
