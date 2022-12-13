import Show from "./show";

export default function Result(dat, i){
    return(
    <div className="post mt-2" key={i}>
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
            <button className="btn btn-dark btn-rill" post-id={dat.post_id} active="false"><i className="fa fa-thumbs-up"/> Rill</button>
            &nbsp;
            <button className="btn btn-dark btn-fek" post-id={dat.post_id} active="false"><i className="fa fa-thumbs-down"/> Fek</button>
            &nbsp;
            <button className="btn btn-dark btn-comment" post-id={dat.post_id}><i className="fa fa-comment"/> Comments</button>
            <p className="post-laiks mx-0 my-1">
                <span><span className="rill-val" post-id={dat.post_id}>{dat.rill}</span> Rill</span>
                &nbsp;
                <span><span className="fek-val" post-id={dat.post_id}>{dat.fek}</span> Fek</span>
            </p>
        </div>
        <div className="comments py-1" post-id={dat.post_id}>
            {Show(dat)}
            <div className="row gx-2 mt-2">
                <input placeholder="Comment" type="text" className="col-9 comment-input" post-id={dat.post_id}/>
                <div className="col-3" align="center">
                    <button post-id={dat.post_id} replying="0" className="btn btn-dark px-3 comment-send">Send</button>
                </div>
            </div>
        </div>
        <hr/>
    </div>
    )
}