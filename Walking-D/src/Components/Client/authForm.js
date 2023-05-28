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
import Container from "react-bootstrap/Container";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../Server/FirebaseConfig";
import Welcome from "./welcome";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [userFacebook, setUserFacebook] = useState(null);
  const [userGoogle, setUserGoogle] = useState(null);
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const facebookLoginHandler = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUserFacebook(result.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const googleLoginHandler = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUserGoogle(result.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const logoutHandler = () => {
    setUserFacebook(null);
    setUserGoogle(null);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredConfirmPass;
    if (!isLogin) {
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
          navigate("/welcome");
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
          navigate("/welcome");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <Container className={classes["form-container"]}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <Form className={classes.form}>
        <FormGroup className={classes["form-group"]}>
          <FormLabel htmlFor="email" className={classes.label}>
            Your Email
          </FormLabel>
          <FormControl
            type="email"
            id="email"
            required
            ref={emailInputRef}
            className={classes.input}
          />
        </FormGroup>
        <FormGroup className={classes["form-group"]}>
          <FormLabel htmlFor="password" className={classes.label}>
            Your Password
          </FormLabel>
          <FormControl
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            className={classes.input}
          />
        </FormGroup>
        {!isLogin && (
          <FormGroup className={classes["form-group"]}>
            <FormLabel htmlFor="password" className={classes.label}>
              Confirm Password
            </FormLabel>
            <FormControl
              type="password"
              id="password"
              required
              ref={confirmpasswordInputRef}
              className={classes.input}
            />
          </FormGroup>
        )}
        <FormGroup className={classes.actions}>
          {!isLoading && (
            <Button onClick={submitHandler}>
              {isLogin ? "Login" : "Create Account"}
            </Button>
          )}
          {isLoading && <p>Sending request...</p>}
          <Button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
        </FormGroup>
      </Form>
      <div>
        <Link to="/reset">
          {isLogin && (
            <Button className={classes.btn1} variant="secondary">
              Forget Password
            </Button>
          )}
        </Link>
      </div>
      <div>
        {userGoogle ? (
          <div>
            <Welcome />
            <Button onClick={logoutHandler}>LogOut</Button>
            <h3>Welcome : {userGoogle.displayName}</h3>
            <p>{userGoogle.email}</p>
            <div>
              <img src={userGoogle.photoURL} alt="Profile Photo" />
              </div>
          </div>
        ) : (
          <Button onClick={googleLoginHandler} className={classes.btn2} variant="danger">
           Login with Google
          </Button>
        )}
      </div>
      <div>
        {userFacebook ? (
          <div>
            <Button onClick={logoutHandler}>LogOut</Button>
            <h3>Welcome : {userFacebook.displayName}</h3>
            <p>{userFacebook.email}</p>
            <div>
              <img src={userFacebook.photoURL} alt="Profile Photo" />
              </div>
          </div>
        ) : (
          <Button onClick={facebookLoginHandler} className={classes.btn2}>
           Login with FaceBook
          </Button>
        )}
      </div>
    </Container>
  );
};

export default AuthForm;
