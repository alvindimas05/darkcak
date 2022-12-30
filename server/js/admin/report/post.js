const { User, Report } = require("../../mongoose");

module.exports = async function(req, res, wss){
    var body = req.body,
    params = ["type", "to", "post_id", "reason"].check(body);

    if(!params || !req.cookies) return res.err(null);

    var user = await User.findOne({ username:body.from, user_id:req.cookies.user_id });
    if(!user) return res.err(null);
    if(user.corldown) return res.err("Cooldown...");

    if(body.type === 1){
        wss.clients.forEach(client => client.send(JSON.stringify({
            from:user.username,
            type:1,
            post_id:body.post_id,
            reason:body.reason
        })));
    } else if(body.type === 2){
        wss.clients.forEach(client => client.send(JSON.stringify({
            from:user.username,
            type:2,
            to:body.to,
            reason:body.reason
        })));
    }

    await new Report({
        from:user.username,
        type:body.type,
        to:body.to,
        post_id:body.post_id,
        reason:body.reason
    }).save();


    await User.updateOne({ username:user.username }, { corldown:true });
    setTimeout(async () => await User.updateOne({ username:user.username }, { corldown:false }), 60 * 1000);
    res.json({ status:true });
}