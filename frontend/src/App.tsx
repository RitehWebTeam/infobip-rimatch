import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./views/LoginForm";
import Home from "./views/Home";
import RegisterForm from "./views/RegisterForm";
import Preferences from "./views/Preferences";

function App(): React.ReactElement {
  return (
    <div>
      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/Preferences" element={<Preferences />} />
      </Routes>

      {/*<p>Message from backend: {message}</p>*/}
    </div>
  );
}

export default App;
