const { Post } = require("../mongoose"),
getTime = require("../time");

var category = [
    "meme",
    "politic",
    "news",
    "anime",
    "korean",
    "game",
    "encyclopedia",
    "comic",
    "ask",
    "sport",
    "animals",
    "nsfw",
    "gore"
];

async function get(req, res){
    var body = req.body,
    params = ["category"].check(body);

    if(!params || !Array.isArray(body.category)) return res.err(null);

    var options = { category:{ $in:body.category } };
    if(req.cookies){
        var user = await User.findOne({ user_id:req.cookies.user_id });
        if(user){
            if(!user.gore){
                options.category = { $nin:["gore"] };
                if(!user.nsfw) options.category.$nin.push("nsfw");
            }
        }
    }

    var result = await Post.find(options, { _id:0, user_id:0 }).sort({ post_id:-1 }).limit(10).lean();

    for(i in result){
        var time = Math.round(Date.now() / 1000) - result[i].time;
        result[i].time = getTime(time);

        for(j in result[i].comments){
            var ctime = Math.round(Date.now() / 1000) - result[i].comments[j].time;
            result[i].comments[j].time = getTime(ctime);

            for(k in result[i].comments[j].reply){
                var rtime = Math.round(Date.now() / 1000) - result[i].comments[j].reply[k].time
                result[i].comments[j].reply[k].time = getTime(rtime);
            }
        }
    }
    
    res.json({
        status:true,
        data:result
    });
}