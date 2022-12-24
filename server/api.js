const app = require("./js/app"),

user = require("./js/user/user"),
profile = require("./js/user/profile"),
logout = require("./js/user/logout"),
blacklist = require("./js/user/blacklist"),

nsfw = require("./js/user/nsfw gore").nsfw,
gore = require("./js/user/nsfw gore").gore,
cooldown = require("./js/user/cooldown"),

post = require("./js/posts/post"),
id = require("./js/posts/id"),
file = require("./js/posts/file"),

rill = require("./js/posts/rill"),
fek = require("./js/posts/fek"),

comment = require("./js/posts/comment"),
reply = require("./js/posts/reply"),

puser = require("./js/posts/user"),
category = require("./js/posts/category");

app.post("/api/user/create", user.create);
app.post("/api/user/login", user.login);
app.get("/api/user/logout", logout);
app.post("/api/user/blacklist", blacklist);

app.get("/api/user/profile", profile.get);
app.post("/api/user/profile", profile.post);

app.post("/api/user/nsfw", nsfw);
app.post("/api/user/gore", gore);
app.get("/api/user/cooldown", cooldown);

app.get("/api/post", post.get);
app.post("/api/post/create", post.create);
app.get("/api/post/id", id);
app.get("/api/post/file", file);

app.post("/api/post/comment", comment);
app.post("/api/post/reply", reply);

app.post("/api/post/rill", rill.post);
app.get("/api/post/rill", rill.get);

app.post("/api/post/fek", fek.post);
app.get("/api/post/fek", fek.get);

app.get("/api/post/user", puser);
app.get("/api/post/category", category);

//app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));