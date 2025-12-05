import 'react-native-gesture-handler';
import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './src/theme';

export const ThemeModeContext = createContext({
    mode: 'light',
    setMode: (m: 'light' | 'dark') => {},
});
import HomeScreen from './src/screens/HomeScreen';
import TrainingScreen from './src/screens/TrainingScreen';
import ResultScreen from './src/screens/ResultScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import InfoScreen from './src/screens/InfoScreen';
import { RootStackParamList } from './src/types';
import AppHeader from './src/components/AppHeader';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            const stored = await AsyncStorage.getItem('preferred_theme');
            if (stored === 'dark' || stored === 'light')
                setMode(stored as 'light' | 'dark');
            setLoaded(true);
        };
        load();
    }, []);

    const currentTheme = mode === 'dark' ? darkTheme : lightTheme;

    if (!loaded) return null; // simple splash while loading preference

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeModeContext.Provider value={{ mode, setMode }}>
                <ThemeProvider theme={currentTheme}>
                    <NavigationContainer>
                        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
                        <Stack.Navigator
                            screenOptions={({ route, navigation }) => ({
                                headerShown: true,
                                header: (headerProps) => (
                                    <AppHeader {...headerProps} />
                                ),
                                cardStyle: {
                                    backgroundColor:
                                        currentTheme.colors.background,
                                },
                            })}
                        >
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{ headerTitle: '' }}
                            />
                            <Stack.Screen
                                name="Training"
                                component={TrainingScreen}
                            />
                            <Stack.Screen
                                name="Result"
                                component={ResultScreen}
                            />
                            <Stack.Screen
                                name="Statistics"
                                component={StatisticsScreen}
                            />
                            <Stack.Screen
                                name="Settings"
                                component={SettingsScreen}
                            />
                            <Stack.Screen name="Info" component={InfoScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ThemeProvider>
            </ThemeModeContext.Provider>
        </I18nextProvider>
    );
}
