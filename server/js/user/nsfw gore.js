const app = require("../app"),
{ User } = require("../mongoose");

async function nsfw(req, res){
    var body = req.body,
    params = ["check"].check(body);

    if(!params || !req.cookies) res.err(null);

    await User.updateOne({ user_id:req.cookies.user_id }, { nsfw:body.check });
    res.json({ status:true });
}

async function gore(req, res){
    var body = req.body,
    params = ["check"].check(body);

    if(!params || !req.cookies) res.err(null);

    await User.updateOne({ user_id:req.cookies.user_id }, { gore:body.check });
    res.json({ status:true });
}

module.exports = {
    nsfw:nsfw,
    gore:gore
}