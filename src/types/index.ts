export interface Question {
    id: number;
    question: {
        fr: string;
        en: string;
    };
    options: {
        fr: string[];
        en: string[];
    };
    correctAnswer: number;
    explanation: {
        fr: string;
        en: string;
    };
}

export type RootStackParamList = {
    Home: undefined;
    Training: undefined;
    Result: { score: number; total: number; passed: boolean } | undefined;
    Statistics: undefined;
    Info: undefined;
    Settings: undefined;
};

export interface Theme {
    colors: {
        background: string;
        surface: string;
        surfaceLight: string;
        primary: string;
        primaryLight: string;
        primaryDark: string;
        secondary: string;
        accent: string;
        text: string;
        textSecondary: string;
        textMuted: string;
        error: string;
        success: string;
        border: string;
        shadow: string;
    };
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
    borderRadius: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        full: number;
    };
    typography: {
        h1: {
            fontSize: number;
            fontWeight: string;
            lineHeight: number;
        };
        h2: {
            fontSize: number;
            fontWeight: string;
            lineHeight: number;
        };
        h3: {
            fontSize: number;
            fontWeight: string;
            lineHeight: number;
        };
        body: {
            fontSize: number;
            fontWeight: string;
            lineHeight: number;
        };
        bodySmall: {
            fontSize: number;
            fontWeight: string;
            lineHeight: number;
        };
    };
    shadows: {
        sm: {
            shadowColor: string;
            shadowOffset: { width: number; height: number };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
        };
        md: {
            shadowColor: string;
            shadowOffset: { width: number; height: number };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
        };
        lg: {
            shadowColor: string;
            shadowOffset: { width: number; height: number };
            shadowOpacity: number;
            shadowRadius: number;
            elevation: number;
        };
    };
    // optional font family loaded from Google Fonts
    fontFamily?: string;
}

declare module 'styled-components/native' {
    export interface DefaultTheme extends Theme {}
}
