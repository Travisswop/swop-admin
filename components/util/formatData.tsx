export const formatDate = (isoDate: Date | undefined): string => {
  if (!isoDate) {
    return ""; // Or return a placeholder, e.g., "N/A" if you prefer
  }
  const date = new Date(isoDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  // Return the formatted date as a string
  return `${day}/${month}/${year}`;
};
