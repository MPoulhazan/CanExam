import React from 'react';
import Svg, { Polyline, Line, Text as SvgText } from 'react-native-svg';
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
    // invert x-axis so newest/last points appear at the right side
    const points = scores
        .map((s, i) => `${width - i * stepX},${height - (s / max) * height}`)
        .join(' ');

    const threshY = height - (threshold / max) * height;

    return (
        <Svg width={width} height={height}>
            {/* top = score 20, bottom = score 0 */}
            <Line
                x1={0}
                y1={0}
                x2={width}
                y2={0}
                stroke="#94a3b8"
                strokeWidth={0.8}
            />
            <Line
                x1={0}
                y1={height}
                x2={width}
                y2={height}
                stroke="#94a3b8"
                strokeWidth={0.8}
            />
            {/* labels for axis limits */}
            <SvgText x={4} y={12} fill="#94a3b8" fontSize={10}>
                20
            </SvgText>
            <SvgText x={4} y={height - 4} fill="#94a3b8" fontSize={10}>
                0
            </SvgText>
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
