import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App(): React.ReactElement {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Lodaing...");

  useEffect(() => {
    fetch('http://localhost:8080/').then(res =>res.json()).then(data => setMessage(data.message))
  }, [])


  return (
    <>
      <div className="flex justify-between">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Will it work without test invalidation</h1>
      <div className="card">
        <button
          className=""
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Message from backend: {message}
      </p>
    </>
  );
}

export default App;
