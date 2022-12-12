const app = require("./js/app"),

user = require("./js/user/user"),
profile = require("./js/user/profile"),
logout = require("./js/user/logout"),

post = require("./js/posts/post"),
rill = require("./js/posts/rill")
fek = require("./js/posts/fek"),

comment = require("./js/posts/comment"),
reply = require("./js/posts/reply"),

puser = require("./js/posts/user");

app.post("/api/user/create", user.create);
app.post("/api/user/login", user.login);
app.get("/logout", logout);

app.get("/api/user/profile", profile.get);
app.post("/api/user/profile", profile.post);

app.get("/api/post", post.get);
app.post("/api/post/create", post.create);

app.post("/api/post/comment", comment);
app.post("/api/post/reply", reply);

app.post("/api/post/rill", rill.post);
app.get("/api/post/rill", rill.get);

app.post("/api/post/fek", fek.post);
app.get("/api/post/fek", fek.get);

app.get("/api/post/user", puser);

app.get("/s/:id", (req, res) => res.redirect("/?search=" + req.params.id));
app.get("/p/:id", (req, res) => res.redirect("/?page=" + req.params.id));
app.get("/p/:pid/s/:sid", (req, res) => res.redirect(`/?page=${req.params.pid}&search=${req.params.sid}`))
app.get("/s/:sid/p/:pid", (req, res) => res.redirect(`/?page=${req.params.pid}&search=${req.params.sid}`))

app.get("/u/:id", (req, res) => res.redirect("/u/?username=" + req.params.id));