# CanExam - Application d'entraînement pour l'examen de citoyenneté canadienne

Application mobile hybride pour iOS et Android permettant de s'entraîner aux examens de citoyenneté canadienne.

## 🚀 Fonctionnalités

-   ✅ Menu d'entraînement avec questions
-   ✅ Support multilingue (Français/Anglais)
-   ✅ Thème dark mode moderne
-   ✅ Animations fluides et attrayantes
-   ✅ Questions stockées localement (JSON)
-   ✅ Système de score et explications

## 📦 Installation

1. Installer les dépendances:

```bash
npm install
```

2. Démarrer l'application:

```bash
npm start
```

3. Scanner le QR code avec Expo Go sur votre téléphone, ou:
    - Appuyer sur `i` pour iOS (nécessite Xcode)
    - Appuyer sur `a` pour Android (nécessite Android Studio)

## 🛠️ Technologies

-   **React Native** avec **Expo**
-   **TypeScript** pour le typage statique
-   **React Navigation** pour la navigation
-   **react-i18next** pour l'internationalisation
-   **styled-components** pour le styling
-   **react-native-reanimated** pour les animations
-   **JSON local** pour les questions

## 📝 Structure des questions

Les questions sont stockées dans `src/data/questions.json` avec le format suivant:

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

## 🎨 Personnalisation

Le thème peut être modifié dans `src/theme.ts`. Les couleurs, espacements, et typographies sont centralisés.

## 📱 Build pour production

Pour créer une build de production:

```bash
expo build:android
expo build:ios
```

## 📄 Licence

MIT
