export const formatDate = (isoDate: Date | string | undefined): string => {
  if (!isoDate) {
    return ""; // Or "N/A"
  }

  const date = new Date(isoDate);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
