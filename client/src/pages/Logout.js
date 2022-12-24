import axios from "axios";
import cookies from "js-cookie";
import { useEffect } from "react";

export default function Logout(){
    useEffect(() => {
        (async () => {
            cookies.remove("username");
            await axios.get(process.env.REACT_APP_BASE_URL + "/api/user/logout");
            setTimeout(() => window.location.href = "/", 500);
        })();
    });
    return <></>;
}