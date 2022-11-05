require("dotenv").config();
const app = require("./app");
const db = require("pg");

const PORT = parseInt(process.env.PORT ?? "5001", 10);

async function runServer() {
    try {
        return app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(`Server returned an error ${e}`)
    }
}
runServer();