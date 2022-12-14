import { useState, useEffect } from "react";
import axios from "axios";

import Nav from "./nav";
import Result from "../modules/result/result";

import "./css/index.css";

export default function Index(){
    const [elements, setElements] = useState(null);

    useEffect(() => {
        (async () => {
            var base_url = "http://localhost:8080",
            
            post = await axios.get(base_url + "/api/post?page=1&title="),
            rill = await axios.get(base_url + "/api/post/rill?user_id=Lv1pY48mJ0naaBAiLFhz"),
            fek = await axios.get(base_url + "/api/post/fek?user_id=Lv1pY48mJ0naaBAiLFhz");
            
            setElements(Result(post.data, rill.data, fek.data));
        })();
    }, []);

    return(
        <>
            {Nav()}
            <div className="container p-2">
                {elements ? elements : (<h5>No posts...</h5>)}
            </div>
        </>
    );
}