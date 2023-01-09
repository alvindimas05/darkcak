const { Post } = require("../mongoose");

module.exports = async function(req, res){
    var query = req.query,
    params = ["post_id", "comment_id"].check(query);

    if(!params) return res.err(null);

    var post = await Post.findOne({ post_id:query.post_id }).select({ post_id:1 });
    if(!post) return res.err(null);

    var comment = await Post.findOne({ post_id:query.post_id })
    .select({ comments:1 }).lean();
    if(!comment) return res.err(null);

    for(com of comment.comments){
        if(com.comment_id == parseInt(query.comment_id)){
            comment = com;
            break;
        }
    }

    var image = comment.image.data.toString("base64");
    res.writeHead(200, { "Content-Type":comment.image.contentType });
    res.end(Buffer.from(image, "base64"));
}