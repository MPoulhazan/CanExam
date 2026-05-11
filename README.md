# CanExam - Canadian Citizenship Exam Practice App

A hybrid mobile application for iOS and Android that helps users practice for the Canadian citizenship exam.

## 🚀 Features

-   ✅ Quiz training menu with questions
-   ✅ Multilingual support (French / English)
-   ✅ Modern theme with dark mode
-   ✅ Smooth, attractive animations
-   ✅ Questions stored locally (JSON)
-   ✅ Scoring system with explanations

## 📦 Installation

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Scan the QR code with Expo Go on your phone, or:

-   Press `i` to open in iOS simulator (requires Xcode)
-   Press `a` to open in Android emulator (requires Android Studio)

## 🛠️ Technologies

-   **React Native** with **Expo**
-   **TypeScript** for static typing
-   **React Navigation** for navigation
-   **react-i18next** for internationalization
-   **styled-components** for styling
-   **react-native-reanimated** for animations
-   **Local JSON** for question storage

## 📝 Question structure

Questions are stored in `src/data/questions.json` with the following format:

```json
{
    "id": 1,
    "question": {
        "fr": "Question en français",
        "en": "Question in English"
    },
    "options": {
        "fr": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "en": ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    "correctAnswer": 0,
    "explanation": {
        "fr": "Explication en français",
        "en": "Explanation in English"
    }
}
```

## 🎨 Customization

The theme can be adjusted in `src/theme.ts`. Colors, spacing and typography are centralized there.

## 🪧 Header-only branding change

The home screen header now reads `Can-Exam` instead of `CanExam`.

This rename is intentionally limited to the visible application header:

-   the home header now passes `home.title` into `src/components/Logo.tsx`
-   `home.title` is set to `Can-Exam` in both locale files
-   unrelated branding, package names, route names, manifest metadata, and internal identifiers remain unchanged on purpose

## ✅ Verification

1. Start the app with `npm start` and open the home screen.
2. Confirm the visible header title renders as `Can-Exam`.
3. Navigate through the rest of the app and confirm other names and technical identifiers still use their existing values.
4. Run `npm run build:web` to verify the web build still succeeds.

## 🏗️ Architecture presentation

A ready-to-use architecture presentation is available at `docs/architecture-canexam.html`.

## 📱 Production build

To create a production build:

```bash
expo build:android
expo build:ios
```

## 📄 License

MIT