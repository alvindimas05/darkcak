const { User, Post } = require("../mongoose"),
getTime = require("../time");

async function create(req, res){
    var body = req.body,
    params = ["title", "category"].check(body);

    if(!params || !req.cookies || !req.files.image) return res.err(null);

    body.category = JSON.parse(body.category);
    var cookies = req.cookies,
    result = await User.findOne({
        user_id:cookies.user_id
    });
    
    if(!result) return res.err(null);

    if(body.title.length > 100) return res.err("Judul terlalu panjang!");

    if(req.files.image.size > (5 * 1024 * 1024)) return res.err("Maksimum ukuran gambar adalah 5 MB!");

    var id = (await Post.find()).length + 1;

    var time = Math.round(Date.now() / 1000);

    new Post({
        post_id:id,
        user_id:cookies.user_id,
        username:result.username,
        title:body.title,
        image:{
            data:req.files.image.data,
            contentType:req.files.image.mimetype
        },
        category:body.category,
        time:time,
        rill:0,
        fek:0,
        comments:[]
    }).save();

    res.json({ status:true });
}

/**
 * Fungsi untuk mengambil postingan
 * 
 * Query : page, title (optional)
 * Response : [ { post_id, username, title, image, rill, fek } ]
 */
async function get(req, res){
    var query = req.query,
    params = ["page", "title"].check(query);

    if(!params) return res.err(null);

    var page = await Post.find({}).select({ post_id:1 });
    page = page.length + 10 - (query.page * 10),
    options = {
        post_id: { $lte:page },
        title: { $regex:query.title, $options:"i" }
    };

    if(req.cookies){
        var user = await User.findOne({ user_id:req.cookies.user_id });
        if(user){
            if(!user.gore){
                options.category = { $nin:["gore"] };
                if(!user.nsfw) options.category["$nin"].push("nsfw");
            }
        }
    }

    var result = await Post.find(options, { _id:0, user_id:0 }).sort({ post_id:-1 }).limit(10).lean();

    for(i in result){
        var time = Math.round(Date.now() / 1000) - result[i].time;
        result[i].time = getTime(time);

        for(j in result[i].comments){
            var ctime = Math.round(Date.now() / 1000) - result[i].comments[j].time;
            result[i].comments[j].time = getTime(ctime);

            for(k in result[i].comments[j].reply){
                var rtime = Math.round(Date.now() / 1000) - result[i].comments[j].reply[k].time
                result[i].comments[j].reply[k].time = getTime(rtime);
            }
        }
    }

    res.json({
        status:true,
        data:result
    });
}

module.exports = {
    create:create,
    get:get
};