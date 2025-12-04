import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import { theme } from '../theme';

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(p) => p.theme.colors.background};
    padding: ${(p) => p.theme.spacing.lg}px;
`;

const Title = styled.Text`
    color: ${(p) => p.theme.colors.text};
    font-size: ${(p) => p.theme.typography.h2.fontSize}px;
    font-weight: ${(p) => p.theme.typography.h2.fontWeight};
    margin-bottom: ${(p) => p.theme.spacing.md}px;
`;

const STORAGE_LANG = 'preferred_lang';

const SettingsScreen: React.FC = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language);

    useEffect(() => {
        const load = async () => {
            const stored = await AsyncStorage.getItem(STORAGE_LANG);
            if (stored) {
                setLang(stored);
                i18n.changeLanguage(stored);
            }
        };
        load();
    }, []);

    const setLanguage = async (l: string) => {
        setLang(l);
        i18n.changeLanguage(l);
        await AsyncStorage.setItem(STORAGE_LANG, l);
    };

    return (
        <Container>
            <Title>Paramètres</Title>
            <Button onPress={() => setLanguage('fr')} outline={lang === 'fr'}>
                Français
            </Button>
            <View style={{ height: theme.spacing.sm }} />
            <Button onPress={() => setLanguage('en')} outline={lang === 'en'}>
                English
            </Button>
        </Container>
    );
};

export default SettingsScreen;
