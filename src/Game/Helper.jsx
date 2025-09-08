export function colorOf(x, y) {
  if (x % 2 == y % 2) return 1;
  return 0;
}
export function isValid(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}
