import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { View } from 'react-native';

const Logo: React.FC<{ size?: number; color?: string }> = ({
    size = 48,
    color = '#6366F1',
}) => {
    const w = size;
    const h = Math.round(size * 0.6);
    return (
        <View
            style={{
                width: w,
                height: h,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Svg width={w} height={h} viewBox="0 0 100 60" fill="none">
                <G>
                    <Path
                        d="M10 45 C25 10, 75 10, 90 45 L75 45 C60 20, 40 20, 25 45 Z"
                        fill={color}
                        opacity={0.95}
                    />
                    <Path
                        d="M30 30 C40 20, 60 20, 70 30 C60 25, 40 25, 30 30 Z"
                        fill="#fff"
                        opacity={0.9}
                    />
                </G>
            </Svg>
        </View>
    );
};

export default Logo;
