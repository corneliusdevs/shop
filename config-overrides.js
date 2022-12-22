const webpack = require("webpack")
module.exports = function override(config){
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require("os-browserify"),
        "url": require.resolve("url"),
        "fs": false,
        "tls": false,
        "net": false,
        "path": require.resolve("path-browserify"),
        "util": require.resolve("util"),
        "events": require.resolve("events"),
        "zlib": false,
        "crypto": false
    })

    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"]
        })
    ])
    
    return config
}