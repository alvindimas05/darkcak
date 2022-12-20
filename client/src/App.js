import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Search from "./pages/Search";
import User from "./pages/User";
import Upload from "./pages/Upload";
import Prof from "./pages/Prof";
import Logout from "./pages/Logout";

axios.defaults.withCredentials = true;

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/s/:search" element={<Search/>}/>
        <Route path="/u/:user" element={<User/>}/>
        <Route path="/profile" element={<Prof/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  )
}