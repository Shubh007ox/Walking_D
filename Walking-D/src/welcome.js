import {useState,useEffect} from "react";


function Welcome(){
    const [User,setUser] = useState('')
   
    useEffect(() => {
        const GetUser = localStorage.getItem('enteredEmail');
        setUser(GetUser);
      }, []);
    return(
        <div id="email">
            <h1>Welcome</h1>
            <span>User :- {User}</span>
        </div>
    )

}

export default Welcome;
