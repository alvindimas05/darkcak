const { User, Post } = require("../mongoose"),
getPosts = require("./getPosts");

async function create(req, res){
    var body = req.body,
    params = ["title", "category"].check(body);

    if(!params || !req.cookies || !req.files.file) return res.err(null);

    body.category = JSON.parse(body.category);
    var cookies = req.cookies,
    result = await User.findOne({
        user_id:cookies.user_id
    }, { image:0 });
    
    if(!result) return res.err(null);

    if(result.cooldown) return res.err("Cooldown...");
    if(result.banned) return res.err("Banned thx");

    if(body.title.length > 100) return res.err("Judul terlalu panjang!");

    var imgtype = ["image/png", "image/jpg", "image/jpeg", "image/gif"],
    isImage = true;
    
    if(!imgtype.includes(req.files.file.mimetype)) isImage = false;
    if(req.files.file.mimetype != "video/mp4" && !isImage) return res.err("Sus files");
    if(req.files.file.size > (2 * 1024 * 1024)) return res.err("Maksimum ukuran file adalah 2 MB!");

    var id = (await Post.find()).length + 1;

    var time = Math.round(Date.now() / 1000);

    new Post({
        post_id:id,
        user_id:cookies.user_id,
        username:result.username,
        title:body.title,
        file:{
            data:req.files.file.data,
            contentType:req.files.file.mimetype
        },
        category:body.category,
        isImage:isImage,
        time:time
    }).save();

    await User.updateOne({ user_id:req.cookies.user_id }, { cooldown:true });
    setTimeout(async () => await User.updateOne({ user_id:req.cookies.user_id }, { cooldown:false }), 45 * 60 * 1000)
    res.json({ status:true });
}

async function get(req, res){
    var query = req.query,
    params = ["page"].check(query);

    if(!params) return res.err(null);

    var options = {};
    if(query.title) options.title = { $regex:query.title, $options:"i" };
    res.json({
        status:true,
        data:await getPosts(req.cookies, query.page, options)
    });
}

module.exports = {
    create:create,
    get:get
};