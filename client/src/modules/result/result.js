import { useState } from "react";

import Show from "./show";
import { Fek, Rill } from "./rill_fek";
import Send from "./comment";

function Res(props){
    var dat = props.dat;

    const [display, setDisplay] = useState("none"),
    [rill, setRill] = useState(props.rill ? "lime" : "#fff"),
    [fek, setFek] = useState(props.fake ? "red" : "#fff"),
    [rval, setRval] = useState(dat.rill),
    [fval, setFval] = useState(dat.fek),

    [ucom, setUcom] = useState([]),
    [comment, setComment] = useState(""),
    [reply, setReply] = useState(dat.comments),
    [idrep, setIdrep] = useState(0);

    function btn_comment(){
        if(display === "none") setDisplay("block");
        else setDisplay("none");
    }

    return(
        <div className="post mt-2">
            <div>
                <img className="w-100" alt="Post" src={`data:${dat.image.contentType};base64,${dat.image.data}`}/>
                <div style={{ marginTop:"2.5px" }}>
                    <span className="post-title">{dat.title}</span>
                </div>
                <div style={{ marginTop:"-5px" }}>
                    <a className="post-by" href={"/u/" + dat.username}>{dat.username}</a>
                    &nbsp;
                    <span className="post-date">{dat.time}</span>
                </div>
                <button className="btn btn-dark btn-rill" onClick={async () => await Rill(dat.post_id, rill, setRill, rval, setRval)} style={{ color:rill }}>
                    <i className="fa fa-thumbs-up"/> Rill
                </button>
                &nbsp;
                <button className="btn btn-dark btn-fek" onClick={async () => await Fek(dat.post_id, fek, setFek, fval, setFval)} style={{ color:fek }}>
                    <i className="fa fa-thumbs-down"/> Fek
                </button>
                &nbsp;
                <button className="btn btn-dark btn-comment" onClick={btn_comment}><i className="fa fa-comment"/> Comments</button>
                <p className="post-laiks mx-0 my-1">
                    <span><span className="rill-val">{rval}</span> Rill</span>
                    &nbsp;
                    <span><span className="fek-val">{fval}</span> Fek</span>
                </p>
            </div>
            <div className="comments py-1" style={{ display:display }}>
                <Show dat={dat} reply={reply}/>
                <Show dat={ucom} single={true}/>
                <div className="row gx-2 mt-2">
                    <input placeholder="Comment" type="text" value={comment} onInput={e => setComment(e.target.value)} className="col-9 comment-input"/>
                    <div className="col-3" align="center">
                        <button idrep={idrep} onClick={async e => Send(dat.post_id, comment, ucom, setUcom, setComment, setReply)}
                        className="btn btn-dark px-3 comment-send">Send</button>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default function Result(data, rill, fek){
    var elements = []
    data.data.map((dat, i) => {
        var ractive = rill.indexOf(dat.post_id) !== -1 ? true : false,
        factive = fek.indexOf(dat.post_id) !== -1 ? true : false;

        return elements.push(<Res dat={dat} rill={ractive} fek={factive} key={dat.post_id}/>);
    });
    return elements;
}