const { Post } = require("../mongoose"),
getTime = require("../time");

module.exports = async function(req, res){
    var query = req.query,
    params = ["post_id"].check(query);

    if(!params) return res.err(null);
    
    var result = await Post.findOne({ post_id:query.post_id }, { _id:0, user_id:0, image:0 }).lean();

    if(!result) return res.err(null);

    result.time = getTime(Math.round(Date.now() / 1000) - result.time);
    for(j in result.comments){
        var ctime = Math.round(Date.now() / 1000) - result.comments[j].time;
        result.comments[j].time = getTime(ctime);
        result.comments[j].image = !!result.comments[j].image;

        for(k in result.comments[j].reply){
            var rtime = Math.round(Date.now() / 1000) - result.comments[j].reply[k].time
            result.comments[j].reply[k].time = getTime(rtime);
        }
    }
    res.json({
        status:true,
        data:result
    });
}
