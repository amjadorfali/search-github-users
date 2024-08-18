import React from "react";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";
import './App.css';


interface IRepo{
  name : string
  description: string
  html_url : string
}
interface IProps{
  login : string
}
const Repos=(props:IProps)=> {


  const [repos, setRepos] = useState<[]>(null!);
  const [loading, setloading] = useState(true);
  const login =props.login;
  useEffect(() => {
    let tempUrl =("https://api.github.com/users/").concat(login) ;
    tempUrl =tempUrl.concat("/repos");
    
    fetch(tempUrl)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setloading(false);
        
      })
      .catch(console.log);
      
  },[login]);
  // function getElement(){
  //   setELement (
      
  //   );
  // }
  return <div>
    
    { loading ?   <Loader />:null }
    { loading ?   null:(<div>
        <h1>{props.login}</h1>
        <h1>Repositories : {repos.length}</h1>
        {repos.map((repository: IRepo) => {
          return (
            <div>
              <div className="card bg-warning" key={repository.name}>Name : {repository.name}</div>
              <div className="card-body">
                Description :
                {repository.description !== null
                  ? repository.description
                  : " No description Found"} <br/>
                <Button href={repository.html_url} className="bg-danger"> Visit Link</Button>
              </div>
            </div>
          );
        })}
      </div>) }
    
  
  </div>
  
 
}

export default Repos;
