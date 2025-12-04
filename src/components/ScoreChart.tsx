import React from 'react';
import Svg, { Polyline, Line } from 'react-native-svg';
import { View } from 'react-native';

interface Props {
    scores: number[]; // values 0..20
    width?: number;
    height?: number;
    threshold?: number;
}

const ScoreChart: React.FC<Props> = ({
    scores,
    width = 300,
    height = 80,
    threshold = 15,
}) => {
    if (!scores || scores.length === 0) return <View />;

    const max = 20;
    const stepX = width / Math.max(1, scores.length - 1);
    const points = scores
        .map((s, i) => `${i * stepX},${height - (s / max) * height}`)
        .join(' ');

    const threshY = height - (threshold / max) * height;

    return (
        <Svg width={width} height={height}>
            <Line
                x1={0}
                y1={threshY}
                x2={width}
                y2={threshY}
                stroke="#ef4444"
                strokeDasharray={[4, 4]}
                strokeWidth={1}
            />
            <Polyline
                points={points}
                fill="none"
                stroke="#60a5fa"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default ScoreChart;
