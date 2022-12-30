const { User } = require("../mongoose"),
{ randstring } = require("../functions");

/**
 * Fungsi untuk membuat akun
 * 
 * Body : username, password, vpassword
 * Response : status, message
 */
async function create(req, res){
    var body = req.body,
    params = ["username", "password", "vpassword"].check(body);

    if(!params) return res.err(null);

    //Mengecek verifikasi password benar
    if(body.password !== body.vpassword){
        res.err("Verifikasi password salah!");
        return;
    }

    if(body.username.length < 6 || body.password.length == 0){
        res.err("Panjang username atau password terlalu pendek!");
        return;
    }

    if(body.username.length > 30 || body.password.length > 100){
        res.err("Panjang username atau password terlalu panjang!");
        return;
    }

    //Mengecek apakah username sudah digunakan
    var result = await User.findOne({
        username:body.username
    });

    if(result){
        res.err("Username sudah digunakan!");
        return;
    }
    
    //Menambahkan user
    var id = randstring(),
    time = Math.round(Date.now() / 1000);
    
    await new User({
        user_id:id,
        username:body.username,
        password:body.password,
        image:{
            data:null,
            contentType:null
        },
        description:null,
        nsfw:false,
        gore:false,
        blacklist:[],
        cooldown:false,
        comldown:false,
        corldown:false,
        warn:null,
        time:time,
        rill:[],
        fek:[]
    }).save();

    res.cookie("user_id", id, {
        httpOnly:true,
        maxAge:12 * 30 * 24 * 3600 * 1000
    });
    res.json({ status:true, username:body.username });
}
/**
 * Fungsi untuk melakukan login
 * 
 * Body : username, password
 * Response : status
 */
async function login(req, res){
    var body = req.body,
    params = ["username", "password"].check(body);

    if(!params) return res.err(null);

    var result = await User.findOne({
        username:body.username,
        password:body.password
    });

    if(result){
        res.cookie("user_id", result.user_id, {
            httpOnly:true,
            maxAge:12 * 30 * 24 * 3600 * 1000
        });
        res.json({ status:!!result, username:result.username });
    } else res.json({ status:!!result });
}

module.exports = {
    create:create,
    login:login
};