const withTM = require('next-transpile-modules')(['react-native']);

module.exports = withTM({
    reactStrictMode: true,
    turbopack: {},
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            'react-native$': 'react-native-web',
        };
        return config;
    },
});
