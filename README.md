# CanExam - Canadian Citizenship Exam Practice App

CanExam est une application mobile hybride pour iOS et Android permettant aux utilisateurs de s'entraîner pour l'examen de citoyenneté canadienne.

## 🚀 Fonctionnalités

-   ✅ Menu de quiz avec des questions
-   ✅ Support multilingue (Français / Anglais)
-   ✅ Thème moderne avec mode sombre
-   ✅ Animations fluides et attractives
-   ✅ Questions stockées localement (JSON)
-   ✅ Système de score avec explications

## 📦 Installation

1. Installez les dépendances :

```bash
npm install
```

2. Démarrez l'application :

```bash
npm start
```

3. Scannez le QR code avec Expo Go sur votre téléphone, ou :

-   Appuyez sur `i` pour ouvrir dans le simulateur iOS (nécessite Xcode)
-   Appuyez sur `a` pour ouvrir dans l'émulateur Android (nécessite Android Studio)

## 🛠️ Technologies

-   **React Native** avec **Expo**
-   **TypeScript** pour le typage statique
-   **React Navigation** pour la navigation
-   **react-i18next** pour l'internationalisation
-   **styled-components** pour le style
-   **react-native-reanimated** pour les animations
-   **JSON local** pour le stockage des questions

## 📝 Structure des questions

Les questions sont stockées dans `src/data/questions.json` selon le format suivant :

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

Le thème peut être ajusté dans `src/theme.ts`. Les couleurs, espacements et typographies y sont centralisés.

## 📱 Version de production

Pour créer une version de production :

```bash
expo build:android
expo build:ios
```

## 📄 Licence

MIT