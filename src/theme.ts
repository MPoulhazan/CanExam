import { Theme } from './types';

export const lightTheme: Theme = {
    fontFamily: 'Comfortaa_400Regular',
    colors: {
        background: '#0A0E27',
        surface: 'rgba(255, 255, 255, 0.08)',
        surfaceLight: 'rgba(255, 255, 255, 0.05)',
        primary: '#7C3AED',
        primaryLight: '#A78BFA',
        primaryDark: '#5B21B6',
        secondary: '#06B6D4',
        accent: '#F59E0B',
        text: '#FFFFFF',
        textSecondary: 'rgba(255, 255, 255, 0.8)',
        textMuted: 'rgba(255, 255, 255, 0.5)',
        error: '#EF4444',
        success: '#10B981',
        border: 'rgba(255, 255, 255, 0.1)',
        shadow: 'rgba(0, 0, 0, 0.3)',
        cardGradient: 'rgba(124, 58, 237, 0.1)',
        glowPrimary: 'rgba(124, 58, 237, 0.4)',
        glowSecondary: 'rgba(6, 182, 212, 0.4)',
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
    fontFamily: 'Comfortaa_400Regular',
    colors: {
        background: '#0A0E27',
        surface: 'rgba(255, 255, 255, 0.05)',
        surfaceLight: 'rgba(255, 255, 255, 0.03)',
        primary: '#7C3AED',
        primaryLight: '#A78BFA',
        primaryDark: '#5B21B6',
        secondary: '#06B6D4',
        accent: '#F59E0B',
        text: '#FFFFFF',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        textMuted: 'rgba(255, 255, 255, 0.4)',
        error: '#EF4444',
        success: '#10B981',
        border: 'rgba(255, 255, 255, 0.1)',
        shadow: 'rgba(0, 0, 0, 0.5)',
        cardGradient: 'rgba(124, 58, 237, 0.15)',
        glowPrimary: 'rgba(124, 58, 237, 0.5)',
        glowSecondary: 'rgba(6, 182, 212, 0.5)',
    },
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    typography: lightTheme.typography,
    shadows: lightTheme.shadows,
};

// Default export kept for backward compatibility (light theme)
export const theme = lightTheme;
