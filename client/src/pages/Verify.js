import axios from "axios";
import cookies from "js-cookie";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function Verify(){
    const params = useParams(),
    [loading, setLoading] = useState(false);
    useEffect(() => {
        if(!loading){
            setLoading(true);
            (async () => {
                var res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/user/verify?user_id=" + params.id);
                console.log(res.data);
                if(res.data.status){
                    cookies.set("username", res.data.username, { expires:360 });
                    setTimeout(() => window.location.href = "/", 500);
                }
            })();
        };
    }, [params, loading])
    return <></>;
}