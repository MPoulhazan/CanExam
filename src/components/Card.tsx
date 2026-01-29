import React, { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { View, Animated, ViewProps } from 'react-native';
import { theme } from '../theme';
import { DefaultTheme } from 'styled-components';

type ThemeProps = { theme: DefaultTheme };

const StyledCard = styled(View)`
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border-radius: ${(props: ThemeProps) => props.theme.borderRadius.xl}px;
    padding: ${(props: ThemeProps) => props.theme.spacing.lg}px;
    margin-vertical: ${(props: ThemeProps) => props.theme.spacing.sm}px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    max-width: 600px;
    align-self: center;
    width: 100%;
    shadow-color: rgba(124, 58, 237, 0.3);
    shadow-offset: 0px 8px;
    shadow-opacity: 0.3;
    shadow-radius: 16px;
    elevation: 8;
`;

interface CardProps extends ViewProps {
    children: ReactNode;
    delay?: number;
}

const Card: React.FC<CardProps> = ({ children, delay = 0, ...props }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY }],
            }}
        >
            <StyledCard style={theme.shadows.sm} {...props}>
                {children}
            </StyledCard>
        </Animated.View>
    );
};

export default Card;
