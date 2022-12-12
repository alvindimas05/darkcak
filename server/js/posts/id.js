const { Post } = require("../mongoose");

module.exports = async function(){
    var query = req.query,
    params = ["post_id"].check(query);

    if(!params) return res.err(null);
    
    var result = await Post.findOne({ post_id:query.post_id }, { _id:0, user_id:0 }).lean();

    res.json({
        status:true,
        data:result
    });
}