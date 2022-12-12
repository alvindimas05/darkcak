function show_comments(dat){
    if(dat.comments.length == 0){
        $(`.comments[post-id='${dat.post_id}']`).prepend(`<h6 class="no-comment" post-id="${dat.post_id}">No comments yet...</h6>`);
    } else {
        for(com of dat.comments){
            com.username = htmlspecialchars(com.username);
            com.comment = htmlspecialchars(com.comment);

            $(`.comments[post-id='${dat.post_id}']`).prepend(`
                <div class="comment">
                    <a href="/u/${com.username}">
                        <span class="comment-by">${com.username}</span>
                    </a>
                    <span class="comment-date">${com.time}</span>
                    <p class="comment-value mb-0">${com.comment}</p>
                    <div class="comment-breply"><span class="breply-reply" comment-id="${com.comment_id}" post-id="${dat.post_id}" username="${com.username}">Reply</span>   <span class="breply-show" comment-id="${com.comment_id}">Show Reply</span></div>
                    <div class="comments-reply" comment-id="${com.comment_id}" style="display:none"></div>
                </div>
            `);

            for(rep of com.reply){
                rep.username = htmlspecialchars(rep.username);
                rep.comment = htmlspecialchars(rep.comment);

                $(`.comments-reply[comment-id="${com.comment_id}"]`).append(`
                    <div class="comment-reply">
                        <a  href="/u/${rep.username}"><span class="comment-by">${rep.username}</span></a>
                        <span class="comment-date">${rep.time}</span>
                        <p class="comment-value mb-0">${rep.comment}</p>
                    </div>
                `);
            }
        }
    }

    $(".breply-show").click(e => {
        var id = $(e.currentTarget).attr("comment-id"),
        reply = $(".comments-reply");

        if(reply.css("display") == "none"){
            $(e.currentTarget).html("Hide Reply");
            $(`.comments-reply[comment-id='${id}']`).css("display", "block");
        }
        else {
            $(e.currentTarget).html("Show Reply");
            $(`.comments-reply[comment-id='${id}']`).css("display", "none");
        }
    });
}