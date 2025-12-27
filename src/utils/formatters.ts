export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const ratingFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
