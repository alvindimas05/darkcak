var param = new URLSearchParams(location.search),
page = param.get("page") || 1,
search = param.get("search") || "";

if(page > 1){
    history.pushState({}, null, "/p/" + page);
} else {
    history.pushState({}, null, "/");
}
if(search){
    $("#main").append(`<h5>Result of "${search}" :</h5>`);
    history.pushState({}, null, "/s/" + search);
}

if(page > 1 && search){
    history.pushState({}, null, `/s/${search}/p/${page}`);
}
$.get(`/api/post?page=${page}&title=${search}`).then(result);