import axios from "axios";
import cookies from "js-cookies";

export default function Logout(){
    cookies.removeItem("username");
    axios.get(process.env.REACT_APP_BASE_URL + "/api/user/logout")
    .then(() => window.location.href = "/")
}