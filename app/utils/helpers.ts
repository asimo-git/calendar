export function getDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  return { day, month };
}
