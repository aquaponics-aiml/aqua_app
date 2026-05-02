export const colors = {
  primary: '#38B2AC',
  primaryDark: '#2C7A7B',
  secondary: '#81E6D9',
  accent: '#63B3ED',
  accentSoft: '#BEE3F8',
  background: '#F7FAFC',
  surface: '#FFFFFF',
  surfaceGlass: 'rgba(255, 255, 255, 0.7)',
  surfaceMint: '#E6FFFA',
  surfaceBlue: '#EBF8FF',
  textPrimary: '#2D3748',
  textSecondary: '#718096',
  textMuted: '#A0AEC0',
  success: '#48BB78',
  warning: '#ED8936',
  error: '#F56565',
  border: 'rgba(56, 178, 172, 0.2)',
  borderSoft: '#E2E8F0',
  userBubble: '#63B3ED',
  aiBubble: '#FFFFFF',
  waterGradient: ['#E6FFFA', '#EBF8FF'] as const,
  drawerGradient: ['#E6FFFA', '#F7FAFC'] as const,
  primaryGradient: ['#38B2AC', '#4FD1C5'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 9999,
};

export const shadows = {
  glass: {
    shadowColor: '#38B2AC',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
};
