import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/login-form";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errMsg, setErrMsg] = useState(null);
  const [token, setToken] = useState(null);

  if (errMsg) {
    setTimeout(() => {
      setErrMsg("");
    }, 4000);
  }

  useEffect(() => {
    const existingToken = localStorage.getItem("loginToken");
    setToken(existingToken);
  }, [token]);

  const client = useApolloClient();

  const logOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return <LoginForm handleError={setErrMsg} handleSetToken={setToken} />;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logOut}>logout</button>
      </div>

      {errMsg && <p style={{ color: "red" }}>error: {errMsg}</p>}

      <Authors show={page === "authors"} err={setErrMsg} />

      <Books show={page === "books"} err={errMsg} />

      <NewBook show={page === "add"} err={setErrMsg} />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
