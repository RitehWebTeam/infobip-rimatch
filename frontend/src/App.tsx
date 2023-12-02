import React, { useEffect, useState } from "react";
import "./App.css";
import {  Route, Routes } from "react-router-dom";
import LoginForm from "./views/LoginForm";
import Home from "./views/Home";
import RegisterForm from "./views/RegisterForm";

function App(): React.ReactElement {
  const [message, setMessage] = useState("Lodaing...");
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div>
        <Routes>
          <Route path="/Login" element={<LoginForm/>}/>
          <Route path="/Register" element = {<RegisterForm/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
        
        <p>Message from backend: {message}</p>
      
    </div>
  );
}

export default App;
