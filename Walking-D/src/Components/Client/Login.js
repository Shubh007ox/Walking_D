import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Button from "react-bootstrap/Button";
import classes from './login.module.css';
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage(){

    const navigate = useNavigate();
    const navigateToRegister = () => {
        navigate("/authForm")
    }
    const navigateToFacebook = () => {
        navigate("/facebook")

    }
    const navigateToGoogle = () => {
        navigate("/google")

    }


    return(
        <div className={classes.main}>
            <h1>Login Methods</h1>
            <div className={classes.btn}>
            <Button onClick={navigateToFacebook}>Facebook Login</Button>
            </div > 
            {/* <div className={classes.btn}>
                <Button onClick={navigateToGoogle}>Google Login</Button>
            </div> */}
            <div  className={classes.btn}>
                <Button onClick={navigateToRegister}>Register With Us</Button>
            </div>
        </div>
    )
}


export default LoginPage;