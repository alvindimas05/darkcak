const { Post } = require("../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["post_id", "comment_id"].check(body);

    if(!params) return res.err(null);

    var post = await Post.findOne({ post_id:body.post_id });
    if(!post) return res.err(null);

    var comment = null;
    for(i of post){
        
    }
}