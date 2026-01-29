import type { AppProps } from 'next/app';
import React from 'react';
import { AppRegistry } from 'react-native';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

// Register a default app name for react-native-web
AppRegistry.registerComponent('Main', () => MyApp);

export default MyApp;
