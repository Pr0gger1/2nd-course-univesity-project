const Dotenv = require('dotenv-webpack');

module.exports = {
    resolve: {
        fallback: {
            util: require.resolve("util/"),
            "assert": require.resolve("assert/")
        },
    },
    plugins: [
        new Dotenv()
    ]
}