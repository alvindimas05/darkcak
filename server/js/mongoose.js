const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/darkcak");

const userSchema = mongoose.Schema({
    user_id:String,
    username:String,
    password:String,
    image:{
        data:Buffer,
        contentType:String
    },
    nsfw:Boolean,
    gore:Boolean,
    cooldown:Boolean,
    comldown:Boolean,
    description:String,
    blacklist:Array,
    time:Number,
    rill:Array,
    fek:Array
}, { minimize:false }),

postSchema = mongoose.Schema({
    post_id:Number,
    user_id:String,
    username:String,
    title:String,
    file:{
        data:Buffer,
        contentType:String
    },
    category:Array,
    isImage:Boolean,
    time:Number,
    rill:Number,
    fek:Number,
    comments:[{
        comment_id:Number,
        username:String,
        comment:String,
        time:Number,
        reply:[{
            username:String,
            comment:String,
            time:Number,
        }]
    }]
}, { minimize:false }),

User = mongoose.model("users", userSchema),
Post = mongoose.model("posts", postSchema);

module.exports = {
    User:User,
    Post:Post
};