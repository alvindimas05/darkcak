const { User, Post } = require("../mongoose");

/**
 * Fungsi untuk menambah fek
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
    }).select({ fek:1 });

    if(!user) return res.err(null);
    
    var result = await Post.findOne({
        post_id:body.post_id
    });

    if(!result) return res.err(null);

    user = user.fek.indexOf(body.post_id);
    if(user === -1){
        await User.updateOne({
            user_id:body.user_id
        }, {
            $push:{ fek:body.post_id }
        });
        await Post.updateOne({
            post_id:body.post_id
        }, {
            $inc:{ fek:1 }
        });
    } else {
        await User.updateOne({
            user_id:body.user_id
        }, {
            $pull:{ fek:body.post_id }
        });
        await Post.updateOne({
            post_id:body.post_id
        }, {
            $inc:{ fek:-1 }
        });
    }
    res.json({ status:true });
}

/**
 * Fungsi untuk mengambil fek user
 * 
 * Body : user_id
 * Response : fek : [ post_id ]
 */
async function get(req, res){
    var query = req.query,
    params = ["user_id"].check(query);

    if(!params) return res.err(null);

    var user = await User.findOne({
        user_id:query.user_id
    });

    if(!user) return res.err(null);

    var fek = await User.findOne({ user_id:query.user_id }).select({ fek:1, _id:0 });

    res.json(fek.fek);
}

module.exports = {
    post:post,
    get:get
}