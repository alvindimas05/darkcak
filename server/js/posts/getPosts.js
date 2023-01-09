const { User, Post, Admin } = require("../mongoose"),
getTime = require("../time");

module.exports = async function(cookies, page, options){
    var limit = 5;
    page = parseInt(page);
    if(cookies){
        var user = await User.findOne({ user_id:cookies.user_id }, { image:0 });
        if(user){
            options.category = { $nin:user.blacklist };
            options.category.$nin.push("hide");
            if(!user.gore) options.category.$nin.push("gore");
            if(!user.nsfw) options.category.$nin.push("nsfw");
        } else options.category = { $nin:["hide", "nsfw", "gore"] };
    } else options.category = { $nin:["hide", "nsfw", "gore"] };

    var result = await Post.find(options, { _id:0, user_id:0, file:0, "comments.image.data":0 }).sort({ post_id:-1 }).lean(),
    page = page * limit - limit;
    result = result.slice(page, page + limit - 1);
    for(i in result){
        var time = Math.round(Date.now() / 1000) - result[i].time;
        result[i].time = getTime(time);

        for(j in result[i].comments){
            var ctime = Math.round(Date.now() / 1000) - result[i].comments[j].time;
            result[i].comments[j].time = getTime(ctime);
            result[i].comments[j].image = !!result[i].comments[j].image;

            for(k in result[i].comments[j].reply){
                var rtime = Math.round(Date.now() / 1000) - result[i].comments[j].reply[k].time
                result[i].comments[j].reply[k].time = getTime(rtime);
            }
        }
    }
    return result;
}