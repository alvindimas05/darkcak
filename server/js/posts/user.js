const getPosts = require("./getPosts");

module.exports = async function(req, res){
    var query = req.query,
    params = ["page", "username"].check(query);

    if(!params) return res.err(null);

    var options = { username:query.username };
    res.json({
        status:true,
        data:await getPosts(req.cookies, query.page, options)
    });
}