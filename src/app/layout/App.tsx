import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";
import "./style.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Welcome to Revenantly</h1>
      <p className="italic">a new way of meeting new people</p>
    </>
  );
}

export default App;
