export function Reply(username, id, setReply, setComment){
    setComment(`@${username} `);
    setReply(id);
}
export function Replys(props){
    var replys = props.replys;

    return replys.map((rep, i) => (
        <div className="comment-reply" key={i}>
            <a href={"/u/" + rep.username}><span className="comment-by">{rep.username}</span></a>
            &nbsp;
            <span className="comment-date">{rep.time}</span>
            <p className="comment-value mb-0">{rep.comment}</p>
        </div>
    ));
}