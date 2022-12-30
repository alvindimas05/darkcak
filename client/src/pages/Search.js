import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import Posts from "./Posts/Posts";

import "./css/main.css";
import Loading from "./Loading/Loading";

var base_url = process.env.REACT_APP_BASE_URL;
export default function Search(){
    const params = useParams();
    const [data, setData] = useState(null),
    [done, setDone] = useState(false),
    page = params.page || 1;

    useEffect(() => {
        if(!done) (async () => {
            var posts = await axios.get(base_url + "/api/post?page=" + page +"&title=" + params.search),
            rill = await axios.get(base_url + "/api/post/rill"),
            fek = await axios.get(base_url + "/api/post/fek");

            setData(posts.data.data.map(post => {
                if(Array.isArray(rill.data)){
                    if(rill.data.indexOf(post.post_id) !== -1) post.rcol = true;
                    else post.rcol = false;
                    
                    if(fek.data.indexOf(post.post_id) !== -1) post.fcol = true;
                    else post.fcol = false;
                }

                post.display = false;
                post.comments = post.comments.map(com => {
                    com.display = false;
                    return com;
                });

                return post;
            }));
            setDone(true);
        })();
    }, [done, params, page]);

    return(
        <>
            <Nav data={data} setData={setData}/>
            <div className="container p-2">
                <h6>Result of "{params.search}" :</h6>
                {done ? <Posts data={data} setData={setData}/> : <Loading/>}
                <div className="w-100">
                    <div className="mt-2 mx-auto my-0 row text-center" style={{ width:"100px" }}>
                        <a className="col" href={`/s/${params.search}/p/${page - 1}`}>{page - 1 < 1 ? "" : (page - 1)}</a>
                        <span className="col">{page}</span>
                        <a className="col" href={`/s/${params.search}/p/${page + 1}`}>{data && data.length < 5 ? "" : (page + 1)}</a>
                    </div>
                </div>
            </div>
        </>
    );
}