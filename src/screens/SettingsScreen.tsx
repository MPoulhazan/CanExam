import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { DefaultTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

type ThemeProps = { theme: DefaultTheme };
import Button from '../components/Button';
import { theme } from '../theme';

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(p: ThemeProps) => p.theme.colors.background};
    padding-horizontal: ${(p: ThemeProps) => p.theme.spacing.md}px;
    padding-vertical: ${(p: ThemeProps) => p.theme.spacing.lg}px;
    max-width: 800px;
    align-self: center;
    width: 100%;
`;

const Title = styled.Text`
    color: ${(p: ThemeProps) => p.theme.colors.text};
    font-size: ${(p: ThemeProps) => p.theme.typography.h2.fontSize}px;
    font-weight: ${(p: ThemeProps) => p.theme.typography.h2.fontWeight};
    margin-bottom: ${(p: ThemeProps) => p.theme.spacing.md}px;
`;

const DonationSection = styled.View`
    margin-top: ${(p: ThemeProps) => p.theme.spacing.xl}px;
    padding: ${(p: ThemeProps) => p.theme.spacing.lg}px;
    background-color: rgba(124, 58, 237, 0.1);
    border-radius: 12px;
    border-width: 1px;
    border-color: rgba(124, 58, 237, 0.3);
`;

const DonationTitle = styled.Text`
    color: ${(p: ThemeProps) => p.theme.colors.text};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: ${(p: ThemeProps) => p.theme.spacing.sm}px;
`;

const DonationText = styled.Text`
    color: ${(p: ThemeProps) => p.theme.colors.textSecondary};
    font-size: 14px;
    line-height: 20px;
    margin-bottom: ${(p: ThemeProps) => p.theme.spacing.md}px;
`;

const PayPalButton = styled.TouchableOpacity`
    background-color: #0070ba;
    padding: ${(p: ThemeProps) => p.theme.spacing.md}px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const PayPalButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-left: ${(p: ThemeProps) => p.theme.spacing.sm}px;
`;

const STORAGE_LANG = 'preferred_lang';

const SettingsScreen: React.FC = () => {
    const { i18n, t } = useTranslation();
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

    const openPayPal = () => {
        Linking.openURL('https://www.paypal.com/paypalme/mpoulhazan');
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

            <DonationSection>
                <DonationTitle>{t('settings.donationTitle')}</DonationTitle>
                <DonationText>{t('settings.donationText')}</DonationText>
                <PayPalButton onPress={openPayPal}>
                    <Ionicons name="logo-paypal" size={24} color="white" />
                    <PayPalButtonText>
                        {t('settings.donateButton')}
                    </PayPalButtonText>
                </PayPalButton>
            </DonationSection>
        </Container>
    );
};

export default SettingsScreen;
