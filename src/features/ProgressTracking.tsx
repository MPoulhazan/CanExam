import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressTracking = () => {
    const [scores, setScores] = useState<number[]>([]);

    useEffect(() => {
        const fetchScores = async () => {
            const savedScores = await AsyncStorage.getItem('quizScores');
            if (savedScores) setScores(JSON.parse(savedScores));
        };
        fetchScores();
    }, []);

    const saveScore = async (score: number) => {
        const newScores = [...scores, score];
        setScores(newScores);
        await AsyncStorage.setItem('quizScores', JSON.stringify(newScores));
    };

    const chartData = {
        labels: scores.map((_, index) => `Quiz ${index + 1}`),
        datasets: [{ data: scores }],
    };

    return (
        <View>
            <Text>Progress Tracking</Text>
            <FlatList
                data={scores}
                renderItem={({ item }) => <Text>Score: {item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
            <LineChart
                data={chartData}
                width={340}
                height={220}
                chartConfig={{
                    backgroundColor: '#1B1C2B',
                    backgroundGradientFrom: '#1B1C2B',
                    backgroundGradientTo: '#1B1C2B',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "rgba(255, 255, 255, .9)",
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default ProgressTracking;