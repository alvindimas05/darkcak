const { Post, User } = require("../mongoose"),
getTime = require("../time");

module.exports = async function(req, res){
    var query = req.query,
    params = ["page", "username"].check(query);

    if(!params) return res.err(null);

    // var page = await Post.find({ username:query.username }).select({ post_id:1 });
    // page = page.length + 10 - (query.page * 10);
    var options = { username:query.username };

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