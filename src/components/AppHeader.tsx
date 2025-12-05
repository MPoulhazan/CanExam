import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { DefaultTheme } from 'styled-components';

type ThemeProps = { theme: DefaultTheme };

const HeaderContainer = styled.View`
    height: 64px;
    padding: 0 16px;
    background-color: ${(p: ThemeProps) => p.theme.colors.surface};
    border-bottom-width: 1px;
    border-bottom-color: ${(p: ThemeProps) => p.theme.colors.border};
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
` as any;

const Title = styled.Text`
    color: ${(p: ThemeProps) => p.theme.colors.text};
    font-size: 18px;
    font-weight: 700;
` as any;

const Spacer = styled.View`
    width: 44px;
` as any;

// Use a loose typing for header props to avoid tight dependency on react-navigation types here
export default function AppHeader(headerProps: any) {
    // headerProps contains { layout, back, options, route, navigation, ... }
    const scene = headerProps.scene ?? headerProps;
    const previous = headerProps.back ?? headerProps.previous ?? null;
    const navigation =
        headerProps.navigation ??
        (headerProps.scene &&
            headerProps.scene.descriptor &&
            headerProps.scene.descriptor.navigation) ??
        null;

    const title =
        (scene &&
            scene.descriptor &&
            scene.descriptor.options &&
            scene.descriptor.options.headerTitle) ??
        (scene && scene.route && scene.route.name) ??
        '';

    return (
        <HeaderContainer>
            {previous ? (
                <TouchableOpacity
                    onPress={() =>
                        navigation && navigation.goBack && navigation.goBack()
                    }
                    style={{ width: 44, alignItems: 'flex-start' }}
                >
                    <Ionicons
                        name="chevron-back"
                        size={28}
                        color={theme.colors.text}
                    />
                </TouchableOpacity>
            ) : (
                <Spacer />
            )}

            <Title>{title}</Title>

            <Spacer />
        </HeaderContainer>
    );
}
