import { useState, useEffect } from "react";
import axios from "axios";

import Nav from "./nav";
import Result from "../modules/result/result";

import "./css/index.css";

export default function Index(){
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            var res = await axios.get(`http://localhost:8080/api/post?page=1&title=`);
            setData(res.data);
        })();
    }, []);

    return(
        <>
            {Nav()}
            <div className="container p-2" style={{ whiteSpace:"normal" }}>
                {data ? 
                    (data.data.map(Result))
                    : 
                    (<h5>No posts...</h5>)
                }
            </div>
        </>
    );
}