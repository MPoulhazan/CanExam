module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // Reanimated désactivé car non compatible avec Expo Go
            // 'react-native-reanimated/plugin',
        ],
    };
};
