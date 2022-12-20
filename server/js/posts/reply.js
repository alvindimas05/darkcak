const { User, Post } = require("../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["post_id", "comment_id", "comment"].check(body);

    if(!params || !req.cookies) return res.err(null);

    var user = await User.findOne({
        user_id:req.cookies.user_id
    });

    if(!user) return res.err(null);

    var result = await Post.findOne({
        post_id:body.post_id
    });

    if(!result) return res.err(null);

    var time = Math.round(Date.now() / 1000);

    await Post.updateOne({
        post_id:body.post_id,
        "comments.comment_id":body.comment_id
    }, {
        $push:{
            "comments.$.reply":{
                username:user.username,
                comment:body.comment,
                time:time,
            }
        }
    });

    await res.json({ status:true });
}