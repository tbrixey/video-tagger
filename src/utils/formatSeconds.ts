export function formatSeconds(sec: string) {
  return new Date(Number(sec) * 1000)
    .toISOString()
    .substr(11, 8)
    .split(":")
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
}
