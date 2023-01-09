const app = require("./js/app"),
WebSocket = require("ws"),
wss = new WebSocket.Server({ port:69 });

wss.on("connection", ws => {
    ws.on("message", (msg) => {
        if(msg === "ping") ws.send("pong");
    })
})

const user = require("./js/user/user"),
profile = require("./js/user/profile"),
logout = require("./js/user/logout"),
blacklist = require("./js/user/blacklist"),

nsfw = require("./js/user/nsfw gore").nsfw,
gore = require("./js/user/nsfw gore").gore,
cooldown = require("./js/user/cooldown"),
warn = require("./js/user/warn"),

post = require("./js/posts/post"),
id = require("./js/posts/id"),
file = require("./js/posts/file"),

rill = require("./js/posts/rill"),
fek = require("./js/posts/fek"),

comment = require("./js/posts/comment"),
reply = require("./js/posts/reply"),

puser = require("./js/posts/user"),
category = require("./js/posts/category"),

alogin = require("./js/admin/admin/login"),
gauser = require("./js/admin/admin/get"),
pauser = require("./js/admin/admin/add"),
dauser = require("./js/admin/admin/delete");

app.post("/api/user/create", user.create);
app.post("/api/user/login", user.login);
app.get("/api/user/verify", require("./js/user/verif"));
app.get("/api/user/logout", logout);
app.post("/api/user/blacklist", blacklist);

app.get("/api/user/profile", profile.get);
app.post("/api/user/profile", profile.post);
app.get("/api/user/image", require("./js/user/image"));

app.post("/api/user/nsfw", nsfw);
app.post("/api/user/gore", gore);
app.get("/api/user/cooldown", cooldown);
app.get("/api/user/warn", warn);

app.get("/api/post", post.get);
app.post("/api/post/create", post.create);
app.get("/api/post/id", id);
app.get("/api/post/file", file);

app.post("/api/post/comment", comment);
app.post("/api/post/reply", reply);
app.get("/api/post/comimage", require("./js/posts/comimage"));

app.post("/api/post/rill", rill.post);
app.get("/api/post/rill", rill.get);

app.post("/api/post/fek", fek.post);
app.get("/api/post/fek", fek.get);

app.get("/api/post/user", puser);
app.get("/api/post/category", category);

app.post("/api/admin/report", (req, res) => require("./js/admin/report/post")(req, res, wss));
app.get("/api/admin/report", require("./js/admin/report/get"));

app.post("/api/admin/admin/login", alogin);
app.post("/api/admin/admin", gauser);
app.post("/api/admin/admin/add", pauser);
app.post("/api/admin/admin/delete", dauser);

app.post("/api/admin/user", require("./js/admin/user/get"));
app.post("/api/admin/user/warn", require("./js/admin/user/warn"));
app.post("/api/admin/user/ban", require("./js/admin/user/ban"));

app.post("/api/admin/post/category", require("./js/admin/post/category"));
app.post("/api/admin/post/delete", require("./js/admin/post/delete"));

//app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));