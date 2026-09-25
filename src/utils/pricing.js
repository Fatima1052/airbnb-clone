// Single place for price maths so the booking card, the checkout page and (later)
// the backend all agree. The fee rate is a placeholder until the backend defines it.
export const SERVICE_FEE_RATE = 0.14;

export function calculatePricing(nightlyPrice, nights) {
  const price = Number(nightlyPrice) || 0;
  const count = Math.max(0, Number(nights) || 0);

  const subtotal = price * count;
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);

  return {
    nightlyPrice: price,
    nights: count,
    subtotal,
    serviceFee,
    total: subtotal + serviceFee,
  };
}

export const formatMoney = (amount) =>
  `$${Number(amount || 0).toLocaleString("en-US")}`;
