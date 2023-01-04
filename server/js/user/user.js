const { randstring, isEmailValid } = require("../functions");
const { User, Verif } = require("../mongoose"),
nodemailer = require("nodemailer");

async function create(req, res){
    var body = req.body,
    params = ["email", "username", "password", "vpassword"].check(body);

    if(!params) return res.err(null);

    if(body.password !== body.vpassword)
    return res.err("Verifikasi password salah!");

    if(body.username.length < 6 || body.password.length == 0)
    return res.err("Panjang username atau password terlalu pendek!");

    if(body.username.length > 30 || body.password.length > 100)
    return res.err("Panjang username atau password terlalu panjang!");

    var result = await User.findOne({
        username:body.username
    });

    if(result) return res.err("Email atau Username sudah digunakan!");

    if(result.email == body.email || result.ip == req.ip)
    return res.err("Kamu tidak boleh membuat lebih dari 1 akun!");

    if(!isEmailValid(body.email)) return res.err("Email tidak valid!");
    
    var id = randstring();
    await new Verif({
        user_id:id,
        email:body.email,
        username:body.username,
        password:body.password
    });

    var transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"darkcakcommunity@gmail.com",
            pass:"emxrzfrhpsdouzym"
        }
    });
    
    await transport.sendMail({
        from:"darkcakcommunity@gmail.com",
        to:body.email,
        subject:"Email Test",
        html:`<a href='https://darkcak.xyz/verification/${id}'>Click me to verify your email</a>`
    });

    res.json({ status:true });
}

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