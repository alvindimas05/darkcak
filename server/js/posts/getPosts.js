const { User, Post } = require("../mongoose"),
getTime = require("../time");

module.exports = async function(cookies, page, options){
    if(cookies){
        var user = await User.findOne({ user_id:cookies.user_id });
        if(user){
            options.category = { $nin:user.blacklist };
            if(!user.gore) options.category.$nin.push("gore");
            if(!user.nsfw) options.category.$nin.push("nsfw");
        }
    }

    var result = await Post.find(options, { _id:0, user_id:0, file:0 }).sort({ post_id:-1 }).lean(),
    page = page * 5 - 5;
    result.slice(page, page + 4);
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
    return result;
}