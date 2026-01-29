import React, { ReactNode, useRef } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../theme';
import { DefaultTheme } from 'styled-components';

type ThemeProps = { theme: DefaultTheme };

const StyledButton = styled(TouchableOpacity)<{
    variant?: 'primary' | 'secondary' | 'default';
    outline?: boolean;
}>`
    background: ${(
        props: ThemeProps & { variant?: string; outline?: boolean }
    ) =>
        props.outline
            ? 'rgba(255, 255, 255, 0.05)'
            : props.variant === 'secondary'
            ? 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)'
            : 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)'};
    padding: ${(props: ThemeProps) =>
        `${props.theme.spacing.md}px ${props.theme.spacing.xl}px`};
    border-radius: ${(props: ThemeProps) => props.theme.borderRadius.xl}px;
    align-items: center;
    justify-content: center;
    border: ${(props: ThemeProps & { outline?: boolean }) =>
        props.outline
            ? `1px solid rgba(255, 255, 255, 0.2)`
            : '1px solid rgba(255, 255, 255, 0.1)'};
    max-width: 400px;
    align-self: center;
    width: 100%;
    shadow-color: ${(props: ThemeProps & { variant?: string }) =>
        props.variant === 'secondary' ? '#06B6D4' : '#7C3AED'};
    shadow-offset: 0px 8px;
    shadow-opacity: 0.4;
    shadow-radius: 16px;
    elevation: 8;
`;

const ButtonText = styled(Text)`
    color: ${(props: ThemeProps) => props.theme.colors.text};
    font-size: ${(props: ThemeProps) => props.theme.typography.body.fontSize}px;
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
                opacity: disabled ? 0.6 : opacityAnim,
            }}
        >
            <StyledButton
                variant={variant}
                outline={outline}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                activeOpacity={0.9}
                style={{ ...theme.shadows.sm }}
                {...props}
            >
                <ButtonText
                    style={{
                        color:
                            variant === 'primary'
                                ? '#FFFFFF'
                                : theme.colors.text,
                    }}
                >
                    {children}
                </ButtonText>
            </StyledButton>
        </Animated.View>
    );
};

export default Button;
