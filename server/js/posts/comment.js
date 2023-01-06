const { User, Post } = require("../mongoose");

module.exports = async function(req, res){
    var body = req.body,
    params = ["post_id", "comment"].check(body);

    if(!params || !req.cookies) return res.err(null);

    var user = await User.findOne({
        user_id:req.cookies.user_id
    });

    if(!user) return res.err(null);
    if(user.comldown) return res.err("Cooldown...");
    if(user.banned) return res.err("Banned thx");

    var result = await Post.findOne({
        post_id:body.post_id
    });

    if(!result) return res.err(null);

    var image = null;
    if(req.files.image){
        var imgtype = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        if(!imgtype.includes(req.files.image.mimetype)) return res.err("Sus files...");
        if(req.files.image.size > (512 * 1024 * 1024)) return res.err("Maksimum ukuran gambar adalah 512 KB!");

        image = {
            data:req.files.image.data,
            contentType:req.files.image.mimetype
        };
    }

    var time = Math.round(Date.now() / 1000),
    id = await Post.findOne({ post_id:body.post_id });
    id = id.comments.length + 1;

    await Post.updateOne({ post_id:body.post_id }, {
        $push:{
            comments:{
                comment_id:id,
                username:user.username,
                comment:body.comment,
                time:time,
                image:image,
                reply:[]
            }
        }
    });

    await User.updateOne({ user_id:req.cookies.user_id }, { comldown:true })
    setTimeout(async () => await User.updateOne({ user_id:req.cookies.user_id }, { comldown:false }), 60 * 1000);
    res.json({ status:true, id:id });
}