var param = new URLSearchParams(location.search),
page = param.get("page") || 1,
user = param.get("username") || null;

if(!user) location.href = "/";

history.pushState({}, null, "/u/" + user)

$.get(`/api/user/profile?username=${user}`).then(res => {
    if(!res.data) location.href = "/";
    res = res.data;

    if(res.image.data) 
    $("#profile div div img").attr("src", `data:${res.image.contentType};base64,${res.image.data}`);
    else $("#profile div div img").attr("src", "https://via.placeholder.com/300");

    if(res.description) $("#profile p").html(htmlspecialchars(res.description));
    else $("#profile p").html("Insert description here he said");

    $("#profile h3").html(htmlspecialchars(user));
});

$.get(`/api/post/user?page=${page}&username=${user}`).then(res => {
    if(res.data.length == 0) location.href = "/";
    result(res);
});