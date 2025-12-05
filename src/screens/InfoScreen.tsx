import React from 'react';
import { Linking, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styled-components';

type ThemeProps = { theme: DefaultTheme };
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { theme } from '../theme';
import { useTranslation } from 'react-i18next';

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

const Paragraph = styled.Text`
    color: ${(p: ThemeProps) => p.theme.colors.textSecondary};
    font-size: ${(p: ThemeProps) => p.theme.typography.body.fontSize}px;
    margin-bottom: ${(p: ThemeProps) => p.theme.spacing.md}px;
`;

const LinkRow = styled.View`
    flex-direction: row;
    margin-bottom: ${(p: ThemeProps) => p.theme.spacing.sm}px;
    align-items: center;
    justify-content: space-between;
`;

const LinkText = styled.Text`
    color: ${(p: ThemeProps) => p.theme.colors.primaryLight};
    font-weight: 600;
`;

const InfoScreen: React.FC = () => {
    const { t } = useTranslation();
    const open = (url: string) => Linking.openURL(url);

    return (
        <Container>
            <ScrollView>
                <Title>{t('info.title')}</Title>
                <Paragraph>{t('info.overview')}</Paragraph>

                <Paragraph>{t('info.format')}</Paragraph>

                <Paragraph>{t('info.tips')}</Paragraph>

                <Title>{t('info.linksTitle')}</Title>

                <LinkRow>
                    <LinkText>{t('info.ircc')}</LinkText>
                    <Button
                        variant="secondary"
                        onPress={() =>
                            open(
                                'https://www.canada.ca/en/immigration-refugees-citizenship.html'
                            )
                        }
                    >
                        Open
                    </Button>
                </LinkRow>

                <LinkRow>
                    <LinkText>{t('info.discover')}</LinkText>
                    <Button
                        variant="secondary"
                        onPress={() =>
                            open(
                                'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html'
                            )
                        }
                    >
                        Open
                    </Button>
                </LinkRow>

                <LinkRow>
                    <LinkText>{t('info.testPage')}</LinkText>
                    <Button
                        variant="secondary"
                        onPress={() =>
                            open(
                                'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html'
                            )
                        }
                    >
                        Open
                    </Button>
                </LinkRow>

                <Paragraph>
                    {t(
                        'info.closing',
                        'Good luck with your preparation — review main topics and practice regularly.'
                    )}
                </Paragraph>
            </ScrollView>
        </Container>
    );
};

export default InfoScreen;
