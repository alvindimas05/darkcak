const { Post } = require("../mongoose");

module.exports = async function(req, res){
    var query = req.query,
    params = ["post_id"].check(query);

    if(!params) return res.err(null);
    
    var result = await Post.findOne({ post_id:query.post_id }).select({ file:1 }).lean(),
    file = result.file.data.toString("base64");

    res.writeHead(200, { "Content-Type":result.file.contentType });
    res.end(Buffer.from(file, "base64"));
}