import axios from "axios";
import { useEffect } from "react"

export default function(){
    useEffect(() => {
        (async () => {
            var res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/user/verify")
            cookies.set("username", res.data.username, { expires:360 });
            setTimeout(() => window.location.href = "/", 500);
        })();
    }, [])
    return <></>
}