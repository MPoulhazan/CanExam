import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" width="520" height="150">
    <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#FF4D4D"/>
            <stop offset="0.5" stop-color="#E12222"/>
            <stop offset="1" stop-color="#B80000"/>
        </linearGradient>

        <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="7" stdDeviation="10" flood-color="#000" flood-opacity="0.22"/>
        </filter>
    </defs>

    <text x="50%" y="85" text-anchor="middle"
                font-family="Inter, 'Segoe UI', Roboto, Arial, sans-serif"
                font-weight="800"
                font-size="72"
                fill="url(#g1)"
                filter="url(#shadow)"
                letter-spacing="0.5">
        CanExam
    </text>

    <rect x="50%" y="98" width="150" height="10" rx="5" fill="url(#g1)" opacity="0.95" transform="translate(-75,0)"/>
</svg>`;

const Logo: React.FC<{ width?: number; height?: number }> = ({
    width = 260,
    height = 70,
}) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SvgXml
                xml={svg}
                width={width}
                height={height}
                style={{ alignSelf: 'center' }}
            />
        </View>
    );
};

export default Logo;
