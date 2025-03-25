export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};
