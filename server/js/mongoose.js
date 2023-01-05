const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://alvindimas:adp050107@ancritbat.my.id", { dbName:"darkcak" });

const userSchema = mongoose.Schema({
    user_id:String,
    username:String,
    password:String,
    email:String,
    time:Number,
    image:{
        data:{
            type:Buffer,
            default:null
        },
        contentType:{
            type:String,
            default:null
        }
    },
    nsfw:{
        type:Boolean,
        default:false
    },
    gore:{
        type:Boolean,
        default:false
    },
    cooldown:{
        type:Boolean,
        default:false
    },
    comldown:{
        type:Boolean,
        default:false
    },
    corldown:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        default:null
    },
    blacklist:{
        type:Array,
        default:[]
    },
    warn:{
        type:String,
        default:null
    },
    banned:{
        type:Boolean,
        default:false
    },
    rill:{
        type:Array,
        default:[]
    },
    fek:{
        type:Array,
        default:[]
    },
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
    rill:{
        type:Number,
        default:0
    },
    fek:{
        type:Number,
        default:0
    },
    deleted:{
        type:Boolean,
        default:false
    },
    comments:{
        type:Array,
        default:[]
    }
}, { minimize:false }),

verifSchema = mongoose.Schema({
    user_id:String,
    email:String,
    username:String,
    password:String
}),

adminSchema = mongoose.Schema({
    admin_id:String,
    role_id:Number,
    username:String,
    password:String
}, { minimize:false }),

reportSchema = mongoose.Schema({
    from:String,
    type:Number,
    to:String,
    post_id:Number,
    reason:String
}, { minimize:false }),

User = mongoose.model("users", userSchema),
Post = mongoose.model("posts", postSchema),
Verif = mongoose.model("verifs", verifSchema),
Admin = mongoose.model("admins", adminSchema),
Report = mongoose.model("reports", reportSchema);

module.exports = {
    User:User,
    Post:Post,
    Verif:Verif,
    Admin:Admin,
    Report:Report
};