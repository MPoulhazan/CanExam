import React from 'react';
import dynamic from 'next/dynamic';

// Try to import main RN App if it's web-compatible
let RootApp: any = null;
try {
    // Import the main App component from the project (adjust if needed)
    RootApp = require('../../App').default;
} catch (e) {
    // Fallback simple page
    RootApp = null;
}

export default function Home() {
    if (RootApp) {
        const App = RootApp;
        return <App />;
    }
    return (
        <div style={{ padding: 24 }}>
            <h1>CanExam (web)</h1>
            <p>
                If the React Native App is web-compatible, it will render here.
            </p>
        </div>
    );
}
