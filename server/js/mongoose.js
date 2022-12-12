const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://alvindimas05:adp050107@darkcak.lko8bij.mongodb.net/darkcak");

const userSchema = mongoose.Schema({
    user_id:String,
    username:String,
    password:String,
    image:{
        data:Buffer,
        contentType:String
    },
    description:String,
    time:Number,
    rill:Array,
    fek:Array
}, { minimize:false }),

postSchema = mongoose.Schema({
    post_id:Number,
    user_id:String,
    username:String,
    title:String,
    image:{
        data:Buffer,
        contentType:String
    },
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