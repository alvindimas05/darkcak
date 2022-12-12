module.exports = function(req, res){
    res.clearCookie("username");
    res.clearCookie("user_id");
    res.redirect("/");
    res.end();
}