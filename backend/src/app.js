const express = require("express");

function buildApp() {
    const app = express();
    app.use(express.json());

    app.use("/api/test", (req, res) => {
        console.log("Запрос к роуту тест");
        return res.send("Тестовый запрос к серверу");
    });
    return app;
}
module.exports = buildApp();