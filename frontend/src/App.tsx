
import React, { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import MatchCard from "./components/MatchCard";


function App(): React.ReactElement {
const [message, setMessage] = useState("Lodaing...");
 const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  useEffect(() => {
    fetch(backendUrl).then(res =>res.json()).then(data => setMessage(data.message))
  }, [])
  return (
    <div>
      <Navbar/>
      <MatchCard/>
    </div>
  )
}

export default App;
