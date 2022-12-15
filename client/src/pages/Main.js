import { useState, useEffect } from "react";
import axios from "axios";

import Nav from "./Nav";
import Posts from "./Posts/Posts";

import "./css/main.css";

export default function Main(){
    const [data, setData] = useState(null),
    [done, setDone] = useState(false);

    useEffect(() => {
        if(!done) (async () => {
            var base_url = "http://localhost:8080",
            posts = await axios.get(base_url + "/api/post?page=1&title="),
            rill = await axios.get(base_url + "/api/post/rill"),
            fek = await axios.get(base_url + "/api/post/fek");

            setData(posts.data.data.map(post => {
                if(rill.data.indexOf(post.post_id) !== -1) post.rcol = true;
                else post.rcol = false;
                
                if(fek.data.indexOf(post.post_id) !== -1) post.fcol = true;
                else post.fcol = false;

                post.display = false;
                post.comments = post.comments.map(com => {
                    com.display = false;
                    return com;
                });

                return post;
            }));
            setDone(true);
        })();
    }, [done]);

    return(
        <>
            <Nav/>
            <div className="container p-2">
                {done ? <Posts data={data} setData={setData}/> : (<h5>No posts...</h5>)}
            </div>
        </>
    );
}