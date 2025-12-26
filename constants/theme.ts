export const COLORS = {
  primary: '#6C63FF',
  primaryDark: '#5A52D5',
  primaryLight: '#8B85FF',
  secondary: '#FF6B6B',
  secondaryDark: '#E55555',
  accent: '#4ECDC4',
  accentDark: '#3DB8B0',
  
  success: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
  
  background: '#F8F9FE',
  surface: '#FFFFFF',
  surfaceLight: '#F5F6FA',
  
  text: '#1A1A2E',
  textSecondary: '#666687',
  textLight: '#9999AA',
  textWhite: '#FFFFFF',
  
  border: '#E8E8F0',
  borderLight: '#F0F0F5',
  
  shadow: '#1A1A2E',
  overlay: 'rgba(26, 26, 46, 0.5)',
  
  gradient: {
    primary: ['#6C63FF', '#8B85FF'],
    secondary: ['#FF6B6B', '#FF8E8E'],
    accent: ['#4ECDC4', '#7EDDD6'],
    dark: ['#1A1A2E', '#2D2D44'],
  },
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  font: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
};

export const FONTS = {
  regular: {
    fontWeight: '400' as const,
  },
  medium: {
    fontWeight: '500' as const,
  },
  semiBold: {
    fontWeight: '600' as const,
  },
  bold: {
    fontWeight: '700' as const,
  },
};
