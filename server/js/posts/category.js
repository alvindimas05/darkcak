const { Post, User } = require("../mongoose"),
getTime = require("../time");
const getPosts = require("./getPosts");

var category = [
    "meme",
    "politic",
    "news",
    "anime",
    "korean",
    "game",
    "encyclopedia",
    "comic",
    "ask",
    "sport",
    "animals",
    "nsfw",
    "gore"
];

module.exports = async function(req, res){
    var query = req.query,
    params = ["category", "page"].check(query);

    if(!params) return res.err(null);

    var cat = query.category;
    while(true){
        if(cat[0] === " ") cat = cat.slice(1);
        else if(cat.slice(-2) === "  ") cat = cat.slice(0, -1);
        else break;
    }
    cat = cat.split(" ");

    var options = { category:{ $all:cat } },
    ignore = [],
    result = await getPosts(req.cookies, query.page, options);

    for(i in result)
    if(result[i].category.some(val => ignore.includes(val)))
    result.splice(i, 1);
    
    res.json({
        status:true,
        data:result
    });
}