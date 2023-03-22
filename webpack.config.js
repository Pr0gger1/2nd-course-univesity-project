const Dotenv = require('dotenv-webpack');

module.exports = {
    resolve: {
        fallback: {
            util: require.resolve("util/")
        }
    },
    plugins: [
        new Dotenv()
    ]
}