import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScoreChart from '../components/ScoreChart';
import { theme } from '../theme';
import { DefaultTheme } from 'styled-components';

type ThemeProps = { theme: DefaultTheme };

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

const Item = styled.View`
    padding: ${(p: ThemeProps) => p.theme.spacing.md}px;
    background-color: ${(p: ThemeProps) => p.theme.colors.surface};
    margin-vertical: ${(p: ThemeProps) => p.theme.spacing.sm}px;
    border-radius: ${(p: ThemeProps) => p.theme.borderRadius.md}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.View`
    flex-direction: column;
    flex: 1;
`;

const ScoreBadge = styled.View<{ passed: boolean }>`
    min-width: 64px;
    padding: 8px 12px;
    border-radius: 999px;
    align-items: center;
    justify-content: center;
    background-color: ${(p: { passed: boolean } & ThemeProps) =>
        p.passed ? '#2ecc71' : '#e74c3c'};
`;

const ScoreText = styled.Text`
    color: #fff;
    font-weight: 800;
    font-size: 16px;
`;

const DateText = styled.Text`
    color: ${(p: ThemeProps) => p.theme.colors.textSecondary};
    font-size: 13px;
    margin-top: 6px;
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
    const MAX_POINTS = 20;
    const recentScores = scores.slice(Math.max(0, scores.length - MAX_POINTS));

    return (
        <Container>
            <Title>Historique des examens</Title>
            <View
                style={{ alignItems: 'center', marginBottom: theme.spacing.md }}
            >
                <ScoreChart
                    scores={recentScores}
                    width={320}
                    height={100}
                    threshold={15}
                />
                <Text
                    style={{ color: theme.colors.textSecondary, marginTop: 6 }}
                >
                    Showing {recentScores.length} of {scores.length} exams
                </Text>
            </View>

            <FlatList
                data={history}
                keyExtractor={(i, idx) => `${idx}`}
                renderItem={({ item }) => {
                    const score20 = Math.round((item.score / item.total) * 20);
                    const passed = score20 >= 15;
                    const d = new Date(item.date);
                    const formatted = new Intl.DateTimeFormat(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }).format(d);

                    return (
                        <Item>
                            <Left>
                                <DateText>{formatted}</DateText>
                            </Left>

                            <ScoreBadge passed={passed}>
                                <ScoreText>{score20}/20</ScoreText>
                            </ScoreBadge>
                        </Item>
                    );
                }}
            />
        </Container>
    );
};

export default StatisticsScreen;
