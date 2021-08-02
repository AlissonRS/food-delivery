export function formatDateToLocal(dateStr: Date) {
  const date = new Date(dateStr).toUTCString();
  return new Date(date).toLocaleString();
}
