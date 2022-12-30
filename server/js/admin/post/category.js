const { Admin, Post } = require("../../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["admin_id", "post_id", "category"].check(body);

    if(!params) return res.err(null);

    var admin = await Admin.findOne({ admin_id:body.admin_id });
    if(!admin) return res.err(null);

    var post = await Post.findOne({ post_id:body.post_id });
    if(!post) return res.err(null);

    await Post.updateOne({ post_id:body.post_id }, post.category.includes(body.category) ? 
    { $pull:{ category:body.category } } : { $push:{ category:body.category } });
    res.json({ status:true });
}