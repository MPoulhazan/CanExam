import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ScrollView,
    Text,
    Animated,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import MenuCard from '../components/MenuCard';
import { theme } from '../theme';
import { DefaultTheme } from 'styled-components';
import { RootStackParamList } from '../types';
import Logo from '../components/Logo';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

type ThemeProps = { theme: DefaultTheme };

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props: ThemeProps) => props.theme.colors.background};
`;

const ScrollContainer = styled(ScrollView)`
    flex: 1;
`;

const Content = styled.View`
    padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
    padding-bottom: ${(props: ThemeProps) =>
        props.theme.spacing.xxl}px; /* leave space for footer */
`;

const Footer = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: ${(props: ThemeProps) => props.theme.spacing.md}px;
    align-items: center;
    background-color: transparent;
`;

const Header = styled.View`
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.xl}px;
    margin-top: ${(props: ThemeProps) => props.theme.spacing.md}px;
    align-items: center;
    background-color: transparent;
`;

const Title = styled(Text)`
    color: ${(props: ThemeProps) => props.theme.colors.text};
    font-size: 36px;
    font-weight: 800;
    margin-bottom: ${(props: ThemeProps) => props.theme.spacing.sm}px;
    letter-spacing: 0.2px;
`;

const Subtitle = styled(Text)`
    color: ${(props: ThemeProps) => props.theme.colors.textSecondary};
    font-size: ${(props: ThemeProps) => props.theme.typography.body.fontSize}px;
    line-height: ${(props: ThemeProps) =>
        props.theme.typography.body.lineHeight}px;
`;

// TitleBadge removed for a cleaner aesthetic

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { t } = useTranslation();
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(20)).current;
    // pulseAnim removed for a cleaner title effect
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 350,
                delay: 120,
                useNativeDriver: true,
            }),
            Animated.spring(titleTranslateY, {
                toValue: 0,
                delay: 120,
                useNativeDriver: true,
            }),
            Animated.timing(subtitleOpacity, {
                toValue: 1,
                duration: 300,
                delay: 220,
                useNativeDriver: true,
            }),
            Animated.spring(subtitleTranslateY, {
                toValue: 0,
                delay: 220,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Container>
            <ScrollContainer>
                <Content>
                    <Header>
                        <Animated.View
                            style={{
                                opacity: titleOpacity,
                                transform: [{ translateY: titleTranslateY }],
                                alignItems: 'center',
                            }}
                        >
                            <Animated.View style={{ alignItems: 'center' }}>
                                <Logo width={300} height={80} />
                            </Animated.View>
                            <Subtitle
                                style={{ marginTop: 6, textAlign: 'center' }}
                            >
                                {t('home.subtitle')}
                            </Subtitle>
                        </Animated.View>
                    </Header>

                    <MenuCard
                        icon="book-outline"
                        title={t('home.training')}
                        description={t('home.trainingDescription')}
                        onPress={() => navigation.navigate('Training')}
                        delay={300}
                        iconColor={theme.colors.primaryLight}
                    />

                    <MenuCard
                        icon="stats-chart-outline"
                        title={t('home.statistics')}
                        description={t('home.statisticsDescription')}
                        onPress={() => navigation.navigate('Statistics')}
                        delay={400}
                        iconColor={theme.colors.secondary}
                    />

                    <MenuCard
                        icon="information-circle-outline"
                        title={t('home.info')}
                        description={t('home.infoDescription')}
                        onPress={() => navigation.navigate('Info')}
                        delay={450}
                        iconColor={theme.colors.primaryDark}
                    />

                    <MenuCard
                        icon="settings-outline"
                        title={t('home.settings')}
                        description={t('home.settingsDescription')}
                        onPress={() => navigation.navigate('Settings')}
                        delay={500}
                        iconColor={theme.colors.accent}
                    />
                </Content>
            </ScrollContainer>

            <Footer>
                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL('https://github.com/MPoulhazan')
                    }
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Ionicons
                        name="logo-github"
                        size={20}
                        color={theme.colors.textSecondary}
                    />
                    <Text
                        style={{
                            color: theme.colors.textSecondary,
                            marginLeft: theme.spacing.sm,
                        }}
                    >
                        © {new Date().getFullYear()} MPoulhazan
                    </Text>
                </TouchableOpacity>
            </Footer>
        </Container>
    );
};

export default HomeScreen;
