import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Server/auth-context";
import classes from "./authForm.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/esm/FormLabel";
import FormControl from "react-bootstrap/esm/FormControl";
import FormGroup from "react-bootstrap/esm/FormGroup";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredConfirmPass;
    if(!isLogin){
       enteredConfirmPass = confirmpasswordInputRef.current.value;
    }
    localStorage.setItem("enteredEmail", JSON.stringify(enteredEmail));

    // optional: Add validation

    setIsLoading(true);
    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD569iNkhWZ_j_QiOm2Ffg55IsELbjyuSI",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
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
          const expireTokentime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(data.idToken, expireTokentime.toISOString());
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD569iNkhWZ_j_QiOm2Ffg55IsELbjyuSI",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            confirmPass: enteredConfirmPass,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
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
          const expireTokentime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(data.idToken, expireTokentime.toISOString());
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <Form>
        <FormGroup className={classes.control}>
          <FormLabel htmlFor="email">Your Email</FormLabel>
          <FormControl type="email" id="email" required ref={emailInputRef} />
        </FormGroup>
        <FormGroup className={classes.control}>
          <FormLabel htmlFor="password">Your Password</FormLabel>
          <FormControl
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </FormGroup>
        {!isLogin && (
          <FormGroup className={classes.control}>
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <FormControl
              type="password"
              id="password"
              required
              ref={confirmpasswordInputRef}
            />
          </FormGroup>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <Button onClick={submitHandler}>{isLogin ? "Login" : "Create Account"}</Button>
          )}
          {isLoading && <p>Sending request...</p>}
          <Button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
        </div>
      </Form>
      <div className={classes.actions}>
      <Link to="/reset">
      {isLogin && (<button>Forget Password</button>)}
      </Link>
      </div>
    </div>
  );
};

export default AuthForm;
