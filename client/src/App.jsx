import { useEffect, useState } from "react";
import "./App.css";
import Tabs from "./components/Tabs";
import AddBook from "./components/tab/AddBook";
import GetBook from "./components/tab/GetBook";
import UpdateBook from "./components/tab/UpdateBook";
import Token from "./components/tab/Token";

const App = () => {
  const [refreshToken, setRefreshToken] = useState("");
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const storedData = sessionStorage.getItem("refreshToken");
    if (storedData) {
      setRefreshToken(storedData);
    } else {
      setRefreshToken("");
    }
  }, [refreshToken,tab]);
  const components = [
    <AddBook />,
    <GetBook />,
    <UpdateBook />,
    <Token refreshToken={refreshToken} setTab={setTab} />,
  ];
  return (
    <div className="App">
      <Tabs setTab={setTab} />
      <div className="app-container">{components[tab]}</div>
    </div>
  );
};

export default App;
