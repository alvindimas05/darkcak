const { User } = require("../mongoose");

async function post(req, res){
    var body = req.body,
    params = ["user_id", "description"].check(body);

    if(!params) return res.err(null);

    var user = await User.findOne({ user_id:body.user_id });
    if(!user) return res.err(null);

    if(body.description.length > 200) return res.err("Deskripsi terlalu panjang!");

    if(!req.files){
        await User.updateOne({ user_id:body.user_id }, { description:body.description });
        return res.json({ status:true });
    };

    if(req.files.image.size > (1 * 1024 * 1024)) return res.err("Maksimum ukuran gambar adalah 1 MB!");    

    console.log(req.files.image.mimetype);
    await User.updateOne({ user_id:body.user_id }, {
        image:{
            data:req.files.image.data,
            contentType:req.files.image.mimetype
        },
        description:body.description
    });

    res.json({ status:true });
}

async function get(req, res){
    var query = req.query,
    params = ["username"].check(query);

    if(!params) return res.err(null);

    var user = await User.findOne({ username:query.username })
    .select({ image:1, description:1, _id:0 }).lean();

    if(!user) return res.err(null);

    res.json({ status:true, data:user });
}

module.exports = {
    get:get,
    post:post
}