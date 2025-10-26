// Dawwar App Colors - Professional & Modern Theme
// Eco-friendly green palette with modern accents

export const colors = {
  // Primary Colors
  primary: '#10B981',        // Emerald green (main brand color)
  primaryDark: '#059669',    // Darker green for emphasis
  primaryLight: '#6EE7B7',   // Light green for highlights
  
  // Secondary Colors
  secondary: '#3B82F6',      // Blue for secondary actions
  secondaryDark: '#1E40AF',  // Darker blue
  secondaryLight: '#93C5FD', // Light blue
  
  // Neutral Colors
  background: '#FFFFFF',     // White background
  surface: '#F9FAFB',        // Light gray for cards
  surfaceDark: '#F3F4F6',    // Slightly darker surface
  
  // Text Colors
  text: '#111827',           // Almost black for primary text
  textSecondary: '#6B7280',  // Gray for secondary text
  textLight: '#9CA3AF',      // Light gray for hints
  textWhite: '#FFFFFF',      // White text for dark backgrounds
  
  // Status Colors
  success: '#10B981',        // Green for success
  error: '#EF4444',          // Red for errors
  warning: '#F59E0B',        // Orange for warnings
  info: '#3B82F6',           // Blue for info
  
  // Accent Colors
  accent: '#8B5CF6',         // Purple accent
  accentLight: '#C4B5FD',    // Light purple
  
  // Border & Divider
  border: '#E5E7EB',         // Light gray border
  divider: '#F3F4F6',        // Very light gray divider
  
  // Shadows
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
  
  // Tab Bar
  tabBarActive: '#10B981',   // Active tab color
  tabBarInactive: '#9CA3AF', // Inactive tab color
  tabBarBackground: '#FFFFFF',
  
  // Camera Overlay
  cameraOverlay: 'rgba(0, 0, 0, 0.5)',
  scannerFrame: '#10B981',
} as const;

export type Colors = typeof colors;
