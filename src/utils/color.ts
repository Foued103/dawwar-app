// Utility to convert a hex color to rgba() with an alpha value
// Supports #RGB and #RRGGBB formats. Falls back to the input color on parse errors.
export function withAlpha(hexColor: string, alpha: number): string {
  if (typeof hexColor !== 'string') return hexColor as unknown as string;
  const hex = hexColor.replace('#', '');

  let r = 0;
  let g = 0;
  let b = 0;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    return hexColor;
  }

  const a = Math.max(0, Math.min(1, Number.isFinite(alpha) ? alpha : 1));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default withAlpha;

