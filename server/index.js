const fs = require("fs"),
http = require("http"),
//https = require("https"),

app = require("./js/app"),
port = 8080,
sport = 443;

require("./api");
//certdir = "/etc/letsencrypt/live/darkcak.xyz";

// var certopt = {
//     key:fs.readFileSync(certdir + "/privkey.pem", "utf-8"),
//     cert:fs.readFileSync(certdir + "/cert.pem", "utf-8"),
//     ca:fs.readFileSync(certdir + "/chain.pem", "utf-8")
// };

http.createServer(app).listen(port);
// https.createServer(certopt, app).listen(sport);

process.on("uncaughtException", err => console.log(err));
console.log(`Listening on ${port} & ${sport}`);