import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScoreChart from '../components/ScoreChart';
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

const Item = styled.View`
    padding: ${(p) => p.theme.spacing.md}px;
    background-color: ${(p) => p.theme.colors.surface};
    margin-vertical: ${(p) => p.theme.spacing.sm}px;
    border-radius: ${(p) => p.theme.borderRadius.md}px;
`;

interface HistoryItem {
    score: number;
    total: number;
    date: string;
}

const STORAGE_KEY = 'exam_history';

const StatisticsScreen: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) setHistory(JSON.parse(raw));
            } catch (e) {
                // ignore
            }
        };
        load();
    }, []);

    const scores = history.map((h) => Math.round((h.score / h.total) * 20));

    return (
        <Container>
            <Title>Historique des examens</Title>
            <View
                style={{ alignItems: 'center', marginBottom: theme.spacing.md }}
            >
                <ScoreChart
                    scores={scores}
                    width={320}
                    height={100}
                    threshold={15}
                />
            </View>

            <FlatList
                data={history}
                keyExtractor={(i, idx) => `${idx}`}
                renderItem={({ item }) => (
                    <Item>
                        <Text
                            style={{ color: theme.colors.text }}
                        >{`${item.score}/${item.total} — ${item.date}`}</Text>
                    </Item>
                )}
            />
        </Container>
    );
};

export default StatisticsScreen;
