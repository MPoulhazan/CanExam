import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { DefaultTheme } from 'styled-components';

type ThemeProps = { theme: DefaultTheme };
import Button from '../components/Button';
import { theme } from '../theme';
import { ThemeModeContext } from '../../App';
import { Switch } from 'react-native';

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(p: ThemeProps) => p.theme.colors.background};
    padding: ${(p: ThemeProps) => p.theme.spacing.lg}px;
`;

const Title = styled.Text`
    color: ${(p: ThemeProps) => p.theme.colors.text};
    font-size: ${(p: ThemeProps) => p.theme.typography.h2.fontSize}px;
    font-weight: ${(p: ThemeProps) => p.theme.typography.h2.fontWeight};
    margin-bottom: ${(p: ThemeProps) => p.theme.spacing.md}px;
`;

const STORAGE_LANG = 'preferred_lang';
const STORAGE_THEME = 'preferred_theme';

const SettingsScreen: React.FC = () => {
    const { i18n, t } = useTranslation();
    const [lang, setLang] = useState(i18n.language);
    const { mode, setMode } = useContext(ThemeModeContext);
    const [isDark, setIsDark] = useState(mode === 'dark');

    useEffect(() => {
        const load = async () => {
            const stored = await AsyncStorage.getItem(STORAGE_LANG);
            if (stored) {
                setLang(stored);
                i18n.changeLanguage(stored);
            }
            const storedTheme = await AsyncStorage.getItem(STORAGE_THEME);
            if (storedTheme === 'dark' || storedTheme === 'light') {
                setIsDark(storedTheme === 'dark');
                setMode(storedTheme as 'dark' | 'light');
            }
        };
        load();
    }, []);

    const setLanguage = async (l: string) => {
        setLang(l);
        i18n.changeLanguage(l);
        await AsyncStorage.setItem(STORAGE_LANG, l);
    };

    const toggleTheme = async (value: boolean) => {
        setIsDark(value);
        const m = value ? 'dark' : 'light';
        setMode(m as 'dark' | 'light');
        await AsyncStorage.setItem(STORAGE_THEME, m);
    };

    return (
        <Container>
            <Title>{t('home.settings')}</Title>
            <Button onPress={() => setLanguage('fr')} outline={lang === 'fr'}>
                Français
            </Button>
            <View style={{ height: theme.spacing.sm }} />
            <Button onPress={() => setLanguage('en')} outline={lang === 'en'}>
                English
            </Button>

            <View style={{ height: theme.spacing.lg }} />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Title style={{ fontSize: 16, marginBottom: 0 }}>
                    {t('settings.darkMode')}
                </Title>
                <Switch value={isDark} onValueChange={toggleTheme} />
            </View>
        </Container>
    );
};

export default SettingsScreen;
