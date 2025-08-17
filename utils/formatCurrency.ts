export function formatNaira(amount: number | string): string {
  if (typeof amount === "string") {
    amount = parseFloat(amount)
  }
  if (isNaN(amount)) return "₦0"

  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}
