function result(res){
    res.data.forEach(dat => {
        dat.title = htmlspecialchars(dat.title);
        dat.username = htmlspecialchars(dat.username);

        $("#main").append(
            `<div class="post mt-2">
                <!-- Post Utama -->
                <div>
                    <img class="w-100" src="data:${dat.image.contentType};base64,${dat.image.data}">
                    <div style="margin-top:2.5px">
                        <span class="post-title">${dat.title}</span>
                    </div>
                    <div style="margin-top:-5px">
                        <a class="post-by" href="/u/${dat.username}">${dat.username}</a>
                        <span class="post-date">${dat.time}</span>
                    </div>
                    <button class="btn btn-dark btn-rill" post-id="${dat.post_id}" active="false"><i class="fa fa-thumbs-up"></i> Rill</button>
                    <button class="btn btn-dark btn-fek" post-id="${dat.post_id}" active="false"><i class="fa fa-thumbs-down"></i> Fek</button>
                    <button class="btn btn-dark btn-comment" post-id="${dat.post_id}"><i class="fa fa-comment"></i> Comments</button>
                    <p class="post-laiks mx-0 my-1">
                        <span><span class="rill-val" post-id="${dat.post_id}">${dat.rill}</span> Rill</span>
                        <span><span class="fek-val" post-id="${dat.post_id}">${dat.fek}</span> Fek</span>
                    </p>
                </div>
                <!-- Komentar -->
                <div class="comments py-1" post-id="${dat.post_id}">
                    <!-- Berkomentar -->
                    <div class="row gx-2 mt-2">
                        <input placeholder="Comment" type="text" class="col-9 comment-input" post-id="${dat.post_id}">
                        <div class="col-3" align="center">
                            <button post-id="${dat.post_id}" replying="0" class="btn btn-dark px-3 comment-send">Send</button>
                        </div>
                    </div>
                </div>
                <hr>
            </div>`
        );
        
        show_comments(dat);
    });
    
    rill_fek();
    comment_send();
}