const express = require("express"),
bodyParser = require("body-parser"),
fileUpload = require("express-fileupload"),
cookieParser = require("cookie-parser"),
cors = require("cors"),

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors({ credentials:true, origin:"http://localhost:3000" }));
app.use(cookieParser());
app.use(fileUpload({ limits:{ fileSize:5 * 1024 * 1024 } }));

app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));

app.response.err = function(msg){
    this.json({
        status:false, message:msg
    });
}

Object.defineProperty(Array.prototype, "check", {
    value:function(body){
        for(i of this){
            if(body[i] === undefined || typeof body[i] === "undefined"){
                return false;
            }
        }
        return true;
    },
    enumerable:false,
    writable:true,
    configurable:true
});

module.exports = app;