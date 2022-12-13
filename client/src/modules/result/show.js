function Reply(rep, i){
    return(
        <div class="comment-reply" key={i}>
            <a href={"/u/" + rep.username}><span class="comment-by">{rep.username}</span></a>
            <span class="comment-date">{rep.time}</span>
            <p class="comment-value mb-0">{rep.comment}</p>
        </div>
    )
}

export default function Show(dat){
    if(dat.comments.length === 0){
        return(
            <h6 class="no-comment" post-id={dat.post_id}>No comments yet...</h6>
        );
    } else {
        dat.comments.map((com, i) => (
            <div class="comment" key={i}>
                <a href={"/u/" + com.username}>
                    <span class="comment-by">{com.username}</span>
                </a>
                <span class="comment-date">{com.time}</span>
                <p class="comment-value mb-0">{com.comment}</p>
                <div class="comment-breply">
                    <span class="breply-reply" comment-id={com.comment_id} post-id={dat.post_id} username={com.username}>
                        Reply
                    </span>
                    <span class="breply-show" comment-id={com.comment_id}>
                        Show Reply
                    </span>
                </div>
                <div class="comments-reply" comment-id={com.comment_id} style={{ display:"none" }}>
                    {com.reply.map(Reply)}
                </div>
            </div>
        ))
    }
}