const { User, Post } = require("../mongoose.js");
/**
 * Fungsi untuk menambah rill
 * 
 * Body : user_id, post_id
 * Response : status
 */

 async function post(req, res){
    var body = req.body,
    params = ["user_id", "post_id"].check(body);

    if(!params) return res.err(null);

    var user = await User.findOne({
        user_id:body.user_id
    }).select({ rill:1 });

    if(!user) return res.err(null);
    
    var result = await Post.findOne({
        post_id:body.post_id
    });

    if(!result) return res.err(null);

    user = user.rill.indexOf(body.post_id);
    if(user === -1){
        await User.updateOne({
            user_id:body.user_id
        }, {
            $push:{ rill:body.post_id }
        });
        await Post.updateOne({
            post_id:body.post_id
        }, {
            $inc:{ rill:1 }
        });
    } else {
        await User.updateOne({
            user_id:body.user_id
        }, {
            $pull:{ rill:body.post_id }
        });
        await Post.updateOne({
            post_id:body.post_id
        }, {
            $inc:{ rill:-1 }
        });
    }
    res.json({ status:true });
}

/**
 * Fungsi untuk mengambil rill user
 * 
 * Body : user_id
 * Response : rill : [ post_id ]
 */
async function get(req, res){
    var query = req.query,
    params = ["user_id"].check(query);

    if(!params) return res.err(null);

    var user = await User.findOne({
        user_id:query.user_id
    });

    if(!user) return res.err(null);

    var rill = await User.findOne({ user_id:query.user_id }).select({ rill:1, _id:0 });

    res.json(rill.rill);
}

module.exports = {
    post:post,
    get:get
}