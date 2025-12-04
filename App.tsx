import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import TrainingScreen from './src/screens/TrainingScreen';
import ResultScreen from './src/screens/ResultScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <StatusBar style="light" />
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            cardStyle: {
                                backgroundColor: theme.colors.background,
                            },
                        }}
                    >
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen
                            name="Training"
                            component={TrainingScreen}
                        />
                        <Stack.Screen name="Result" component={ResultScreen} />
                        <Stack.Screen
                            name="Statistics"
                            component={StatisticsScreen}
                        />
                        <Stack.Screen
                            name="Settings"
                            component={SettingsScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </I18nextProvider>
    );
}
