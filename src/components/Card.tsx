import React, { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { View, Animated, ViewProps } from 'react-native';
import { theme } from '../theme';

const StyledCard = styled(View)`
    background-color: ${(props) => props.theme.colors.surface};
    border-radius: ${(props) => props.theme.borderRadius.lg}px;
    padding: ${(props) => props.theme.spacing.lg}px;
    margin-vertical: ${(props) => props.theme.spacing.sm}px;
    border: 1px solid ${(props) => props.theme.colors.border};
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
            <StyledCard style={theme.shadows.md} {...props}>
                {children}
            </StyledCard>
        </Animated.View>
    );
};

export default Card;
