// Main theme export file

export { colors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';

// Combine all theme properties
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,
} as const;

export type Theme = typeof theme;
