const app = require("./js/app");

require("./api");

var dir = __dirname + "/public";

app.get("/", (req, res) => res.sendFile(dir + "/html/index.html"));
app.get("/upload", (req, res) => res.sendFile(dir + "/html/upload.html"));
app.get("/u", (req, res) => res.sendFile(dir + "/html/user.html"));
app.get("/login", (req, res) => res.sendFile(dir + "/html/login.html"));
app.get("/register", (req, res) => res.sendFile(dir + "/html/register.html"));
app.get("/profile", (req, res) => res.sendFile(dir + "/html/profile.html"));

app.listen(8080, "0.0.0.0", () => console.log("Listening on 8080"));