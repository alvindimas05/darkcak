const app = require("./js/app");

require("./api");

app.listen(8080, () => console.log("Listening on 8080"));

process.on("uncaughtException", err => console.log(err));
