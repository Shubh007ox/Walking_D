import React,{useState} from "react";
import Button from "react-bootstrap/esm/Button";
import { signInWithPopup } from "firebase/auth";
import {auth,provider} from '../Server/firebaseFacbook'
import { useNavigate } from "react-router-dom";
import MainNavigation from "./navbar";
// import MainNavigation from "./navbar";


function FacebookPage(){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const facebookLoginHandler = () => {
        signInWithPopup(auth,provider) .then((res) => {
            console.log(res);
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = "Authentication failed!";
                if (data && data.error && data.error.message) {
                  errorMessage = data.error.message;
                }
  
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            setUser(data.user)
            // navigate("/welcome");
          })
          .catch((err) => {
            alert(err.message);
          });

    }
    const logoutHandler = () => {
        setUser(null);
    }
    //Login to Google is almost same as facebook due to the timeConstraints Cannot able to complete the code

    return(
        <React.Fragment>
            <MainNavigation />
            <h1>Welcome to FaceBook Login Page</h1>
            {/* <div>
                <Button onClick={facebookLoginHandler}>Click for Login with FaceBook</Button>
            </div> */}
            <div>
                {user? (
                    <>
                    <Button onClick={logoutHandler}>LogOut</Button>
                    <h3>Welcome : {user.displayName}</h3>
                    <p>{user.email}</p>
                    </>
                ):(
                    <Button onClick={facebookLoginHandler}>Click for Login with FaceBook</Button>

                )}
            </div>
        </React.Fragment>
    )
}

export default FacebookPage;