const { Admin, Post } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["admin_id", "post_id"].check(body);

    if(!params) return res.err(null);
    
    var admin = await Admin.findOne({ admin_id:body.admin_id });
    if(!admin) return res.err(null);

    var post = await Post.findOne({ post_id:body.post_id });
    if(!post) return res.err(null);

    console.log(!post.deleted);
    await Post.updateOne({ post_id:body.post_id }, { deleted:!post.deleted });
    res.json({ status:true });
}