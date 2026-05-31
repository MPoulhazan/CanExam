import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface LogoProps {
    width?: number;
    height?: number;
    title?: string;
}

const DEFAULT_TITLE = 'Can-Exam';

const buildSvg = (title: string) => {
    const [prefixPart, suffixPart] = title.split('-', 2);
    const prefix = suffixPart ? `${prefixPart}-` : title;
    const suffix = suffixPart ?? '';

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 180" width="580" height="180">
    <defs>
        <!-- Gradient principal rouge canadien -->
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#D42B2B;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#E84040;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D42B2B;stop-opacity:1" />
        </linearGradient>

        <!-- Gradient pour le glow -->
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#D42B2B;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#E84040;stop-opacity:0.6" />
        </linearGradient>
        
        <!-- Filtre glow effect -->
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        
        <!-- Shadow subtile -->
        <filter id="subtleShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
        </filter>
    </defs>

    <!-- Background glow circle -->
    <circle cx="290" cy="90" r="100" fill="url(#glowGradient)" opacity="0.15" filter="url(#glow)"/>
    
    <!-- Texte principal avec gradient -->
    <text x="50%" y="95" text-anchor="middle"
          font-family="Comfortaa, 'Segoe UI', Roboto, Arial, sans-serif"
          font-weight="800"
          font-size="78"
          fill="url(#mainGradient)"
          filter="url(#subtleShadow)"
          letter-spacing="2">
        ${prefix}${suffix ? `<tspan font-style="italic" font-weight="900">${suffix}</tspan>` : ''}
    </text>
    
    <!-- Ligne décorative sous le texte avec points -->
    <line x1="180" y1="120" x2="230" y2="120" stroke="url(#mainGradient)" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    <circle cx="240" cy="120" r="3" fill="#E84040" opacity="0.8"/>
    <circle cx="250" cy="120" r="2" fill="#D42B2B" opacity="0.6"/>
    <line x1="255" y1="120" x2="400" y2="120" stroke="url(#mainGradient)" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    
    <!-- Petit accent géométrique -->
    <path d="M 170 85 L 175 90 L 170 95 Z" fill="#D42B2B" opacity="0.4"/>
    <path d="M 410 85 L 405 90 L 410 95 Z" fill="#D42B2B" opacity="0.4"/>
</svg>`;
};

const Logo: React.FC<LogoProps> = ({
    width = 260,
    height = 70,
    title = DEFAULT_TITLE,
}) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SvgXml
                xml={buildSvg(title)}
                width={width}
                height={height}
                style={{ alignSelf: 'center' }}
            />
        </View>
    );
};

export default Logo;