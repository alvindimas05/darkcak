const { Verif } = require("../mongoose");

module.exports = async function(req, res){
    var query = req.query,
    params = ["user_id"].check(query);

    if(!params) return res.err(null);

    var verif = await Verif.findOne({ user_id:query.id });
    if(!verif) return res.err(null);
    
    var time = Math.round(Date.now() / 1000);
    await new User({
        user_id:id,
        username:query.username,
        password:query.password,
        time:time
    }).save();

    res.cookie("user_id", id, {
        httpOnly:true,
        maxAge:12 * 30 * 24 * 3600 * 1000
    });
    res.json({ status:true, username:query.username });
}