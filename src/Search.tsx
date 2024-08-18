import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Loader from "./Loader";
import './App.css';
import './App.tsx';

interface IUser{
  repos_url : string
  login:  string
  id :  number
  isShowing : boolean
  avatar_url: string
}

interface IProps {
  greet: (value:string) => void
}
const Search=(props:IProps) =>{
  
  const [contactList, setContactList] = useState<[]>(null!);
  const [apiContacts, setApiContacts] = useState<[]>(null!);
  const [repos, setRepos] = useState<[]>(null!);
  const [currentContact, setCurrentContact] = useState<IUser>(null!);

  const [searchValue, setSearchValue] = useState("");
  const [loaded, setLoaded] = useState<Boolean>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
      fetch("https://api.github.com/search/users?q=".concat(searchValue))
      .then((res) => res.json())
      .then((data) => {
        setApiContacts(data);
        let filteredContacts = data.items.slice(0, 20);
        setContactList(filteredContacts);
      })
      .catch(console.log);
    
   
  }, [searchValue]);
  async function fetchData(url:string) {
    setLoading(true);
   
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        
        setRepos(data);
        setLoading(false);
        setLoaded(true);
      })
      .catch(console.log);
  }

  const list = () => {
   
    return (
      <div>
        
        <Link to={`/Repos/${currentContact.login}`}  >
       
          <h4>Check repositories</h4>
        </Link>

        <h4>Repos : {repos.length}</h4>
      </div>
    );
  };
  const submitItem = (e:any) => {
    let isFound = false;
    e.preventDefault();
    if(searchValue.length>0){
      apiContacts.map((contact:any) => {
        if (contact.login === searchValue) {
          showUser(contact);
          isFound = true;
          
        }
        return 0;
      });
    }
    
    if (!isFound) {
      alert("Contact not found");
    }
    setSearchValue("");
  };

  const onChangeValue = (e:any) => {
    e.preventDefault();
    setSearchValue(e.target.value);

    setContactList([]);

 
  };
  const showUser = (user: IUser) => {
    
    
    fetchData(user.repos_url);

    setSearchValue("");
    setContactList([]);

    setCurrentContact(user );
   props.greet(user.login);
  };
 
  return (
    <div>
      <form onSubmit={submitItem}>
        <input
          className="searchForm"
          type="text"
          onChange={onChangeValue}
          value={searchValue}
          placeholder="Search..."
          
        />

       {(searchValue.length>0)? (<div className="drop">
          {contactList.map((contact:IUser) => (
            <div id="searchItem" onClick={() => showUser(contact)}>
              <p key={contact.id} >
                {contact.login}
                
              </p>
            </div>
          ))}
        </div>):""}
      </form>
      {loaded ? (
        <div className="row">
          <div className="col-4">
            <h1> {currentContact.login}</h1>

            { list() }
          </div>

          <div className="image col-5">
            <img
              src={currentContact.avatar_url}
              className="rounded-circle"
              alt=""
            />
          </div>
        </div>
      ) : (
        ""
      )}
      {loading ? <Loader /> : ""}
    </div>
  );
}

export default Search;
