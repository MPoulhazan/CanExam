import { Theme } from './types';

export const lightTheme: Theme = {
    fontFamily: 'Comfortaa_400Regular',
    colors: {
        background: '#F6F7F9',
        surface: '#FFFFFF',
        surfaceLight: '#F3F4F6',
        primary: '#00B37E',
        primaryLight: '#33D69F',
        primaryDark: '#00875A',
        secondary: '#0F62FE',
        accent: '#FFB020',
        text: '#0B1220',
        textSecondary: '#475569',
        textMuted: '#94A3B8',
        error: '#EF4444',
        success: '#00B37E',
        border: '#E6E9EF',
        shadow: 'rgba(16, 24, 40, 0.06)',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: '700',
            lineHeight: 40,
        },
        h2: {
            fontSize: 24,
            fontWeight: '600',
            lineHeight: 32,
        },
        h3: {
            fontSize: 20,
            fontWeight: '600',
            lineHeight: 28,
        },
        body: {
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 24,
        },
        bodySmall: {
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 20,
        },
    },
    shadows: {
        sm: {
            shadowColor: '#101828',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 1,
        },
        md: {
            shadowColor: '#101828',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
        },
        lg: {
            shadowColor: '#101828',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.06,
            shadowRadius: 20,
            elevation: 6,
        },
    },
};

export const darkTheme: Theme = {
    colors: {
        background: '#0A0E27',
        surface: '#0F1724',
        surfaceLight: '#111827',
        primary: '#4F46E5',
        primaryLight: '#6366F1',
        primaryDark: '#4338CA',
        secondary: '#10B981',
        accent: '#F59E0B',
        text: '#FFFFFF',
        textSecondary: '#A5B4FC',
        textMuted: '#94A3B8',
        error: '#EF4444',
        success: '#10B981',
        border: '#111827',
        shadow: 'rgba(0, 0, 0, 0.35)',
    },
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    typography: lightTheme.typography,
    shadows: lightTheme.shadows,
};

// Default export kept for backward compatibility (light theme)
export const theme = lightTheme;
