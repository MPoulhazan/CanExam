import React, { ReactNode, useRef } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../theme';

const StyledButton = styled(TouchableOpacity)<{
    variant?: 'primary' | 'secondary' | 'default';
    outline?: boolean;
}>`
    background-color: ${(props) =>
        props.variant === 'primary'
            ? props.theme.colors.primary
            : props.variant === 'secondary'
            ? props.theme.colors.secondary
            : props.theme.colors.surfaceLight};
    padding: ${(props) =>
        `${props.theme.spacing.md}px ${props.theme.spacing.lg}px`};
    border-radius: ${(props) => props.theme.borderRadius.md}px;
    align-items: center;
    justify-content: center;
    border: ${(props) =>
        props.outline ? `2px solid ${props.theme.colors.primary}` : 'none'};
    background-color: ${(props) =>
        props.outline ? 'transparent' : props.theme.colors.primary};
`;

const ButtonText = styled(Text)`
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.typography.body.fontSize}px;
    font-weight: 600;
    letter-spacing: 0.5px;
`;

interface ButtonProps {
    children: ReactNode;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'default';
    outline?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    variant = 'primary',
    outline = false,
    disabled = false,
    ...props
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.95,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
                opacity: disabled ? 0.5 : opacityAnim,
            }}
        >
            <StyledButton
                variant={variant}
                outline={outline}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                activeOpacity={0.8}
                style={theme.shadows.md}
                {...props}
            >
                <ButtonText>{children}</ButtonText>
            </StyledButton>
        </Animated.View>
    );
};

export default Button;
