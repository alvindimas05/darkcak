import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Main from "./pages/Main";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}