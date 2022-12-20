import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import Posts from "./Posts/Posts";

import "./css/main.css";

var base_url = process.env.REACT_APP_BASE_URL;
export default function Search(){
    const params = useParams();

    const [data, setData] = useState(null),
    [done, setDone] = useState(false);
    useEffect(() => {
        if(!done) (async () => {
            var posts = await axios.get(base_url + "/api/post?page=1&title=" + params.search),
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
    }, [done, params]);

    return(
        <>
            <Nav/>
            <div className="container p-2">
                <h5>Result of "{params.search}" :</h5>
                {done ? <Posts data={data} setData={setData}/> : (<h5>No posts...</h5>)}
            </div>
        </>
    );
}