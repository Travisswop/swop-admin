export const idShorter = (orderId: string) => {
  if (!orderId || orderId.length < 10) return orderId; // safety check

  const start = orderId.substring(0, 8); // First 5 chars
  const end = orderId.substring(orderId.length - 8); // Last 5 chars
  return `${start}..........${end}`;
};
