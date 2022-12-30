import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";

import Nav from "./Nav";
import Posts from "./Posts/Posts";

import "./css/main.css";
import Loading from "./Loading/Loading";

var base_url = process.env.REACT_APP_BASE_URL;
export default function Main(){
    const [data, setData] = useState(null),
    [done, setDone] = useState(false),
    [warn, setWarn] = useState(null),
    page = useParams().page || 1;

    useEffect(() => {
        if(!done) (async () => {
            var posts = await axios.get(base_url + "/api/post?page=" + page),
            rill = await axios.get(base_url + "/api/post/rill"),
            fek = await axios.get(base_url + "/api/post/fek"),
            warna = await axios.get(base_url + "/api/user/warn?username=" + cookies.get("username"));
            
            if(warna.data.warn) setWarn(warna.data.warn);
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
    }, [done, page]);

    return(
        <>
            <Nav data={data} setData={setData}/>
            <div className="container px-2 pb-2">
                <div className="p-2 row" style={{ backgroundColor:"rgba(255, 255, 0, .75)", display:warn ? "" : "none" }}>
                    <div className="col-2 d-flex align-items-center justify-content-center">
                        <i className="fa fa-warning"/>
                    </div>
                    <span className="col-9">{warn}</span>
                </div>
                {done ? <Posts data={data} setData={setData}/> : (<Loading/>)}
                <div className="w-100">
                    <div className="mt-2 mx-auto my-0 row text-center" style={{ width:"100px" }}>
                        <a className="col" href={"/p/" + (page - 1)}>{page - 1 < 1 ? "" : (page - 1)}</a>
                        <span className="col">{page}</span>
                        <a className="col" href={"/p/" + (page + 1)}>{data && data.length < 5 ? "" : (page + 1)}</a>
                    </div>
                </div>
            </div>
        </>
    );
}