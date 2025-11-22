export function toTimeFormat(str?: string) {
  if (!str) {
    return '';
  }
  const time = new Date(str);
  const minutes = time.getMinutes();
  const hours = time.getHours();

  return `${hours}:${minutes.toString().length < 2 ? '0' + minutes : minutes}`;
}
