const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    // Disable minification to avoid Terser errors with Flow and script files
    if (!config.optimization) {
        config.optimization = {};
    }
    config.optimization.minimize = false;

    return config;
};
