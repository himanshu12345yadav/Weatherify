import React, { useState, useEffect } from "react";
import Weather from "./components/Main";
import Spinner from "./components/spinner";

const App = () => {
  const [Status, setStatus] = useState(true);
  useEffect(() => {
    window.addEventListener("load", () => {
      setStatus(!Status);
    });
  }, [Status]);

  return <>{Status ? <Spinner /> : <Weather />}</>;
};

export default App;
