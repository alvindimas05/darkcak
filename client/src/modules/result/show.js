import { useState } from "react";

function Reply(rep, i){
    return(
        <div className="comment-reply" key={i}>
            <a href={"/u/" + rep.username}><span className="comment-by">{rep.username}</span></a>
            &nbsp;
            <span className="comment-date">{rep.time}</span>
            <p className="comment-value mb-0">{rep.comment}</p>
        </div>
    )
}

export default function Show(props){
    var dat = props.dat,
    elements = [];

    const [display, setDisplay] = useState("none");
    function show_reply(){
        if(display === "none") setDisplay("block");
        else setDisplay("none");
    }
    
    if(dat.comments.length > 0){
        elements.push(
            dat.comments.map((com, i) => (
                <div className="comment" key={i}>
                    <a href={"/u/" + com.username}>
                        <span className="comment-by">{com.username}</span>
                    </a>
                    &nbsp;
                    <span className="comment-date">{com.time}</span>
                    <p className="comment-value mb-0">{com.comment}</p>
                    <div className="comment-breply">
                        <span className="breply-reply">
                            Reply
                        </span>
                        &nbsp;&nbsp;
                        <span className="breply-show" onClick={show_reply}>
                            Show Reply
                        </span>
                    </div>
                    <div className="comments-reply" style={{ display:display }}>
                        {com.reply.map(Reply)}
                    </div>
                </div>
            ))
        );
        return elements;
    } else {
        return <h6 className="no-comment">No comments yet...</h6>;
    }
}