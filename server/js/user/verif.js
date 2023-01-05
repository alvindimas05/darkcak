const { Verif, User } = require("../mongoose");

module.exports = async function(req, res){
    var query = req.query,
    params = ["user_id"].check(query);

    if(!params) return res.err(null);
    
    var verif = await Verif.findOne({ user_id:query.user_id });
    if(!verif) return res.err(null);
    
    var time = Math.round(Date.now() / 1000);
    await new User({
        user_id:verif.user_id,
        email:verif.email,
        username:verif.username,
        password:verif.password,
        time:time
    }).save();

    await Verif.deleteOne({ user_id:verif.user_id });

    res.cookie("user_id", verif.user_id, {
        httpOnly:true,
        maxAge:12 * 30 * 24 * 3600 * 1000
    });
    res.json({ status:true, username:verif.username });
}