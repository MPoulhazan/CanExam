import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Button from '../components/Button';
import { RootStackParamList } from '../types';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'exam_history';

type ResultScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Result'
>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

interface Props {
    navigation: ResultScreenNavigationProp;
    route: ResultScreenRouteProp;
}

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(p: { theme: Theme }) => p.theme.colors.background};
    align-items: center;
    justify-content: center;
    padding: ${(p: { theme: Theme }) => p.theme.spacing.lg}px;
`;

const Title = styled.Text`
    color: ${(p: { theme: Theme }) => p.theme.colors.text};
    font-size: ${(p: { theme: Theme }) => p.theme.typography.h2.fontSize}px;
    font-weight: ${(p: { theme: Theme }) => p.theme.typography.h2.fontWeight};
    margin-bottom: ${(p: { theme: Theme }) => p.theme.spacing.md}px;
`;

const Subtitle = styled.Text`
    color: ${(p: { theme: Theme }) => p.theme.colors.textSecondary};
    text-align: center;
    margin-bottom: ${(p: { theme: Theme }) => p.theme.spacing.lg}px;
`;

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
    const { score = 0, total = 0, passed = false } = route.params || {};
    const scaleAnim = useRef(new Animated.Value(0.6)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();

        // Persist result to history
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(HISTORY_KEY);
                const list = raw ? JSON.parse(raw) : [];
                const entry = {
                    score,
                    total,
                    date: new Date().toLocaleString(),
                };
                list.unshift(entry);
                await AsyncStorage.setItem(
                    HISTORY_KEY,
                    JSON.stringify(list.slice(0, 100))
                );
            } catch (e) {
                // ignore
            }
        })();
    }, []);

    return (
        <Container>
            <Animated.View
                style={{ transform: [{ scale: scaleAnim }], opacity }}
            >
                <Title>{passed ? 'Félicitations !' : 'Résultat'}</Title>
                <Subtitle>
                    {passed
                        ? `Vous avez obtenu ${score}/${total} — bien joué !`
                        : `Vous avez obtenu ${score}/${total}. Essayez encore.`}
                </Subtitle>
                <View style={{ width: 260 }}>
                    <Button onPress={() => navigation.navigate('Training')}>
                        {passed ? 'Rejouer' : 'Réessayer'}
                    </Button>
                    <View style={{ height: 12 }} />
                    <Button
                        variant="secondary"
                        onPress={() => navigation.navigate('Home')}
                    >
                        Retour au menu
                    </Button>
                </View>
            </Animated.View>
        </Container>
    );
};

export default ResultScreen;
