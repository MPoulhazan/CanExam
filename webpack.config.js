const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(
        {
            ...env,
            mode: 'development',
        },
        argv
    );

    // Disable minification to avoid Terser errors with Flow and script files
    config.optimization.minimize = false;

    return config;
};
