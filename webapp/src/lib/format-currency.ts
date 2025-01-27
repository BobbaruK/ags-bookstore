export const formatCurrency = (
  value: number | undefined,
  currency: string | undefined = "USD",
  style: "decimal" | "currency" = "currency",
  fractionDigits: {
    minDecimals?: number | undefined;
    maxDecimals?: number | undefined;
  } = { minDecimals: 2, maxDecimals: 2 },
) => {
  if (value === undefined) {
    return "N/A";
  }

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: style,
    currency: currency,
    minimumFractionDigits: fractionDigits.minDecimals,
    maximumFractionDigits: fractionDigits.maxDecimals,
  }).format(value);

  // If both minDecimals and maxDecimals are 0, replace ',' with '.'
  if (fractionDigits.minDecimals === 0 && fractionDigits.maxDecimals === 0) {
    return formattedValue.replace(/,/g, ".");
  }

  return formattedValue;
};
