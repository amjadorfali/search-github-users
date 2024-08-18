import React, { useState } from "react";
import { Router, Link, RouteComponentProps } from "@reach/router";
import Search from "./Search";
import Repos from "./Repos";




function App() {
  const[user,setUser]=useState("");

  return (
    <div>
      <nav className="bg-secondary nav">
        <div>
          Search for github users!
          <br /> <Link to="/"> Click</Link> to go to HomePage
        </div>{" "}
      </nav>
      <div className="container bg-light col-md-8">
        <Router>
          <RouterPage
            path="/"
            pageComponent={<Search greet={(value) => setUser(value)} />}
          />
          <RouterPage path="/Repos/:name" pageComponent={<Repos login={user}/>} />
        </Router>
      </div>
    </div>
  );
}
export default App;
const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
