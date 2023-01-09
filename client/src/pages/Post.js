import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import Posts from "./Posts/Posts";

import "./css/main.css";
import Loading from "./Loading/Loading";

var base_url = process.env.REACT_APP_BASE_URL;
export default function Main(){
    const [data, setData] = useState(null),
    [done, setDone] = useState(false),
    params = useParams();

    useEffect(() => {
        if(!done) (async () => {
            var posts = await axios.get(base_url + "/api/post/id?post_id=" + params.id),
            rill = await axios.get(base_url + "/api/post/rill"),
            fek = await axios.get(base_url + "/api/post/fek");
            
            posts.data.data = [posts.data.data];

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
    }, [done, params]);

    console.log(data);
    return(
        <>
            <Nav data={data} setData={setData}/>
            <div className="container p-2">
                {done ? <Posts data={data} setData={setData} one={true}/> : (<Loading/>)}
            </div>
        </>
    );
}