import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const StyledCard = styled(TouchableOpacity)`
    background-color: ${(props) => props.theme.colors.surface};
    border-radius: ${(props) => props.theme.borderRadius.lg}px;
    padding: ${(props) => props.theme.spacing.xl}px;
    margin-vertical: ${(props) => props.theme.spacing.md}px;
    border: 1px solid ${(props) => props.theme.colors.border};
    flex-direction: row;
    align-items: center;
    overflow: hidden;
`;

const IconContainer = styled.View`
    width: 60px;
    height: 60px;
    border-radius: ${(props) => props.theme.borderRadius.md}px;
    background-color: ${(props) => props.theme.colors.primary};
    align-items: center;
    justify-content: center;
    margin-right: ${(props) => props.theme.spacing.md}px;
`;

const ContentContainer = styled.View`
    flex: 1;
`;

const Title = styled.Text`
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.typography.h3.fontSize}px;
    font-weight: ${(props) => props.theme.typography.h3.fontWeight};
    margin-bottom: ${(props) => props.theme.spacing.xs}px;
`;

const Description = styled.Text`
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: ${(props) => props.theme.typography.bodySmall.fontSize}px;
    line-height: ${(props) => props.theme.typography.bodySmall.lineHeight}px;
`;

const ArrowIcon = styled(Ionicons)`
    color: ${(props) => props.theme.colors.textMuted};
    margin-left: ${(props) => props.theme.spacing.sm}px;
`;

interface MenuCardProps {
    icon: keyof typeof Ionicons.glyphMap | string;
    title: string;
    description: string;
    onPress: () => void;
    delay?: number;
    iconColor?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({
    icon,
    title,
    description,
    onPress,
    delay = 0,
    iconColor,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(50)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(translateX, {
                toValue: 0,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [delay]);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }, { translateX }],
                opacity,
            }}
        >
            <StyledCard
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
                style={theme.shadows.lg}
            >
                <IconContainer>
                    <Ionicons
                        name={icon as any}
                        size={28}
                        color={iconColor || '#FFFFFF'}
                    />
                </IconContainer>
                <ContentContainer>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </ContentContainer>
                <ArrowIcon name="chevron-forward" size={24} />
            </StyledCard>
        </Animated.View>
    );
};

export default MenuCard;
